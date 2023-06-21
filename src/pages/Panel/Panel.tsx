import { useEffect, useMemo, useState } from "react";
import WidgetList from "../../components/WidgetList/WidgetList";
import style from "./Panel.module.css";
import { MdOutlineSettings } from "react-icons/md";
import Counter from "../../components/widgets/Counter/Counter";
import Table from "../../components/widgets/Table/Table";
import { MRT_ColumnDef } from "material-react-table";
import {
  DraggableItemType,
  EnergyType,
  GraphDataType,
  WidgetType,
} from "../../types";
import { getGraphValues, getTablesValue } from "../../api/widgetsApi";
import Chart from "../../components/widgets/Chart/Chart";
import { useDrop } from "react-dnd";
const Panel = () => {
  const [isShowWidgets, setIsShowWidgets] = useState(false);
  const [data, setData] = useState<Array<EnergyType>>([]);
  const [graphData, setGraphData] = useState<Array<GraphDataType>>([]);
  useEffect(() => {
    setInterval(() => {
      (async () => {
        try {
          const { data: tablesData } = await getTablesValue();
          const { data: graphsData } = await getGraphValues();
          setData(
            tablesData.map((energy: EnergyType) => {
              energy.change = energy.change * 100;
              return energy;
            })
          );
          setGraphData(graphsData);
        } catch (error) {
          console.log("error:", error);
        }
      })();
    }, 60000);
  }, []);
  const columns = useMemo<MRT_ColumnDef<EnergyType>[]>(
    () => [
      {
        accessorKey: "timestep", //simple recommended way to define a column
        header: "Время показателя", //custom props
      },
      {
        accessorKey: "currentValue", //simple recommended way to define a column
        header: "Текущее показание", //custom props
      },
      {
        accessorKey: "prevValue", //simple recommended way to define a column
        header: "Предыдущее значение", //custom props
      },
      {
        accessorKey: "change", //simple recommended way to define a column
        header: "Изменение в %", //custom props
      },
    ],
    []
  );
  const widgets: Array<WidgetType> = [
    {
      id: 1,
      component: <Counter id={1} />,
    },
    {
      id: 2,
      component: <Table id={2} title="Таблица" columns={columns} data={data} />,
    },
    {
      id: 3,
      component: (
        <Chart
          id={3}
          title="Энергопотребление"
          labels={graphData.map((graph) => graph.timestep)}
          data={graphData.map((graph) => graph.currentValue)}
        />
      ),
    },
  ];
  const [droppedWidgets, setDroppedWidgets] = useState<Array<WidgetType>>([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: "widget",
    drop: (item: DraggableItemType) => {
      const _droppedWidgets = widgets.filter((widget) => widget.id === item.id);
      if (droppedWidgets.length >= 4) return;
      setDroppedWidgets((prevState) => [...prevState, _droppedWidgets[0]]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const onclick = () => {
    setIsShowWidgets((prevState) => !prevState);
  };
  return (
    <div className={style.container}>
      <div className={style.dragsContainer} ref={dropRef}>
        {droppedWidgets.map((widget) => widget.component)}
      </div>
      <div className={style.widgetListContainer}>
        <MdOutlineSettings
          onClick={onclick}
          className={style.widgetIcon}
          size={25}
        />
        <WidgetList isShow={isShowWidgets}>
          <Counter id={1} />
          <Table id={2} title="Таблица" columns={columns} data={data} />
          <Chart
            id={3}
            title="Энергопотребление"
            labels={graphData.map((graph) => graph.timestep)}
            data={graphData.map((graph) => graph.currentValue)}
          />
        </WidgetList>
      </div>
    </div>
  );
};

export default Panel;

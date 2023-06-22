import { useEffect, useMemo, useState } from "react";
import WidgetList from "../../components/WidgetList/WidgetList";
import style from "./Panel.module.css";
import { MdOutlineSettings } from "react-icons/md";
import Counter from "../../components/widgets/Counter/Counter";
import Table from "../../components/widgets/Table/Table";
import {
  DraggableItemType,
  WidgetType,
} from "../../types";
import Chart from "../../components/widgets/Chart/Chart";
import { useDrop } from "react-dnd";
const Panel = () => {
  const [isShowWidgets, setIsShowWidgets] = useState(false);
  const widgets: Array<WidgetType> = [
    {
      id: 1,
      component: <Counter id={1} />,
    },
    {
      id: 2,
      component: <Table id={2}/>,
    },
    {
      id: 3,
      component: (
        <Chart id={3}/>
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
        {droppedWidgets.map(item => item.component)}
      </div>
      <div className={style.widgetListContainer}>
        <MdOutlineSettings
          onClick={onclick}
          className={style.widgetIcon}
          size={25}
        />
        <WidgetList isShow={isShowWidgets}>
          {widgets.map(item => (
            <div style={{width: '90%'}} key={item.id}>
              {item.component}
            </div>
          ))}
        </WidgetList>
      </div>
    </div>
  );
};

export default Panel;

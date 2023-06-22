import style from './Table.module.css';
import { MaterialReactTable } from 'material-react-table';
import { type MRT_ColumnDef } from 'material-react-table';
import { EnergyType } from '../../../types';
import { useDrag } from 'react-dnd';
import { useEffect, useMemo, useState } from 'react';
import { getTablesValue } from '../../../api/widgetsApi';
type TablePropsType = {
    id: number;
} 
const Table: React.FC<TablePropsType> = ({ id }) => {
    const [data, setData] = useState<Array<EnergyType>>([]);
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
    const [{ isDragging }, dragRef] = useDrag({
        type: "widget",
        item: { id },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    });
    useEffect(() => {
        setInterval(() => {
          (async () => {
            try {
              const { data: tablesData } = await getTablesValue();
              setData(
                tablesData.map((energy: EnergyType) => {
                  energy.change = energy.change * 100;
                  return energy;
                })
              );
            } catch (error) {
              console.log("error:", error);
            }
          })();
        }, 60000);
      }, []);
    return ( 
        <div className={style.container} ref={dragRef}>
            <div className={style.titleContainer}>
                <p className={style.title}>Энергопотребление</p>
            </div>
            <div className={style.tableContainer}>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    muiTableContainerProps={{
                        //simple styling with the `sx` prop, works just like a style prop in this example
                        sx: {
                            height: '200px',
                            overflow: 'auto',
                        },
                    }}
                />
            </div>
        </div>
     );
}
 
export default Table;
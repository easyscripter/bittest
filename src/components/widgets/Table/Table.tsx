import style from './Table.module.css';
import { MaterialReactTable } from 'material-react-table';
import { type MRT_ColumnDef } from 'material-react-table';
import { EnergyType } from '../../../types';
import { useDrag } from 'react-dnd';
type TablePropsType = {
    title: string;
    columns: MRT_ColumnDef<EnergyType>[];
    data: Array<EnergyType>
    id: number;
} 
const Table: React.FC<TablePropsType> = ({ title, columns, data, id }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "widget",
        item: { id },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    });
    return ( 
        <div className={style.container} ref={dragRef}>
            <div className={style.titleContainer}>
                <p className={style.title}>{title}</p>
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
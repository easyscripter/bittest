import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from 'react-chartjs-2';
import style from './Chart.module.css';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
type ChartPropsType = {
    title: string;
    labels: Array<string>;
    data: Array<number>
    id: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Chart: React.FC<ChartPropsType> = ({ title, data, labels, id }) => {
    const options = {
        responsive: true,
    };
    const graphData = useMemo(() => ({
        labels,
        datasets: [
            {
                data: data,
                borderColor: '#f2f2f2',
                backgroundColor: '#005FB8',
            }
        ]    
    }), [data, labels])
    const [{ isDragging }, dragRef] = useDrag({
        type: 'widget',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return ( 
        <div className={style.container} ref={dragRef}>
            <div className={style.titleContainer}>
                <p className={style.title}>{title}</p>
            </div>
            <div className={style.chartContainer}>
                <Line options={options} data={graphData}/>
            </div>
        </div>
     );
}
 
export default Chart;
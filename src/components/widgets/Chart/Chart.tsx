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
import { useEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getGraphValues } from "../../../api/widgetsApi";
import { GraphDataType } from "../../../types";
type ChartPropsType = {
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
const Chart: React.FC<ChartPropsType> = ({ id }) => {
    const [data, setData] = useState<Array<GraphDataType>>([]);
    const options = {
        responsive: true,
    };
    const graphData = useMemo(() => ({
        labels: data.map(item => item.timestep),
        datasets: [
            {
                data: data.map(item => item.currentValue),
                borderColor: '#f2f2f2',
                backgroundColor: '#005FB8',
                label: 'Показания',
            }
        ]    
    }), [data]);
    const [{ isDragging }, dragRef] = useDrag({
        type: 'widget',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    useEffect(() => {
        setInterval(() => {
          (async () => {
            try {
              const { data: graphsData } = await getGraphValues();
              setData(graphsData);
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
            <div className={style.chartContainer}>
                <Line options={options} data={graphData}/>
            </div>
        </div>
     );
}
 
export default Chart;
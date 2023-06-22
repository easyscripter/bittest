import { useEffect, useState } from 'react';
import style from './Counter.module.css';
import { getControlValue } from '../../../api/widgetsApi';
import { useDrag } from 'react-dnd';

type CounterPropsType = {
    id: number;
}
const Counter: React.FC<CounterPropsType> = ({id}) => {
    const [price, setPrice] = useState('0');
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [isHalfError, setIsHalfError] = useState(false);
    const [isOutOfRange, setIsOutOfRange] = useState(false);

    const planPrice = 5;

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
                    const {data} = await getControlValue();
                    setPrice(data.value.currentValue.toString());
                    setMinValue(data.value.minValue);
                    setMaxValue(data.value.maxValue);
                } catch (error) {
                    setPrice('Ошибка');
                }
            })();
        }, 60000);
    }, []);
    useEffect(() => {
        if (Number(price) < minValue || Number(price) > maxValue) {
            setIsOutOfRange(true);
            return;
        }
        if (Math.abs(Number(price) - planPrice) >= 0.5) {
            setIsHalfError(true);
            return;
        }
    }, [price, minValue, maxValue]);
    return ( 
        <div className={style.container} ref={dragRef}>
            <div className={style.priceContainer}>
                <p className={style.priceTitle}>Цена</p>
                <p className={style.price}>{price}</p>
                <p className={style.priceMeasure}>руб./кВт*ч</p>
            </div>
            <div className={isOutOfRange || isHalfError ? style.halfPlanContainer : style.planContainer}>
                <p className={style.pricePlan}>{planPrice} руб./кВт*ч</p>
                <p className={style.pricePlanTitle}>План</p>
            </div>
        </div>
    );
}
 
export default Counter;
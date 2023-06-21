import style from './Counter.module.css';
const Counter = () => {
    return ( 
        <div className={style.container}>
            <div className={style.priceContainer}></div>
            <div className={style.planContainer}></div>
        </div>
    );
}
 
export default Counter;
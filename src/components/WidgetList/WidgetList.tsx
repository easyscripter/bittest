import style from './WidgetList.module.css';
type WidgetListPropsType = {
    children: React.ReactNode;
    isShow?: boolean;
}

const WidgetList: React.FC<WidgetListPropsType> = ({
    children,
    isShow
}) => {
    return ( 
        <div className={isShow ? style.container : style.hidden}>
            {children}
        </div>
    );
}
 
export default WidgetList;
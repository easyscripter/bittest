import { useState } from 'react';
import WidgetList from '../../components/WidgetList/WidgetList';
import style from './Panel.module.css';
import { MdOutlineSettings } from 'react-icons/md';
const Panel = () => {
    const [isShowWidgets, setIsShowWidgets] = useState(false);
    const onclick = () => {
        setIsShowWidgets((prevState) => !prevState);
    }
    return ( 
        <div className={style.container}>
            <div className={style.dragsContainer}>
                <div className={style.dragContainer}>
                    area 1
                </div>
                <div className={style.dragContainer}>
                    area 2
                </div>
                <div className={style.dragContainer}>
                    area 3
                </div>
                <div className={style.dragContainer}>
                    area 4
                </div>
            </div>
            <div className={style.widgetListContainer}>
                <MdOutlineSettings onClick={onclick} className={style.widgetIcon} size={25}/>
                <WidgetList isShow={isShowWidgets}>
                    <p>Widget 1</p>
                </WidgetList>
            </div>
        </div>
     );
}
 
export default Panel;
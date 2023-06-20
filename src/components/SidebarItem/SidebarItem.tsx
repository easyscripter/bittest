import { Link } from 'react-router-dom';
import { RouteType } from '../../types';
import style from './SidebarItem.module.css';

type SidebarItemPropsType = RouteType;

const SidebarItem: React.FC<SidebarItemPropsType> = ({
    icon: Icon,
    label,
    href,
    active
}) => {
    return ( 
        <Link className={active ? style.active : style.container} to={href}>
            <Icon className={style.icon} size={20}/>
            <p className={style.title}>{label}</p>
        </Link>
    );
}
 
export default SidebarItem;
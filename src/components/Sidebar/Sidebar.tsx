import { useLocation } from 'react-router-dom';
import { RouteType } from '../../types';
import SidebarItem from '../SidebarItem/SidebarItem';
import style from './Sidebar.module.css';
import { useMemo } from 'react';
import { MdDensitySmall } from 'react-icons/md';

const Sidebar = () => {
    const {pathname} = useLocation();
    const routes = useMemo<Array<RouteType>>(() => [
        {
            icon: MdDensitySmall,
            label: 'Панель',
            href: '/panel',
            active: pathname === '/panel'
        }
    ], [pathname]);
    return ( 
        <div className={style.container}>
            <div className={style.sidebarList}>
                {routes.map(item => (
                    <SidebarItem key={item.label} {...item}/>
                ))}
            </div>
        </div>
     );
}
 
export default Sidebar;
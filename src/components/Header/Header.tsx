import style from './Header.module.css';
import {RxHamburgerMenu} from 'react-icons/rx';
type HeaderPropsType = {
    children: React.ReactNode;
    logo: string;
    title: string;
    onShowMobileSidebar: () => void;
}

const Header: React.FC<HeaderPropsType> = ({
    children,
    logo,
    title,
    onShowMobileSidebar
}) => {
    return ( 
        <div className={style.container}>
            <RxHamburgerMenu onClick={onShowMobileSidebar} size={25} className={style.burger}/>
            <div className={style.logoContainer}>
                <img src={logo} alt='logo'/>
            </div>
            <h3 className={style.title}>{title}</h3>
        </div>
     );
}
 
export default Header;
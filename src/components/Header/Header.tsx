import style from './Header.module.css';
type HeaderPropsType = {
    children: React.ReactNode;
    logo: string;
    title: string;
}

const Header: React.FC<HeaderPropsType> = ({
    children,
    logo,
    title,
}) => {
    return ( 
        <div className={style.container}>
            <div className={style.logoContainer}>
                <img src={logo} alt='logo'/>
            </div>
            <h3 className={style.title}>{title}</h3>
        </div>
     );
}
 
export default Header;
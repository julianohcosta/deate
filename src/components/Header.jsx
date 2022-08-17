import classes from "./Header.module.css";
import {MenuOutlined} from "@ant-design/icons";

const Header = props => {
    return (
        <header className={classes['main-header']}>
            <div >
                <MenuOutlined className={classes['hamburguer-menu']} onClick={props.onClick}/>
                <span className={classes['header-text']}>
                HEADER
            </span>
            </div>
        </header>
    )
};

export default Header;
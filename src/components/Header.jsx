import classes from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";

const Header = props => {
  return (
    <header className={classes["main-header"]}>
      <MenuOutlined
        className={classes["hamburguer-menu"]}
        onClick={props.onClick}
      />
      <span className={classes["header-text"]}>Gerencial DEATE</span>
    </header>
  );
};

export default Header;

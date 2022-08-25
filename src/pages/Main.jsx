import classes from "./Main.module.css";
import Header from "../components/Header";

const Main = props => {
  return (
    <>
      <Header onClick={props.onSideBarClick}/>
      <div className={classes['header-bar']}/>
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Main;

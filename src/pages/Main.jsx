import classes from "./Main.module.css";
import Header from "../components/Header";
const Main = props => {
  console.log(props);
  return (
    <>
      <Header onClick={props.onSideBarClick} />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Main;

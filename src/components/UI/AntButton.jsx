import { Button } from "antd";
import classes from "./AntButton.module.css";

const AntButton = props => {
  return (
    <Button
      onClick={props.onClick}
      type={props.type}
      className={`${classes.button} ${props.className}`}
    >
      {props.text}
    </Button>
  );
};

export default AntButton;

import classes from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import logoLabin from "../assets/logoLabin.png";

const Header = props => {
  const [username, setusername] = useState("");

  const { sendRequest } = useHttp(
    {
      url: "https://localhost:8443/ctx/run/DEATE - relatorios gerenciais/usuarioLogado",
    },
    user => {
      if (user.username) {
        setusername(user.username);
      }
    }
  );

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Row className={classes["main-header"]} align={"middle"}>
      <Col span={2} style={{ marginRight: "-1.5em" }}>
        <MenuOutlined
          className={classes["hamburguer-menu"]}
          onClick={props.onClick}
        />
      </Col>
      <Col span={6}>
        <span className={classes["header-text"]}>Gerencial DEATE</span>
      </Col>
      <Col span={8} />
      <Col span={5} align="right">
        <p className={classes.username}>{username}</p>
      </Col>
      <Col span={3} align={"center"}>
        <div className={classes["logo-container"]}>
          <img
            className={classes.logolabin}
            src={
              "https://rfbgov.sharepoint.com/sites/Labin01/_api/siteiconmanager/getsitelogo?type='1'&hash=637674275329683070"
            }
            alt="Awesome Labin01 logo"
          />
        </div>
      </Col>
    </Row>
  );
};

export default Header;

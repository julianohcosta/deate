import classes from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import userLogo from "../assets/logoLabin.png";

const Header = props => {
  const [username, setusername] = useState("");

  useEffect(() => {
    fetch("https://localhost:8443/ctx/run/DEATE - relatorios gerenciais - backend/usuarioLogado")
      .then(response => response.json())
      .then(user => {
        if (user.username) {
          setusername(user.username);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [username]);

  return (
    <Row className={classes["main-header"]} align={"middle"}>
      <Col
        span={2}
        style={{
          marginRight: "-1.5em",
        }}
      >
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
            src={userLogo}
            alt="Awesome Labin01 logo"
          />
        </div>
      </Col>
    </Row>
  );
};

export default Header;

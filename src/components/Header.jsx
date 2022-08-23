import classes from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";

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
          <a
            href="https://rfbgov.sharepoint.com/sites/Labin01/SitePages/Labin01.aspx"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={classes.logolabin}
              src={
                "https://edicao.intranet.receita.fazenda/administracao/rf01/estrutura-organizacional/superintendencia-regional/gabinete/labin01/imagens/logolabinnobg387x649/image_preview"
              }
              alt="Awesome Labin01 logo"
            />
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default Header;

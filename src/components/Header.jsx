import classes from "./Header.module.css";
import { MenuOutlined } from "@ant-design/icons";
import {Col, Row} from "antd";
import {useEffect, useState} from "react";
import userLogo from '../assets/logoLabin.png'

const Header = props => {

  const [username, setusername] = useState('');

  useEffect(() => {

    fetch('https://localhost:8443/ctx/run/Agendador/user')
      .then(response => response.json())
      .then(user => {
        if (user.username) {
          setusername(user.username);
        }
      })
      .catch(e => {
        console.log(e)
      })

  }, [username]);


  return (
    <header className={classes["main-header"]}>
      <Row align={'middle'}>
        <Col span={2} style={{
          marginRight: '-1.5em'
        }}>
          <MenuOutlined
            className={classes["hamburguer-menu"]}
            onClick={props.onClick}
          />
        </Col>
        <Col span={6}>
          <span className={classes["header-text"]}>Gerencial DEATE</span>
        </Col>
        <Col span={6} style={{
          width: '30em'
        }}/>
        <Col span={3}>
          <div className={classes.servidor}>
            <p className={classes.username}>{username}</p>
          </div>
        </Col>
        <Col span={3}>
          <img className={classes.logolabin} src={userLogo} alt=""/>
        </Col>

      </Row>
    </header>
  );
};

export default Header;

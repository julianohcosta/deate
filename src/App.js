import React, {useEffect, useState} from "react";
import { message } from 'antd';
import SideBar from "./components/SideBar";
import Main from "./pages/Main";
import EstoqueMensal from "./pages/EstoqueMensal";
import RHAP from "./pages/RHAP";
import classes from "./App.module.css";

function App() {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  /** Realiza a autenticação no e-Processo */
  useEffect(() => {
    fetch(
      "https://localhost:8443/ctx/run/DEATE - relatorios gerenciais - backend/autenticarEprocesso"
    )
      .then(response => response.json())
      .then(systemAuthenticated => {
        console.log(systemAuthenticated);
        setAuthenticated(systemAuthenticated.status);
      })
      .catch(e => {
        console.log(e);
      });
  }, [authenticated]);

  const sideBarHandle = () => {
    setVisible(prevValue => !prevValue);
  };

  const selectMenuHandler = menuName => {
    switch (menuName) {
      case "estoque":
        setSelectedMenu(<EstoqueMensal />);
        break;
      case "rhap":
        setSelectedMenu(<RHAP />);
        break;
      default:
        break;
    }
    sideBarHandle();
  };

  return (
    <React.StrictMode>
      <div className={classes.container}>
        <SideBar
          onSideBarClose={sideBarHandle}
          onSelectMenu={selectMenuHandler}
          visible={visible}
        />
        <Main onSideBarClick={sideBarHandle}>{selectedMenu}</Main>
      </div>
    </React.StrictMode>
  );
}

export default App;

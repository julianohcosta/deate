import React, {useEffect, useState} from "react";
import SideBar from "./components/SideBar";
import Main from "./pages/Main";
import EstoqueMensal from "./pages/EstoqueMensal";
import RHAP from "./pages/RHAP";

import useHttp from "./hooks/useHttp";
import classes from "./App.module.css";

function App() {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  const {isLoading, error, sendRequest, controller} = useHttp({
    url: 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/autenticarEprocesso'
    }, response => {
    if (response.status) {
      setAuthenticated(true);
    }
  });

  useEffect(() => {
    sendRequest();
    return () => {
      controller.abort();
    };
  }, []);

  const sideBarHandle = () => {
    setVisible(prevValue => !prevValue);
  };

  const selectMenuHandler = menuName => {
    switch (menuName) {
      case "estoque":
        setSelectedMenu(<EstoqueMensal/>);
        break;
      case "rhap":
        setSelectedMenu(<RHAP/>);
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

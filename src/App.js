import { useEffect, useState } from "react";
import AutenticandoEProcesso from "./components/UI/AutenticandoEProcesso";
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
  const { isLoading, error, sendRequest } = useHttp(
    {
      url: "https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/autenticarEprocesso",
    },
    response => {
      if (response.status) {
        setAuthenticated(true);
      }
    }
  );

  useEffect(() => {
    sendRequest();
  }, []);

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
    <>
      <div className={classes.container}>
        <SideBar
          onSideBarClose={sideBarHandle}
          onSelectMenu={selectMenuHandler}
          visible={visible}
        />
        <Main onSideBarClick={sideBarHandle}>{selectedMenu}</Main>
        {isLoading && <AutenticandoEProcesso />}
      </div>
    </>
  );
}

export default App;

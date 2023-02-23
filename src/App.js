import { useEffect, useState } from "react";
import AutenticandoEProcesso from "./components/UI/AutenticandoEProcesso";
import SideBar from "./components/SideBar";
import Main from "./pages/Main";
import EstoqueMensal from "./pages/EstoqueMensal";
import RHAP from "./pages/RHAP";
import classes from "./App.module.css";

function App() {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  const autenticarEprocesso = () => {
    fetch(
      "https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/autenticarEprocesso"
    )
      .then(response => response.json())
      .then(systemAuthenticated => {
        setAuthenticated(systemAuthenticated.status);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    autenticarEprocesso();
  }, []);

  const sideBarHandle = () => {
    setVisible(prevValue => !prevValue);
  };

  const selectMenuHandler = menuName => {
    switch (menuName) {
      case "estoque":
        setSelectedMenu(<EstoqueMensal tipo={menuName} />);
        break;
      case "rhap":
        setSelectedMenu(<RHAP />);
        break;
      case "estoque-usuario":
        setSelectedMenu(<EstoqueMensal tipo={`usuario`} />);
        break;
      default:
        break;
    }
    sideBarHandle();
  };

  return (
    <>
      {!authenticated && <AutenticandoEProcesso />}
      <div className={classes.container}>
        <SideBar
          onSideBarClose={sideBarHandle}
          onSelectMenu={selectMenuHandler}
          visible={visible}
        />
        <Main onSideBarClick={sideBarHandle}>{selectedMenu}</Main>
      </div>
    </>
  );
}

export default App;

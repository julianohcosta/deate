import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Main from "./pages/Main";

import classes from "./App.module.css";
import EstoqueMensal from "./pages/EstoqueMensal";
import RHAP from "./pages/RHAP";

function App() {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();

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

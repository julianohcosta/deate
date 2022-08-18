import React, {useState} from "react";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Header from "./components/Header";
import classes from './App.module.css';
import EstoqueMensal from "./pages/EstoqueMensal";
import RHAP from "./pages/RHAP";


function App() {
    const [visible, setVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState();

    const sideBarHandle = () => {
        setVisible(prevValue => !prevValue)
    }

    const selectMenuHandler = (menuName) => {
        switch (menuName) {
            case 'estoque':
                setSelectedMenu(<EstoqueMensal/>)
                break;
            case 'rhap':
                setSelectedMenu(<RHAP/>)
                break;
            default:
                break;
        }
        sideBarHandle();
    }

    return (
        <React.StrictMode>
            <div className={classes.container}>
                <Header onClick={sideBarHandle}/>
                <SideBar
                    onSideBarClose={sideBarHandle}
                    onSelectMenu={selectMenuHandler}
                    visible={visible}/>
                <Main>
                    {selectedMenu}
                </Main>
            </div>
        </React.StrictMode>
    )
}

export default App;

import {useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Header from "./components/Header";
import classes from './App.module.css';

function App() {
    const [visible, setVisible] = useState(false);

    const sideBarHandle = () => {
        setVisible(prevValue => !prevValue)
    }


    return (
        <div className={classes.container}>
            <Header onClick={sideBarHandle}/>
            <SideBar onSideBarClose={sideBarHandle} visible={visible}/>
            <Main/>
        </div>
    )
};

export default App;

import classes from "./SideBar.module.css";
import { Drawer, Divider  } from 'antd';
import { CloseCircleOutlined} from '@ant-design/icons';
import EstoqueMensal from "../pages/EstoqueMensal";
import RHAP from "../pages/RHAP";


const SideBar = props => {

    const dividerStyle = {
        marginTop: '-0.5em',
        fontSize: '1rem',
        color: "var(--main-text-color)",
    }


    return (

        <aside className={classes.sidebar}>
            <Drawer
                title={(
                    <p style={{
                        fontSize:  '0.875rem',
                        paddingTop: '0.925em'
                    }}>
                        Relatórios - DEATE
                    </p>
                )}
                headerStyle={{
                    backgroundColor: 'var(--secondary-text-color)',
                }}
                placement="left"
                size='default'
                onClose={props.onSideBarClose}
                visible={props.visible}
                closeIcon={<CloseCircleOutlined style={{fontSize: '1rem'}}/>}
            >

                <Divider style={dividerStyle}>Relatórios</Divider>
                <EstoqueMensal/>
                <RHAP/>
                <p>Outro Relatório</p>
                <Divider style={dividerStyle}>Resultado</Divider>
            </Drawer>
        </aside>
    )
};

export default SideBar;
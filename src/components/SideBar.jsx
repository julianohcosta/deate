import classes from "./SideBar.module.css";
import {Divider, Drawer} from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';

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
            fontSize: '0.875rem',
            paddingTop: '0.925em',
            color: 'var(--header-text-clr)',
            fontWeight: '700'
          }}>
            Relatórios - DEATE
          </p>
        )}
        headerStyle={{
          backgroundColor: 'var(--bg-primary-clr)'
        }}
        placement="left"
        size='default'
        onClose={props.onSideBarClose}
        visible={props.visible}
        closeIcon={<CloseCircleOutlined style={{
          fontSize: '1rem',
          color: 'var(--header-text-clr)'
        }}/>}
      >

        <Divider style={dividerStyle}>Relatórios</Divider>
        <p className={classes.sidebarItem} onClick={() => {
          props.onSelectMenu('estoque');
        }}>
          Estoque Mensal
        </p>
        <p className={classes.sidebarItem} onClick={() => {
          props.onSelectMenu('rhap');
        }}>
          RHAP
        </p>
        <p className={classes.sidebarItem} onClick={() => console.log("clicou")}>
          Outro Relatório
        </p>
        <Divider style={dividerStyle}>Resultado</Divider>
      </Drawer>
    </aside>
  )
};

export default SideBar;
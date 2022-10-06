import classes from "./SideBar.module.css";
import {Divider, Drawer} from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import logoRfb from '../assets/logoRfb.png';

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
          <p style={{fontSize: '0.875rem', paddingTop: '0.925em', color: 'var(--header-text-clr)', fontWeight: '700'}}>
            <span>
              <span>
                Relatórios - DEATE
              </span>
              <img className={classes.logo} src={logoRfb} alt="logo RFB"/>
            </span>
          </p>
        )}
        headerStyle={{backgroundColor: 'var(--bg-primary-clr)'}}
        placement="left"
        size='default'
        onClose={props.onSideBarClose}
        visible={props.visible}
        closeIcon={<CloseCircleOutlined style={{fontSize: '1rem', color: 'var(--header-text-clr)'}}/>}>
        <Divider style={dividerStyle}>Relatórios</Divider>
        <ul className={classes['link-container']}>
          <li>
            <span
              className={classes.sidebarItem}
              onClick={() => {props.onSelectMenu('estoque');}}>
                 Estoque Mensal - Processo
            </span>
          </li>
          <li>
            <span className={classes.sidebarItem} onClick={() => {props.onSelectMenu('estoque-usuario');}}>
              Estoque Mensal - Usuário
            </span>
          </li>
          <li>
            <span className={classes.sidebarItem} onClick={() => {props.onSelectMenu('rhap');}}>
              RHAP
            </span>
          </li>

        </ul>
        <Divider style={dividerStyle}>Resultado</Divider>
      </Drawer>
    </aside>
  )
};

export default SideBar;
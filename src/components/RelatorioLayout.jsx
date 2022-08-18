import {Col, Divider, Row} from "antd";
import OptionBar from "./OptionBar";
import style from "../pages/Style.module.css";
import DeateEquipe from "./DeateEquipe";
import React from "react";
import Deate from "./Deate";


const RelatorioLayout = (props) => {

  return (
    <>
      <div>
        <Divider orientation="center" style={{marginTop: '0', marginBottom: '0'}}>Opções de Consulta</Divider>
        <Row align="middle" justify="center">
          <Col span={6}/>
          <Col span={12}>
            <OptionBar disabled={props.disabled}/>
          </Col>
          <Col span={6}/>
        </Row>
      </div>
      <Row
        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
        className={style['gutter-row']}>
        <Col span={6} className={style['gutter-col']}>
          <Deate unidades={props.unidades}/>
        </Col>
        <Col span={18} className={style['gutter-col']}>
          <DeateEquipe
            disabled={props.disabled}
            equipes={props.equipes}
          />
        </Col>
      </Row>
    </>
  )
}
export default RelatorioLayout
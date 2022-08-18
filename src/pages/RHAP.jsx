import React, {useState} from "react";
import OptionBar from "../components/OptionBar";
import DeateEquipe from "../components/DeateEquipe";
import {Col, Divider, Row} from 'antd';
import {EQUIPES} from "../assets/deates";
import style from './Style.module.css'

const RHAP = () => {

  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div >
        <Divider orientation="center" style={{marginTop: '0', marginBottom: '0'}}>Opções de Consulta</Divider>
        <Row align="middle" justify="center">
          <Col span={6}/>
          <Col span={12}>
            <OptionBar disabled={disabled}/>
          </Col>
          <Col span={6}/>
        </Row>
      </div>

      <Row
        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
        className={style['gutter-row']}
      >
        <Col span={6} className={style['gutter-col']}>col-12</Col>
        <Col span={18} className={style['gutter-col']}>
          <DeateEquipe
            disabled={disabled}
            equipes={EQUIPES}
          />
        </Col>

      </Row>
    </>
  )
};

export default RHAP;
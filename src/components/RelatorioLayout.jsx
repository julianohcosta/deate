import React from "react";
import {Col, Divider, Row} from "antd";
import AntButton from "../components/UI/AntButton";
import OptionBar from "./OptionBar";
import DeateEquipe from "./DeateEquipe";
import styles from "./RelatorioLayout.module.css";
import Deate from "./Deate";

const RelatorioLayout = props => {

  const getOptionBar = (optionBarType) => {

    switch (optionBarType) {
      case 'rhap':
        return (
          <OptionBar
            type={`rhap`}
            disabled={props.disabled}
            onSelectedYear={props.onSelectedYear}
          />
        )
      case 'estoque':
        return (
          <OptionBar
            type={`estoque`}
            disabled={props.disabled}
          />
        )
    }
  }

  return (
    <>
      <Divider
        orientation="center"
        style={{marginTop: "0", marginBottom: "0"}}
      >
        Opções de Consulta
      </Divider>
      <Row align="middle" justify="center">
        <Col span={6}/>
        <Col span={12}>
          {getOptionBar(props.optionBarType)}
        </Col>
        <Col span={6}/>
      </Row>

      <Row
        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
        className={styles["gutter-row"]}
      >
        <Col span={6} className={styles["gutter-col"]}>
          <Deate
            unidades={props.unidades}
          />
        </Col>
        <Col span={18} className={styles["gutter-col"]}>
          <DeateEquipe
            disabled={props.disabled}
            equipes={props.equipes}
            onSelectEquipes={props.onSelectEquipes}
          />
        </Col>
      </Row>
      <AntButton text={"Gerar"}/>
    </>
  );
};
export default RelatorioLayout;

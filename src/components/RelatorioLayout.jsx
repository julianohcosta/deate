import React, { useState, useEffect } from "react";
import { Col, Divider, Row } from "antd";
import Button from "../components/UI/Button";
import Modal from "./UI/Modal";
import TableComponent from "./TableComponent/TableComponent";
import LoadingTableScreen from "./TableComponent/LoadingTableScreen";
import OptionBar from "./OptionBar";
import DeateEquipe from "./DeateEquipe";
import styles from "./RelatorioLayout.module.css";
import Deate from "./Deate";

const RelatorioLayout = props => {

  const getOptionBar = optionBarType => {
    switch (optionBarType) {
      case "rhap":
        return (
          <OptionBar
            type={`rhap`}
            disabled={props.disabled}
            onSelectedYear={props.onSelectedYear}
            onSelectedMonth={props.onSelectedMonth}
          />
        );
      case "estoque":
        return (
          <OptionBar
            type={`estoque`}
            disabled={props.disabled}
            onSelectedPeriod={props.onSelectedPeriod}
          />
        );
      default:
        return;
    }
  };


  return (
    <>
      <Divider orientation="center">Opções de Consulta</Divider>
      <Row align={"bottom"} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={5} push={1} className={styles["deate-container"]}>
          <Deate
            unidades={props.unidades}
            onSelectDeate={props.onSelectDeate}
          />
        </Col>
        <Col span={19} push={1}>
          <DeateEquipe
            optionBar={getOptionBar(props.optionBarType)}
            disabled={props.disabled}
            equipes={props.equipes}
            onSelectEquipes={props.onSelectEquipes}
          />
        </Col>
      </Row>
      <Button
        // onClick={() => setShowResultTable(true)}
        onClick={props.onGerarRelatorio}
        text={"Gerar"}
        className={styles["btn-gerar"]}
      />
    </>
  );
};
export default RelatorioLayout;

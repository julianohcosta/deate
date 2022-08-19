import React from "react";
import { Col, Divider, Row } from "antd";
import AntButton from "../components/UI/AntButton";
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
          />
        );
      case "estoque":
        return <OptionBar type={`estoque`} disabled={props.disabled} />;
    }
  };

  return (
    <>
      <Divider
        orientation="center"
        className={styles["divider--container"]}
        // style={{ marginTop: "10", marginBottom: "0" }}
      >
        Opções de Consulta
      </Divider>
      <Row
        align={"bottom"}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={styles["gutter-row"]}
      >
        <Col span={5} className={styles["deate-container"]}>
          <Deate unidades={props.unidades} />
        </Col>
        <Col span={19} className={styles["gutter-col"]}>
          <DeateEquipe
            optionBar={getOptionBar(props.optionBarType)}
            disabled={props.disabled}
            equipes={props.equipes}
            onSelectEquipes={props.onSelectEquipes}
          />
        </Col>
      </Row>
      <AntButton text={"Gerar"} />
    </>
  );
};
export default RelatorioLayout;

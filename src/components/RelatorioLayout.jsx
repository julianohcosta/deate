import React, {useState} from "react";
import SelectedDeateContext from "../context/selected-deate-context";
import {Col, Divider, Row} from "antd";
import Button from "../components/UI/Button";
import OptionBar from "./OptionBar";
import DeateEquipe from "./DeateEquipe";
import Deate from "./Deate";
import styles from "./RelatorioLayout.module.css";

const RelatorioLayout = props => {
  const [selectedDeate, setSelectedDeate] = useState({});

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

  const selectedDeateHandler = deate => {
    setSelectedDeate(deate);
    props.onSelectDeate(deate);
  };

  const pageTitle =
    props.optionBarType === "estoque" ? "Estoque Mensal" : "RHAP";

  return (
    <SelectedDeateContext.Provider value={selectedDeate}>
      <Divider orientation="center">{pageTitle} - Opções de Consulta</Divider>
      <Row align={"bottom"} gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <Col span={5} push={0} className={styles["deate-container"]}>
          <Deate
            unidades={props.unidades}
            onSelectDeate={selectedDeateHandler}
          />
        </Col>
        <Col span={19} push={0}>
          <DeateEquipe
            optionBar={getOptionBar(props.optionBarType)}
            disabled={props.disabled}
            equipes={props.equipes}
            onSelectEquipes={props.onSelectEquipes}
          />
        </Col>
      </Row>
      <Button
        onClick={props.onGerarRelatorio}
        text={"Gerar"}
        className={styles["btn-gerar"]}
      />
    </SelectedDeateContext.Provider>
  );
};
export default RelatorioLayout;

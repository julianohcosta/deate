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
  const [showResultTable, setShowResultTable] = useState(false);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [isConsultando, setIsConsultando] = useState(false);
  const [listaResultado, setListaResultado] = useState([]);
  const [totalEquipes, setTotalEquipes] = useState(0);
  const [count, setCount] = useState(0);

  /****** Gerar Tabela de Resultados ******/

  const selectEquipeHandler = values => {
    setSelectedEquipes(() => [...values]);
  };

  const gerarTableHandler = () => {
    setTotalEquipes(selectedEquipes.length);

    let periodoInicial = "01/06/2021";
    let periodoFinal = "20/03/2022";

    setIsConsultando(true);

    // eslint-disable-next-line no-unused-vars
    for (const equipe of selectedEquipes) {
      const url =
        "https://localhost:8443/ctx/run/DEATE - relatorios gerenciais - backend/relatorioEstoque" +
        "?nomeDeate=" +
        equipe.deateName +
        "&nomeEquipe=" +
        equipe.equipeName +
        "&codigoEquipe=" +
        equipe.equipeCodigo +
        "&periodoInicial=" +
        periodoInicial +
        "&periodoFinal=" +
        periodoFinal;

      console.log(url);
      console.log(
        `Consultando a equipe ${equipe.equipeName} da deate ${equipe.deateName}`
      );
      fetch(url)
        .then(response => response.json())
        .then(estoque => {
          setListaResultado(prevListaResultado => [
            ...prevListaResultado,
            ...estoque,
          ]);
          setCount(prevCount => prevCount + 1);

          console.log(estoque);
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    if (count === totalEquipes) {
      setIsConsultando(false);
      if (totalEquipes >= 1 && count >= 1) {
        setShowResultTable(true);
      }
    }
  }, [count, totalEquipes]);

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

  if (showResultTable) {
    return (
      <Modal>
        <TableComponent />
      </Modal>
    );
  }

  return (
    <>
      {isConsultando && (
        <LoadingTableScreen totalEquipes={totalEquipes} count={count} />
      )}
      <Divider orientation="center">Opções de Consulta</Divider>
      <Row align={"bottom"} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={5} push={1} className={styles["deate-container"]}>
          <Deate unidades={props.unidades} />
        </Col>
        <Col span={19} push={1}>
          <DeateEquipe
            optionBar={getOptionBar(props.optionBarType)}
            disabled={props.disabled}
            equipes={props.equipes}
            onSelectEquipes={selectEquipeHandler}
          />
        </Col>
      </Row>
      <Button
        onClick={() => setShowResultTable(true)}
        text={"Gerar"}
        className={styles["btn-gerar"]}
      />
    </>
  );
};
export default RelatorioLayout;

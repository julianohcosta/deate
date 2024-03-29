import React, { useEffect, useState } from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import TableComponent from "../components/TableComponent/TableComponent";
import LoadingTableScreen from "../components/TableComponent/LoadingTableScreen";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { GROUPED_COLUMNS } from "../components/TableComponent/columnsEstoque";

const EstoqueMensal = props => {
  const [unidades, setUnidades] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [equipes, setEquipes] = useState([]);
  const [count, setCount] = useState(0);
  const [totalEquipes, setTotalEquipes] = useState(0);
  const [isConsultando, setIsConsultando] = useState(false);
  const [listaResultado, setListaResultado] = useState([]);
  const [showResultTable, setShowResultTable] = useState(false);
  const [less12Months, setLess12Months] = useState(true);
  const [selectedDeate, setSelectedDeate] = useState("");
  const [periodo, setPeriodo] = useState({ inicial: "", final: "" });

  /** Max amount of messages on screen simultaneously */
  message.config({ maxCount: 3 });

  const showMessage = msg => {
    const uniqueKey = uuidv4();

    message
      .error({
        content: msg,
        style: { fontSize: ".575rem", fontWeight: "500", cursor: "pointer" },
        key: uniqueKey,
        onClick: () => message.destroy(uniqueKey),
      })
      .then(); // 'then' para a IDE não apresentar erro.
  };

  useEffect(() => {
    fetch(
      "https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/deates"
    )
      .then(resp => resp.json())
      .then(response => {
        if (response["deates"]) {
          setUnidades(response["deates"]);
          setLoaded(true);
        } else {
          // TODO: Avisar o usuário que a requisição falhou
        }
      })
      .catch(e => console.log(e));
  }, []);

  const selectDeateHandler = deate => {
    const url = `https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/equipesDeate?codigoDeate=${deate["codigo"]}`;
    fetch(url)
      .then(res => res.json())
      .then(resposta => {
        if (resposta.equipes) {
          setEquipes(resposta.equipes);
          setSelectedDeate(deate);
        }
      });
  };

  const selectEquipeHandler = values => {
    setSelectedEquipes(() => [...values]);
  };

  const periodoHandler = dates => {
    const dateDiff = dates[1].diff(dates[0], "months", true) < 12;

    if (!dateDiff) {
      setLess12Months(false);
    } else {
      setLess12Months(true);
    }

    const periodoInicial = dates[0].format("DD/MM/YYYY");
    const periodoFinal = dates[1].format("DD/MM/YYYY");

    setPeriodo({
      inicial: periodoInicial,
      final: periodoFinal,
    });
  };

  const gerarRelatorio = () => {
    /** Data inicial e final são obrigatórias */
    if (!periodo.inicial || !periodo.final) {
      showMessage("Informe o período a ser consultado!");
      return;
    }

    if (!less12Months) {
      showMessage("Período selecionado deve ser menor ou igual a 12 meses");
      return;
    }

    if (selectedEquipes.length === 0) {
      showMessage("Selecione ao menos uma equipe");
      return;
    }

    setTotalEquipes(selectedEquipes.length);
    setIsConsultando(true);

    for (const equipeNome of selectedEquipes) {
      const equipe = equipes.find(e => e.nome === equipeNome);

      let url = "";

      if (props.tipo === "usuario") {
        url =
          "https://localhost:8443/ctx/run/DEATE - relatorios gerenciais/relatorioEstoqueUsuario" +
          "?nomeDeate=" +
          selectedDeate.nome +
          "&nomeEquipe=" +
          equipe.nome +
          "&codigoEquipe=" +
          equipe.codigo +
          "&periodoInicial=" +
          periodo.inicial +
          "&periodoFinal=" +
          periodo.final;

        GROUPED_COLUMNS.splice(3, 0, {
          Header: "Usuário",
          accessor: "usuario",
        });
        GROUPED_COLUMNS.splice(4, 0, {
          Header: "Atividade",
          accessor: "atividade",
        });
        GROUPED_COLUMNS.splice(5, 0, {
          Header: "Estoque Inicial",
          accessor: "estoqueInicial",
        });
      } else {
        url =
          "https://localhost:8443/ctx/run/DEATE - relatorios gerenciais/relatorioEstoque" +
          "?nomeDeate=" +
          selectedDeate.nome +
          "&nomeEquipe=" +
          equipe.nome +
          "&codigoEquipe=" +
          equipe.codigo +
          "&periodoInicial=" +
          periodo.inicial +
          "&periodoFinal=" +
          periodo.final;
      }

      fetch(url)
        .then(response => response.json())
        .then(estoque => {
          console.log(url);
          console.log(estoque);
          setListaResultado(prevListaResultado => [
            ...prevListaResultado,
            ...estoque,
          ]);
          setCount(prevCount => prevCount + 1);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (count === totalEquipes) {
      setIsConsultando(false);
      if (totalEquipes >= 1 && count >= 1) {
        setLoaded(false);
        setShowResultTable(true);
        setCount(0);
        setSelectedEquipes([]);
        setPeriodo({ inicial: "", final: "" });
      }
    }
  }, [count, totalEquipes]);

  const onSalvarParcialHandler = interromper => {
    setPeriodo({ inicial: "", final: "" });
    setIsConsultando(!interromper);
    setShowResultTable(true);
    setSelectedEquipes([]);
    setLoaded(false);
    setCount(0);

    window.stop(); // gambiarra para parar o loop
  };

  return (
    <>
      {isConsultando && (
        <LoadingTableScreen
          showBtnSalvar={true}
          onClickSalvarParcial={onSalvarParcialHandler}
          total={totalEquipes}
          count={count}
          label={
            <p>
              Gerando os relatórios de estoque para <span>{totalEquipes}</span>{" "}
              equipes.
            </p>
          }
        />
      )}

      {showResultTable && (
        <TableComponent
          columns={GROUPED_COLUMNS}
          listaResultado={listaResultado}
          onClose={valor => {
            setShowResultTable(valor);
            setLoaded(true);
          }}
        />
      )}

      {loaded && (
        <RelatorioLayout
          disabled={disabled}
          equipes={equipes}
          optionBarType={props.tipo}
          unidades={unidades}
          onSelectEquipes={selectEquipeHandler}
          onSelectedPeriod={periodoHandler}
          onSelectDeate={selectDeateHandler}
          onGerarRelatorio={gerarRelatorio}
        />
      )}
    </>
  );
};

export default EstoqueMensal;

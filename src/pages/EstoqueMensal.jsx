import React, {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import useHttp from "../hooks/useHttp";
import TableComponent from "../components/TableComponent/TableComponent";
import LoadingTableScreen from "../components/TableComponent/LoadingTableScreen";
import {message} from 'antd';

const EstoqueMensal = () => {

  const [unidades, setUnidades] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [selectedDeate, setSelectedDeate] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [equipes, setEquipes] = useState([]);
  const [periodo, setPeriodo] = useState({inicial: '', final: ''});
  const [count, setCount] = useState(0);
  const [totalEquipes, setTotalEquipes] = useState(0);
  const [isConsultando, setIsConsultando] = useState(false);
  const [listaResultado, setListaResultado] = useState([]);
  const [showResultTable, setShowResultTable] = useState(false);

  message.config({maxCount: 3});


  const {sendRequest} = useHttp({
      url: 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/deates'
    }, response => {
      if (response['deates']) {
        setUnidades(response['deates']);
        setLoaded(true);
      } else {
        // TODO: Avisar o usuário que a requisição falhou
      }
    }
  );

  useEffect(() => {
    sendRequest();
  }, []);

  const selectDeateHandler = (deate) => {

    const url = `https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/equipesDeate?codigoDeate=${deate['codigo']}`
    fetch(url).then(res => res.json()).then(resposta => {
      if (resposta.equipes) {
        setEquipes(resposta.equipes);
        setSelectedDeate(deate);
      }
    })
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes(() => [...values])
  }

  const periodoHandler = (dates) => {
    const periodoInicial = dates[0].format('DD/MM/YYYY');
    const periodoFinal = dates[1].format('DD/MM/YYYY');

    setPeriodo({
      inicial: periodoInicial,
      final: periodoFinal
    })
  }

  const gerarRelatorio = () => {

    /** Data inicial e final são obrigatórias */
    if (!periodo.inicial || !periodo.final) {

      message.error({
        content: 'Informe o período a ser consultado!',
        style: {
          fontSize: '.575rem',
          fontWeight: '500'
        }
      }).then() // 'then' para a IDE não apresentar erro.
      return
    }
    setTotalEquipes(selectedEquipes.length);
    setIsConsultando(true);

    for (const equipeNome of selectedEquipes) {

      const equipe = equipes.find(e => e.nome === equipeNome);

      const url =
        "https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/relatorioEstoque" +
        "?nomeDeate=" + selectedDeate.nome +
        "&nomeEquipe=" + equipe.nome +
        "&codigoEquipe=" + equipe.codigo +
        "&periodoInicial=" + periodo.inicial +
        "&periodoFinal=" + periodo.final;

      console.log(url);

      fetch(url)
        .then(response => response.json())
        .then(estoque => {
          setListaResultado(prevListaResultado => [
            ...prevListaResultado,
            ...estoque,
          ]);
          setCount(prevCount => prevCount + 1);
        })
        .catch(e => console.log(e));
    }
  }

  useEffect(() => {

    if (count === totalEquipes) {
      setIsConsultando(false);
      if (totalEquipes >= 1 && count >= 1) {
        setLoaded(false)
        setShowResultTable(true);
        setCount(0)
      }
    }
  }, [count, totalEquipes]);

  // TODO: Ajustar tela de loading.

  return (
    <>
      {isConsultando && (
        <LoadingTableScreen
          totalEquipes={totalEquipes}
          count={count}/>
      )}
      {showResultTable &&
      <TableComponent
        listaResultado={listaResultado}
        onClose={valor => {
          setShowResultTable(valor)
          setLoaded(true);
        }}/>
      }
      {loaded && <RelatorioLayout
        disabled={disabled}
        equipes={equipes}
        optionBarType={`estoque`}
        unidades={unidades}
        onSelectEquipes={selectEquipeHandler}
        onSelectedPeriod={periodoHandler}
        onSelectDeate={selectDeateHandler}
        onGerarRelatorio={gerarRelatorio}
      />}
    </>
  );
};

export default EstoqueMensal;

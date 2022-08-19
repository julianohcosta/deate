import {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import useHttp from "../hooks/useHttp";

const EstoqueMensal = () => {

  const [unidades, setUnidades] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [equipes, setEquipes] = useState([]);
  const [periodo, setPeriodo] = useState({inicial: '', final: ''});


  const {sendRequest, controller} = useHttp({
    url: 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/deates'
    }, response => {
    if (response['deates']) {
      setUnidades(response['deates']);
      setLoaded(true);
    }else {
      // TODO: Avisar o usuário que a requisição falhou
    }}
  );

  useEffect(() => {
    sendRequest();
    return () => {
      // controller.abort()
    };
  }, []);

  const selectDeateHandler = (deate) => {

    const url = `https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/equipesDeate?codigoDeate=${deate['codigo']}`
    fetch(url).then(res => res.json()).then(resposta => {
      if (resposta.equipes) {
        setEquipes(resposta.equipes)
      }
    })
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes(() => [...values])
  }

  const periodoHandler = (dates) => {
    const periodoInicial = dates[0].format('MM/DD/YYYY');
    const periodoFinal = dates[1].format('MM/DD/YYYY');

    setPeriodo({
      inicial: periodoInicial,
      final: periodoFinal
    })
  }

  return (
    <>
      {loaded && <RelatorioLayout
        disabled={disabled}
        equipes={equipes}
        optionBarType={`estoque`}
        unidades={unidades}
        onSelectEquipes={selectEquipeHandler}
        onSelectedPeriod={periodoHandler}
        onSelectDeate={selectDeateHandler}
      />}
    </>
  );
};

export default EstoqueMensal;

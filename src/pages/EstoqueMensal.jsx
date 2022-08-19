import {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import {EQUIPES} from "../assets/deates";

const EstoqueMensal = () => {

  const [unidades, setUnidades] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [periodo, setPeriodo] = useState({
    inicial: '',
    final: ''
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/deates', {signal})
      .then(res => res.json())
      .then(resposta => {
        if (resposta['deates']){
          setUnidades(resposta['deates']);
          setLoaded(true);
        } else {
          // TODO: Avisar o usuário que a requisição falhou
        }
      }).catch(error => {
        // TODO: Tratar erro
    })
    return () => {
      controller.abort();
    }
  }, []);

  const selectEquipeHandler = (values) => {
    setSelectedEquipes( () => [...values])
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
      {loaded &&<RelatorioLayout
                  disabled={disabled}
                  equipes={EQUIPES}
                  optionBarType={`estoque`}
                  unidades={unidades}
                  onSelectEquipes={selectEquipeHandler}
                  onSelectedPeriod={periodoHandler}
        />}
    </>
  );
};

export default EstoqueMensal;

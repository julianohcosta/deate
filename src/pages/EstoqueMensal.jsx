import {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import {EQUIPES} from "../assets/deates";

const EstoqueMensal = () => {

  const [unidades, setUnidades] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/deates', {signal})
      .then(res => res.json())
      .then(resposta => {
        if (resposta['deates']){
          setUnidades(resposta['deates']);
          setLoaded(true);
        }
      }).catch(error => {
        // TODO: Tratar erro
    })
    return () => {
      controller.abort();
    }
  }, []);
  

  const [disabled, setDisabled] = useState(false);
  return (
    <>
      {loaded &&<RelatorioLayout
                  disabled={disabled}
                  equipes={EQUIPES}
                  unidades={unidades}
        />}

    </>
  );
};

export default EstoqueMensal;

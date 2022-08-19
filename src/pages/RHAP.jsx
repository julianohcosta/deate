import React, {useEffect, useState} from "react";
import {EQUIPES} from "../assets/deates";
import RelatorioLayout from "../components/RelatorioLayout";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais%20-%20backend/deatesAPI', {signal})
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

  const selectedYearsHandler = (values) => {
      setSelectedYears( () => [...values])
  }

  const selectedMonthHandler = (month) => {
    setSelectedMonth( month);
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes( () => [...values])
  }

  return (
    <>
      {loaded &&<RelatorioLayout
        disabled={disabled}
        equipes={EQUIPES}
        optionBarType={`rhap`}
        unidades={unidades}
        onSelectedYear={selectedYearsHandler}
        onSelectedMonth={selectedMonthHandler}
        onSelectEquipes={selectEquipeHandler}
      />}
    </>
  )
};

export default RHAP;
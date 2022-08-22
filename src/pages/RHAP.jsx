import React, {useEffect, useState} from "react";
import {EQUIPES} from "../assets/deates";
import RelatorioLayout from "../components/RelatorioLayout";
import {message} from "antd";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [availablePeriods, setAvailablePeriods] = useState([]);


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/deatesAPI', {signal})
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

  const gerarRelatorio = () => {

    if (selectedYears.length === 0) {
      message.error({
          content: "Selecione ao menos um ano",
          style: {
            fontSize: ".575rem",
            fontWeight: "500",
            cursor: 'pointer'
          },
        key: '0101',
        onClick: () => message.destroy('0101')
        })
        .then(); // 'then' para a IDE não apresentar erro.

      return
    }

    const maxYear = selectedYears.reduce((a, b) => {
      return Math.max(parseInt(a), parseInt(b))
    })

    console.log(maxYear);
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
        onGerarRelatorio={gerarRelatorio}
      />}
    </>
  )
};

export default RHAP;
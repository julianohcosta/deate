import React, {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import {message} from "antd";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedDeate, setSelectedDeate] = useState();
  const [equipes, setEquipes] = useState([]);
  const [rhaps, setRhaps] = useState([]);
  const [maiorRhap, setMaiorRhap] = useState();

  /** Max amount of messages on screen simultaneously */
  message.config({maxCount: 3});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://localhost:8443/ctx/run/DEATE%20-%20relatorios%20gerenciais/deatesAPI', {signal})
      .then(res => res.json())
      .then(resposta => {
        if (resposta['deates']) {
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
    setSelectedYears(() => [...values])

    const requestList = values.map(ano => {
      const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/periodosDisponiveis?' +
        'ano=' + ano +
        '&mes=' + selectedMonth
      return fetch(url).then(resp => resp.json());
    })

    Promise.all(requestList).then(periodosDisponiveis => {
      if (Array.isArray(periodosDisponiveis[0])) {
        periodosDisponiveis = [].concat.apply([], periodosDisponiveis);
      }
      setRhaps(periodosDisponiveis);

      if (periodosDisponiveis.length > 0){
        const maiorMoment = periodosDisponiveis.reduce((a, b) => {
          const dataA = moment(a['dataInicial'], 'DD/MM/YYYY');
          const dataB = moment(b['dataInicial'], 'DD/MM/YYYY')
          return dataA.isAfter(dataB) ? a : b;
        })
        setMaiorRhap(maiorMoment);
      } else {
        setMaiorRhap(null);
      }
    })
  }

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month);
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes(() => [...values])
  }

  const selectDeateHandler = deate => {

    if (selectedYears.length === 0) {
      const uniqueKey = uuidv4();
      message.error({
        content: "Selecione ao menos um ano",
        style: {
          fontSize: ".575rem",
          fontWeight: "500",
          cursor: 'pointer'
        },
        key: uniqueKey,
        onClick: () => message.destroy(uniqueKey)
      })
        .then(); // 'then' para a IDE não apresentar erro.
      return
    }

    setSelectedDeate(deate);

    const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/equipesAPI?' +
      'unidade=' + deate.codigo +
      '&dataInicial=' + maiorRhap['dataInicial'] +
      '&dataFinal=' + maiorRhap['dataFinal']

    fetch(url)
      .then(resp => resp.json())
      .then(equipes => {
        const fixedEquipes = equipes.filter(eq => !eq['sigla'].includes('EXCLUÍDA')
        ).map(eq => {
          eq['codigo'] = eq['resourceId'];
          delete  eq['resourceId'];
          return eq;})
        setEquipes(fixedEquipes);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const gerarRelatorio = () => {

    if (selectedYears.length === 0) {
      const uniqueKey = uuidv4();
      message.error({
        content: "Selecione ao menos um ano",
        style: {
          fontSize: ".575rem",
          fontWeight: "500",
          cursor: 'pointer'
        },
        key: uniqueKey,
        onClick: () => message.destroy(uniqueKey)
      })
        .then(); // 'then' para a IDE não apresentar erro.
      return
    }

    if (selectedEquipes.length === 0) {
      const uniqueKey = uuidv4();
      message.error({
          content: "Selecione ao menos uma equipe",
          style: {
            fontSize: ".575rem",
            fontWeight: "500",
            cursor: "pointer",
          },
          key: uniqueKey,
          onClick: () => message.destroy(uniqueKey),
        })
        .then(); // 'then' para a IDE não apresentar erro.
      return;
    }

    selectedEquipes.forEach(nomeEquipe => {
      const equipe = equipes.find(e => e['nome'] === nomeEquipe );
      rhaps.forEach(rhap => {

        const moment2Check = moment(rhap['dataInicial'], 'DD/MM/YYYY')
        const currentDate = moment()
        if (moment2Check.isSame(currentDate, 'month') && moment2Check.isSame(currentDate, 'month')){
          return;
        }

        const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/usuariosAPI?'+
          'unidade=' + selectedDeate['codigo'] +
          '&equipe=' + equipe['codigo'] +
          '&dataInicial=' + rhap['dataInicial'] +
          '&dataFinal=' + rhap['dataFinal']

        fetch(url)
          .then(resp => resp.json())
          .then(usuarios => {
            usuarios.forEach(usuario => {

              const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/rhap?' +
                'unidade=' + selectedDeate['codigo'] +
                '&equipe=' + equipe['codigo'] +
                '&usuario=' + usuario['resourceId'] +
                '&periodosRhap=' + rhap['resourceId']

              fetch(url)
                .then(resp => resp.json())
                .then(resposta => {
                  console.log(resposta)
                })
                .catch(e => console.log(e))
            })
          })
          .catch(e => {console.log(e)})
      })
    })


  }

  return (
    <>
      {loaded && <RelatorioLayout
        disabled={disabled}
        equipes={equipes}
        optionBarType={`rhap`}
        unidades={unidades}
        onSelectedYear={selectedYearsHandler}
        onSelectedMonth={selectedMonthHandler}
        onSelectEquipes={selectEquipeHandler}
        onGerarRelatorio={gerarRelatorio}
        onSelectDeate={selectDeateHandler}
      />}
    </>
  )
};

export default RHAP;
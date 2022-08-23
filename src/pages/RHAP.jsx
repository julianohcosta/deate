import React, {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import {message} from "antd";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import LoadingTableScreen from "../components/TableComponent/LoadingTableScreen";
import TableComponent from "../components/TableComponent/TableComponent";
import {GROUPED_COLUMNS} from "../components/TableComponent/columnsRhap";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isConsultando, setIsConsultando] = useState(false);
  const [showResultTable, setShowResultTable] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedDeate, setSelectedDeate] = useState();
  const [equipes, setEquipes] = useState([]);
  const [rhaps, setRhaps] = useState([]);
  const [maiorRhap, setMaiorRhap] = useState();
  const [totalConsulta, setTotalConsultas] = useState(0);
  const [count, setCount] = useState(0);
  const [listaResultado, setListaResultado] = useState([]);

  /** Max amount of messages on screen simultaneously */
  message.config({maxCount: 3});

  const showMessage = (msg, uniqueKey) => {
    message.error({
      content: msg,
      style: {
        fontSize: ".575rem",
        fontWeight: "500",
        cursor: 'pointer'
      },
      key: uniqueKey,
      onClick: () => message.destroy(uniqueKey)
    })
      .then(); // 'then' para a IDE não apresentar erro.
  }

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
      console.log(error);
    })
    return () => {
      controller.abort();
    }
  }, []);

  const selectedYearsHandler = (values) => {
    setSelectedYears(() => [...values])
  }

  useEffect(() => {
    const requestList = selectedYears.map(ano => {
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

      if (periodosDisponiveis.length > 0) {
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
  }, [selectedYears, selectedMonth]);

  const selectedMonthHandler = (month) => {
    setSelectedMonth(month);
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes(() => [...values])
  }

  const selectDeateHandler = deate => {

    if (selectedYears.length === 0) {
      showMessage("Selecione ao menos um ano", uuidv4());
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
          delete eq['resourceId'];
          return eq;
        })
        setEquipes(fixedEquipes);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const gerarRelatorio = () => {

    if (selectedYears.length === 0) {
      showMessage("Selecione ao menos um ano", uuidv4());
      return
    }

    if (selectedEquipes.length === 0) {
      showMessage("Selecione ao menos uma equipe", uuidv4());
      return;
    }
    if (selectedYears[0] === new Date().getFullYear() && selectedMonth === String(new Date().getMonth() + 1)) {
      showMessage("Não é possível consultar o mês atual, por favor selecione outro!", uuidv4());
      return;
    }

    setIsConsultando(true);

    setTotalConsultas(selectedEquipes.length * rhaps.length);

    selectedEquipes.forEach(nomeEquipe => {
      const equipe = equipes.find(e => e['nome'] === nomeEquipe);
      rhaps.forEach(rhap => {

        const moment2Check = moment(rhap['dataInicial'], 'DD/MM/YYYY')
        const currentDate = moment()

        /** Não se deve consultar o mês atual */
        if (moment2Check.isSame(currentDate, 'month') && moment2Check.isSame(currentDate, 'month')) {
          return;
        }

        const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/usuariosAPI?' +
          'unidade=' + selectedDeate['codigo'] +
          '&equipe=' + equipe['codigo'] +
          '&dataInicial=' + rhap['dataInicial'] +
          '&dataFinal=' + rhap['dataFinal']

        fetch(url)
          .then(resp => resp.json())
          .then(usuarios => {
            usuarios.forEach((usuario, idx) => {

              if (idx === 0) {
                setTotalConsultas(prevValue => prevValue + usuarios.length);
              }

              const url = 'https://localhost:8443/ctx/run/DEATE%20-%20relatorios gerenciais/rhap?' +
                'unidade=' + selectedDeate['codigo'] +
                '&equipe=' + equipe['codigo'] +
                '&usuario=' + usuario['resourceId'] +
                '&periodosRhap=' + rhap['resourceId']

              fetch(url)
                .then(resp => resp.json())
                .then(resposta => {
                  if (!resposta['error']) {

                    const itensDemonstrativoUtilizacaoHoras = resposta[0]['itensDemonstrativoUtilizacaoHoras']
                    const itensQuadroUtilizacaoHoras = resposta[0]['itensQuadroUtilizacaoHoras']

                    /**
                     * 1. HLJ ajustado = HLJ - HPSD + HPA
                     * 2. Coeficiente de Horas Trabalhadas - CHT = HPS / HLJ ajustado
                     */

                    const HLJ = itensDemonstrativoUtilizacaoHoras.find(i => i['sigla'] === 'HLJ')
                    const HPA = itensQuadroUtilizacaoHoras.find(i => i['descricao'] === "Processos trabalhados em meses anteriores (HPA)")
                    const HPSD = itensQuadroUtilizacaoHoras.find(i => i['descricao'] === "Total de horas em processos em análise (HPSD)")
                    const HPS = itensQuadroUtilizacaoHoras.find(i => i['descricao'] === "Total de horas em processos saídos (HPS)")

                    const HLJ_ajustado = (HLJ['horas'] - HPSD['horasEfetivas'] + HPA['horasEfetivas'])
                    const CHT = Math.round(HPS['horasEstimadas'] / HLJ_ajustado * 100) / 100

                    /**
                     * 3. Índice de Aproveitamento de Horas no Julgamento - IAH = HLJ / HBJ
                     */

                    const HBJ = itensDemonstrativoUtilizacaoHoras.find(i => i['sigla'] === 'HBJ')
                    const IAH = Math.round(HLJ['horas'] / HBJ['horas'] * 100) / 100

                    setListaResultado(prevListaResultado => [
                      ...prevListaResultado,
                      ...[{
                        nomeUnidade: selectedDeate['nome'],
                        nomeEquipe: equipe['sigla'],
                        dataInicial: rhap['dataInicial'],
                        dataFinal: rhap['dataFinal'],
                        usuarioNome: usuario['nome'],
                        cht: CHT,
                        iah: IAH
                      }],
                    ]);

                  }
                  setCount(prevCount => prevCount + 1);
                })
                .catch(e => console.log(e))
            })
          })
          .catch(e => {
            console.log(e)
          })
      })
    })
  }

  useEffect(() => {
    if (count === totalConsulta) {
      setIsConsultando(false);
      if (totalConsulta >= 1 && count >= 1) {
        setLoaded(false);
        setShowResultTable(true);
        setCount(0);
        setSelectedEquipes([]);
        // setPeriodo({ inicial: "", final: "" });
      }
    }
  }, [count, totalConsulta]);

  return (
    <>
      {isConsultando && (
        <LoadingTableScreen total={totalConsulta} count={count}
          label={(<p>Gerando um total de <span>{totalConsulta}</span>{" "}RHAPs.</p>)}
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
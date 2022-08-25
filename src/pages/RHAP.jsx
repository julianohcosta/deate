import React, {useEffect, useState} from "react";
import RelatorioLayout from "../components/RelatorioLayout";
import {message} from "antd";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import LoadingTableScreen from "../components/TableComponent/LoadingTableScreen";
import * as XLSX from "xlsx";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isConsultando, setIsConsultando] = useState(false);
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
  const [listaErro, setListaErro] = useState([]);

  /** Max amount of messages on screen simultaneously */
  message.config({maxCount: 3});

  const showMessage = (msg) => {

    const uniqueKey = uuidv4();

    message.error({
      content: msg,
      style: {fontSize: ".575rem", fontWeight: "500", cursor: 'pointer'},
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
      showMessage("Selecione ao menos um ano");
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
          eq['nome'] = eq['sigla'];
          delete eq['resourceId'];
          delete eq['sigla'];
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
      showMessage("Selecione ao menos um ano");
      return
    }

    if (selectedEquipes.length === 0) {
      showMessage("Selecione ao menos uma equipe");
      return;
    }
    if (selectedYears[0] === new Date().getFullYear() && selectedMonth === String(new Date().getMonth() + 1)) {
      showMessage("Não é possível consultar o mês atual, por favor selecione outro!");
      return;
    }

    setIsConsultando(true);
    setLoaded(false);

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

                    const RhapObj = resposta[0];

                    const consulta = [{
                      Deate: RhapObj['siglaUnidade'],
                      Equipe: RhapObj['siglaEquipe'],
                      Servidor: RhapObj['nomeServidor'],
                      dataInicial: RhapObj['dataInicial'],
                      dataFinal: RhapObj['dataFinal'],
                      qtdDiasUteis: RhapObj['qtdDiasUteis'],
                      existeFraInconsistente: RhapObj['existeFraInconsistente'],
                      frasAbertos: RhapObj['frasAbertos'],
                      frasInconsistentes: RhapObj['frasInconsistentes'],
                      potencialHoras: RhapObj['potencialHoras'],
                      hljAjustado: RhapObj['hljAjustado'],
                      CHT: RhapObj['cht'],
                      IAH: RhapObj['iah'],
                      indiceAderenciaIAH: RhapObj['indiceAderenciaIAH'],
                      iahXIndiceAderenciaIAH: RhapObj['iahXIndiceAderenciaIAH'],
                      producao: RhapObj['producao'],
                      producaoPorJulgador: RhapObj['producaoPorJulgador'],
                    }]

                    RhapObj['itensDemonstrativoUtilizacaoHoras'].forEach(item => {
                      consulta[0][item['descricao']] = item['horas'];
                    })

                    RhapObj['itensIndicadorTemporalidade'].forEach(item => {
                      consulta[0][item['descricao']] = item['valor'];
                    })

                    RhapObj['itensQuadroUtilizacaoHoras'].forEach(item => {
                      consulta[0][`${item['descricao']} - horas efetivas`] = item['horasEfetivas'];
                      consulta[0][`${item['descricao']} - horas estimadas`] = item['horasEstimadas'];
                    })

                    setListaResultado(prevListaResultado => [
                      ...prevListaResultado,
                      ...consulta]);
                  } else {

                    const erro = [{
                      Deate: selectedDeate['nome'],
                      Equipe: equipe['nome'],
                      Servidor: usuario['nome'],
                      dataInicial: rhap['dataInicial'],
                      dataFinal: rhap['dataFinal'],
                      erro: resposta['message'],
                    }]

                    setListaErro(prevListaErro => [
                      ...prevListaErro,
                      ...erro])
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
        setLoaded(true);
        setCount(0);
        setTotalConsultas(0);
        setSelectedEquipes([]);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(listaResultado);
        XLSX.utils.book_append_sheet(wb, ws, "RHAP");
        if (listaErro.length > 0) {
          const wr = XLSX.utils.json_to_sheet(listaErro);
          XLSX.utils.book_append_sheet(wb, wr, "ERRO");
        }
        XLSX.writeFile(wb, "RHAP.xlsx");

      }
    }
  }, [count, totalConsulta, listaResultado, listaErro]);

  return (
    <>
      {isConsultando && (
        <LoadingTableScreen total={totalConsulta} count={count}
                            label={(<p>Gerando um total de <span>{totalConsulta}</span>{" "}RHAPs.</p>)}
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
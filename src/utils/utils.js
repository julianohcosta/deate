// // colunas tabela excel --> fixas
// const EXCEL_COLUMNS = {
//   0: "Deate",
//   1: "Equipe",
//   2: "Servidor",
//   3: "dataInicial",
//   4: "dataFinal",
//   5: "qtdDiasUteis",
//   6: "existeFraInconsistente",
//   7: "frasAbertos",
//   8: "frasInconsistentes",
//   9: "potencialHoras",
//   10: "hljAjustado",
//   11: "CHT",
//   12: "IAH",
//   13: "indiceAderenciaIAH",
//   14: "iahXIndiceAderenciaIAH",
//   15: "producao",
//   16: "producaoPorJulgador",
//   17: "Horas brutas dos servidores",
//   18: "Horas acrescentadas por compensação",
//   19: "Horas Trabalhadas em Outras Equipes da Unidade",
//   20: "Modelo de Dedicação Funcional (MDF)",
//   21: "Horário Especial ou Horário Reduzido",
//   22: "Horas descontadas para compensação",
//   23: "Férias",
//   24: "Licenças e Afastamentos Legais",
//   25: "Ausências justificadas",
//   26: "Demandas formais realizadas para Subsecretaria/Superintendência/Delegacia da RFB",
//   27: "Demandas de Controle (CGU, MPF, Judiciário, CARF, Coger, Audit)",
//   28: "Feriados Locais e Pontos Facultativos (considerar localização física)",
//   29: "Alteração da Lotação/Exercício durante o período",
//   30: "Exercício de Função ou Cargo de Chefia",
//   31: "Horas brutas para Atividades Processuais e Não Processuais em Geral",
//   32: "Estudos/Atualização Relacionados ao Processo de Trabalho e Tarefas RFB não Relacionadas a atividades do Processo de Trabalho",
//   33: "Reuniões Administrativas",
//   34: "Horas líquidas para Atividades Discricionárias e Processuais",
//   35: "Treinamentos não incluídos no Proeduc",
//   36: "Outras Atividades não Especificadas, de Natureza não Processual",
//   37: "Horas líquidas (Disponíveis para Atividades Processuais)",
//   // indicador temporalidade
//   38: "8. Tempo médio (dias) de permanência dos processos na DEATE/VR 03RF DEATE, contado desde a data de ingresso dos processos na DEATE/VR 03RF DEATE, excluídos os dias em diligência",
//   39: "9. Idade média (dias) dos processos na DEATE/VR 03RF DEATE (contada desde a data de protocolo)",
//   // quadro utilizacao horas
//   40: "Processos saídos por julgamento (Quadro 1 do FRA) - horas efetivas",
//   41: "Processos saídos por julgamento (Quadro 1 do FRA) - horas estimadas",
//   42: "Processos saídos (Quadro 1 do FRA) - horas efetivas",
//   43: "Processos saídos (Quadro 1 do FRA) - horas estimadas",
//   44: "Processos saídos por outros motivos (Quadro 2 do FRA) - horas efetivas",
//   45: "Processos saídos por outros motivos (Quadro 2 do FRA) - horas estimadas",
//   46: "Processos com vista registrada em ata (Quadro 3 do FRA) - horas efetivas",
//   47: "Processos com vista registrada em ata (Quadro 3 do FRA) - horas estimadas",
//   48: "Total de horas em processos saídos (HPS) - horas efetivas",
//   49: "Total de horas em processos saídos (HPS) - horas estimadas",
//   // demonstrativo utilizacao horas
//   50: "Processos em análise no mês ou aguardando saída/julgamento - HPSD (Quadro 4 do FRA) - horas efetivas",
//   51: "Processos em análise no mês ou aguardando saída/julgamento - HPSD (Quadro 4 do FRA) - horas estimadas",
//   52: "Processos em análise - HPSD (Quadro 2 do FRA) - horas efetivas",
//   53: "Processos em análise - HPSD (Quadro 2 do FRA) - horas estimadas",
//   54: "Total de horas em processos em análise (HPSD) - horas efetivas",
//   55: "Total de horas em processos em análise (HPSD) - horas estimadas",
//   56: "Total de horas efetivamente trabalhadas (HEFT = HL) - horas efetivas",
//   57: "Total de horas efetivamente trabalhadas (HEFT = HL) - horas estimadas",
//   58: "Processos trabalhados em meses anteriores (HPA) - horas efetivas",
//   59: "Processos trabalhados em meses anteriores (HPA) - horas estimadas",
//   60: "Cursos e outros eventos incluídos no ProEduc",
//   61: "Outros trabalhos na Unidade de Lotação ou em Outra Unidade RFB",
//   62: "Cursos incluídos no ProEduc com carga horária total superior a 40h",
//   63: "Atividades de Delegado",
//   64: "Treinamentos incluídos no Proeduc",
//   65: "Ações de Cidadania Fiscal, de Conformidade ou de Comunicação Institucional",
//   66: "Promoção de atividades de Qualidade de Vida no Trabalho",
//   67: "Viagens a Serviço e Deslocamentos",
//   68: "Operações e Força-Tarefa da Área Aduaneira ou de Tributos Internos",
//   69: "Atividades de Assessoramento Técnico com Anuência da Chefia",
//   70: "Atendimento Presencial",
//   71: "Atividades de Suporte (Suporte web, Fale-conosco, SoliCorp, SIC), Ouvidoria e Caixa Corporativa",
//   72: "Homologação e Configuração de Sistemas; Desenvolvimento e Execução de Ferramentas de Automação",
//   73: "Outras Tarefas não Passíveis de Metrificação, relacionadas ao Processo de Trabalho",
// };

const montaGeral = rhapObject => {
  const GERAL = {};

  GERAL.Deate = rhapObject["siglaUnidade"];
  GERAL.Equipe = rhapObject["siglaEquipe"];
  GERAL.Servidor = rhapObject["nomeServidor"];
  GERAL.dataInicial = rhapObject["dataInicial"];
  GERAL.dataFinal = rhapObject["dataFinal"];
  GERAL.qtdDiasUteis = rhapObject["qtdDiasUteis"];
  GERAL.existeFraInconsistente = rhapObject["existeFraInconsistente"];
  GERAL.frasAbertos = rhapObject["frasAbertos"];
  GERAL.frasInconsistentes = rhapObject["frasInconsistentes"];
  GERAL.potencialHoras = rhapObject["potencialHoras"];
  GERAL.hljAjustado = rhapObject["hljAjustado"];
  GERAL.CHT = rhapObject["cht"];
  GERAL.IAH = rhapObject["iah"];
  GERAL.indiceAderenciaIAH = rhapObject["indiceAderenciaIAH"];
  GERAL.iahXIndiceAderenciaIAH = rhapObject["iahXIndiceAderenciaIAH"];
  GERAL.producao = rhapObject["producao"];
  GERAL.producaoPorJulgador = rhapObject["producaoPorJulgador"];

  return GERAL;
};

const montaDemonstrativoHorasUtilizadas = rhapObject => {
  const itensDemonstrativoUtilizacaoHoras = {
    "Horas brutas dos servidores": "",
    "Horas acrescentadas por compensação": "",
    "Horas Trabalhadas em Outras Equipes da Unidade": "",
    "Treinamentos incluídos no Proeduc": "",
    "Modelo de Dedicação Funcional (MDF)": "",
    "Horário Especial ou Horário Reduzido": "",
    "Ações de Cidadania Fiscal, de Conformidade ou de Comunicação Institucional":
      "",
    "Horas descontadas para compensação": "",
    //prettier-ignore
    "Férias": "",
    "Licenças e Afastamentos Legais": "",
    "Ausências justificadas": "",
    "Demandas formais realizadas para Subsecretaria/Superintendência/Delegacia da RFB":
      "",
    "Demandas de Controle (CGU, MPF, Judiciário, CARF, Coger, Audit)": "",
    "Feriados Locais e Pontos Facultativos (considerar localização física)": "",
    "Alteração da Lotação/Exercício durante o período": "",
    "Promoção de atividades de Qualidade de Vida no Trabalho": "",
    "Viagens a Serviço e Deslocamentos": "",
    "Operações e Força-Tarefa da Área Aduaneira ou de Tributos Internos": "",
    "Atividades de Assessoramento Técnico com Anuência da Chefia": "",
    "Exercício de Função ou Cargo de Chefia": "",
    "Atendimento Presencial": "",
    "Horas brutas para Atividades Processuais e Não Processuais em Geral": "",
    "Estudos/Atualização Relacionados ao Processo de Trabalho e Tarefas RFB não Relacionadas a atividades do Processo de Trabalho":
      "",
    "Atividades de Suporte (Suporte web, Fale-conosco, SoliCorp, SIC), Ouvidoria e Caixa Corporativa":
      "",
    "Homologação e Configuração de Sistemas; Desenvolvimento e Execução de Ferramentas de Automação":
      "",
    "Outras Tarefas não Passíveis de Metrificação, relacionadas ao Processo de Trabalho":
      "",
    "Reuniões Administrativas": "",
    "Horas líquidas para Atividades Discricionárias e Processuais": "",
    "Treinamentos não incluídos no Proeduc": "",
    "Outras Atividades não Especificadas, de Natureza não Processual": "",
    "Horas líquidas (Disponíveis para Atividades Processuais)": "",
  };

  rhapObject.itensDemonstrativoUtilizacaoHoras.forEach(item => {
    const descricao = item.descricao;
    itensDemonstrativoUtilizacaoHoras[descricao] = item.horas;
  });

  return itensDemonstrativoUtilizacaoHoras;
};

const montaItensIndicadorTemporalidade = rhapObject => {
  const itensIndicadorTemporalidade = {
    "8. Tempo médio (dias) de permanência dos processos na DEATE/VR  03RF  DEATE, contado desde a data de ingresso dos processos na DEATE/VR  03RF  DEATE, excluídos os dias em diligência":
      "",
    "9. Idade média (dias) dos processos na DEATE/VR  03RF  DEATE (contada desde a data de protocolo)":
      "",
  };
  rhapObject.itensIndicadorTemporalidade.forEach(item => {
    const descricao = item.descricao;
    itensIndicadorTemporalidade[descricao] = item.valor;
  });
  return itensIndicadorTemporalidade;
};

const montaQuadroUtilizacaoHoras = rhapObject => {
  const itensQuadroUtilizacaoHoras = {
    "Processos saídos por julgamento (Quadro 1 do FRA) - horas efetivas": "",
    "Processos saídos por julgamento (Quadro 1 do FRA) - horas estimadas": "",

    "Processos saídos (Quadro 1 do FRA) - horas efetivas": "",
    "Processos saídos (Quadro 1 do FRA) - horas estimadas": "",

    "Processos saídos por outros motivos (Quadro 2 do FRA) - horas efetivas":
      "",
    "Processos saídos por outros motivos (Quadro 2 do FRA) - horas estimadas":
      "",

    "Processos com vista registrada em ata (Quadro 3 do FRA) - horas efetivas":
      "",
    "Processos com vista registrada em ata (Quadro 3 do FRA) - horas estimadas":
      "",

    "Total de horas em processos saídos (HPS) - horas efetivas": "",
    "Total de horas em processos saídos (HPS) - horas estimadas": "",

    "Processos em análise no mês ou aguardando saída/julgamento - HPSD (Quadro 4 do FRA) - horas efetivas":
      "",
    "Processos em análise no mês ou aguardando saída/julgamento - HPSD (Quadro 4 do FRA) - horas estimadas":
      "",

    "Processos em análise - HPSD (Quadro 2 do FRA) - horas efetivas": "",
    "Processos em análise - HPSD (Quadro 2 do FRA) - horas estimadas": "",

    "Total de horas em processos em análise (HPSD) - horas efetivas": "",
    "Total de horas em processos em análise (HPSD) - horas estimadas": "",

    "Total de horas efetivamente trabalhadas (HEFT = HL) - horas efetivas": "",
    "Total de horas efetivamente trabalhadas (HEFT = HL) - horas estimadas": "",

    "Processos trabalhados em meses anteriores (HPA) - horas efetivas": "",
    "Processos trabalhados em meses anteriores (HPA) - horas estimadas": "",
  };

  rhapObject.itensQuadroUtilizacaoHoras.forEach(item => {
    const descricao = item.descricao;
    itensQuadroUtilizacaoHoras[`${descricao} - horas efetivas`] =
      item.horasEfetivas;
    itensQuadroUtilizacaoHoras[`${descricao} - horas estimadas`] =
      item.horasEstimadas;
  });

  return itensQuadroUtilizacaoHoras;
};

const montaConsulta = rhapObject => {
  //geral
  const geral = montaGeral(rhapObject);
  //Demonstrativo Utilizacao Horas
  const demonstrativoUtilizacaoHoras =
    montaDemonstrativoHorasUtilizadas(rhapObject);
  // Indicador de Temporalidade
  const indicadorTemporalidade = montaItensIndicadorTemporalidade(rhapObject);
  // Quadro Utilizacao de Horas
  const quadroUtilizacaoHoras = montaQuadroUtilizacaoHoras(rhapObject);

  return [
    {
      ...geral,
      ...demonstrativoUtilizacaoHoras,
      ...indicadorTemporalidade,
      ...quadroUtilizacaoHoras,
    },
  ];
};

export default montaConsulta;

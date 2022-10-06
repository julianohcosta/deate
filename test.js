const itens = [
  {
    horasEfetivas: 0,
    descricao: "Processos saídos por julgamento (Quadro 1 do FRA)",
    horasEstimadas: 0,
  },

  {
    horasEfetivas: 0,
    descricao: "Processos saídos (Quadro 1 do FRA)",
    horasEstimadas: 0,
  },

  {
    horasEfetivas: 0,
    descricao: "Processos saídos por outros motivos (Quadro 2 do FRA)",
    horasEstimadas: 0,
  },

  {
    horasEfetivas: 0,
    descricao: "Processos com vista registrada em ata (Quadro 3 do FRA)",
    horasEstimadas: 0,
  },

  { descricao: "Total de horas em processos saídos (HPS)", horasEstimadas: 0 },

  {
    horasEfetivas: 0,
    descricao:
      "Processos em análise no mês ou aguardando saída/julgamento - HPSD (Quadro 4 do FRA)",
  },

  {
    horasEfetivas: 0,
    descricao: "Processos em análise - HPSD (Quadro 2 do FRA)",
  },

  {
    horasEfetivas: 0,
    descricao: "Total de horas em processos em análise (HPSD)",
  },

  {
    horasEfetivas: 0,
    descricao: "Total de horas efetivamente trabalhadas (HEFT = HL)",
  },

  {
    horasEfetivas: 0,
    descricao: "Processos trabalhados em meses anteriores (HPA)",
  },
];

const itensQuadroUtilizacaoHoras = {
  "Processos saídos por julgamento (Quadro 1 do FRA) - horas efetivas": "",
  "Processos saídos por julgamento (Quadro 1 do FRA) - horas estimadas": "",

  "Processos saídos (Quadro 1 do FRA) - horas efetivas": "",
  "Processos saídos (Quadro 1 do FRA) - horas estimadas": "",

  "Processos saídos por outros motivos (Quadro 2 do FRA) - horas efetivas": "",
  "Processos saídos por outros motivos (Quadro 2 do FRA) - horas estimadas": "",

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

const montaQuadroUtilizacaoHoras = obj => {
  obj.forEach(item => {
    const descricao = item.descricao;
    itensQuadroUtilizacaoHoras[`${descricao} - horas efetivas`] =
      item.horasEfetivas;
    itensQuadroUtilizacaoHoras[`${descricao} - horas estimadas`] =
      item.horasEstimadas;
  });

  return itensQuadroUtilizacaoHoras;
};

// console.log(montaQuadroUtilizacaoHoras(itens));

// console.log(itensQuadroUtilizacaoHoras);

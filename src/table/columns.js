import { format } from "date-fns";

const MONTHS_INDEX = [
  { mes: "Jan", id: 0 },
  { mes: "Fev", id: 1 },
  { mes: "Mar", id: 2 },
  { mes: "Abr", id: 3 },
  { mes: "Mai", id: 4 },
  { mes: "Jun", id: 5 },
  { mes: "Jul", id: 6 },
  { mes: "Ago", id: 7 },
  { mes: "Set", id: 8 },
  { mes: "Out", id: 9 },
  { mes: "Nov", id: 10 },
  { mes: "Dez", id: 11 },
];

const getMonthAndYear = dateStr => {
  const month = MONTHS_INDEX.filter(month_index => {
    return month_index.mes.toLocaleUpperCase() === dateStr.split("/")[0];
  })[0].id;
  const year = dateStr.split("/")[1];

  return [year, month];
};

export const GROUPED_COLUMNS = [
  {
    Header: "Unidade",
    accessor: "nomeUnidade",
  },
  {
    Header: "Equipe",
    accessor: "nomeEquipe",
  },
  {
    Header: "Frequência",
    accessor: "frequencia",
    Cell: ({ value }) => {
      return format(new Date(...getMonthAndYear(value)), "MMM/yyyy");
    },
  },
  {
    Header: "Aumento Processos",
    columns: [
      {
        Header: "Entradas",
        accessor: "aumentoProcessosEntradas",
      },
      {
        Header: "Formalizados",
        accessor: "aumentoProcessosFormalizados",
      },
      {
        Header: "Reinclusão",
        accessor: "aumentoProcessosReinclusao",
      },
      {
        Header: "Disjuntados",
        accessor: "aumentoProcessosDisjuntados",
      },
      {
        Header: "Total",
        accessor: "aumentoProcessosTotal",
      },
    ],
  },
  {
    Header: "Diminuição Processos",
    columns: [
      {
        Header: "Saídas",
        accessor: "diminuicaoProcessosSaidas",
      },
      {
        Header: "Juntados",
        accessor: "diminuicaoProcessosJuntados",
      },
      {
        Header: "Físicos",
        accessor: "diminuicaoProcessosTornadosFisicos",
      },
      {
        Header: "Excluídos",
        accessor: "diminuicaoProcessosExcluidos",
      },
      {
        Header: "Total",
        accessor: "diminuicaoProcessosTotal",
      },
    ],
  },
  {
    Header: "Estoque Final",
    accessor: "estoqueFinal",
  },
  {
    Header: "Média",
    accessor: "media",
  },
];

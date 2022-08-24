import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdClose } from "react-icons/md";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import classes from "./TableComponent.module.css";
import GlobalFilterComponent from "./GlobalFilterComponent";

const TableComponent = props => {
  const [hiddenTable, setHiddenTable] = useState(false);
  const columns = useMemo(() => props.columns, []);

  const data = useMemo(() => props.listaResultado, [props.listaResultado]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // use page instead rows for pagination
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination); // react-table instance

  const { pageSize, pageIndex, globalFilter } = state;

  const excelExportHandle = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, "Relatório_Deate.xlsx");
  };

  const closeHandler = () => {
    setHiddenTable(!hiddenTable);
    props.onClose(hiddenTable);
  };

  return (
    <div
      className={`${classes["table-container"]} ${
        hiddenTable ? classes["hidden"] : ""
      }`}
    >
      <div className={classes["container-search-export-close"]}>
        <div className={classes["container-search"]}>
          <GlobalFilterComponent
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </div>
        <div className={classes["container-export"]}>
          <p>Exportar:</p>
          <CSVLink
            data={data}
            target="_blank"
            filename={"Relatório_Deates.csv"}
          >
            <GrDocumentCsv className={classes["btn-export--csv"]} />
          </CSVLink>

          <SiMicrosoftexcel
            className={classes["btn-export--excel"]}
            onClick={excelExportHandle}
          />
        </div>
        {/** Botao Fechar Tabela*/}
        <MdClose
          className={classes["btn-export--close"]}
          onClick={closeHandler}
        />
      </div>
      <table {...getTableProps()} className={classes["table-resultado"]}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <AiOutlineSortDescending />
                      ) : (
                        <AiOutlineSortAscending />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes["container-pagination"]}>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <span>
          | Ir para página:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[12, 24, 36, 48].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Exibir {pageSize}
            </option>
          ))}
        </select>
        <div className={classes["container-pagination--btn"]}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Anterior
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Próxima
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

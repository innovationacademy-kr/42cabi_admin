import React, { useMemo } from "react";
import CABINET_DATA from "./CABINET_DATA.json";
import { cabinetDataStruct } from "./cabinetDataStruct";
import { usePagination, useTable } from "react-table";
import "./table.css";

export const CabinetTable = () => {
  const columns = useMemo(() => cabinetDataStruct, []);
  const data = useMemo(() => CABINET_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 20 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="table-pagination"
        style={{
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          <strong
            style={{ display: "block", width: "100px", textAlign: "center" }}
          >
            {pageIndex + 1} / {pageOptions.length}
          </strong>
        </span>
        <span>
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "40px", marginRight: "30px" }}
          />
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <div
        className="table-pagesize"
        style={{
          margin: "5px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}개 씩 보기
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CabinetTable;

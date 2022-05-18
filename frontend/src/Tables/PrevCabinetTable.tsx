import { useMemo } from "react";
import { prevCabinetTableStruct } from "./prevCabinetTableStruct";
import { usePagination, useTable } from "react-table";
import "./table.css";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

export const PrevCabinetTable = () => {
  const SearchUserRedux = useSelector(
    (state: RootState) => state.SearchCabinet
  );

  const columns = useMemo(() => prevCabinetTableStruct, []);
  // const columns = cabinetMiniDataStruct;
  const data = useMemo(
    () => SearchUserRedux.data?.resultFromLentLog || [],
    [SearchUserRedux.data?.resultFromLentLog]
  );
  // const data = SearchUserRedux;

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        // @ts-ignore
        columns,
        data,
        initialState: { pageSize: 3 },
      },
      usePagination
    );

  return (
    <div className="table">
      <p>이전 사용자 기록</p>
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
    </div>
  );
};

export default PrevCabinetTable;

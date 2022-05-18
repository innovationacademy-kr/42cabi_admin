import { useMemo } from "react";
import { prevUserTableStruct } from "./prevUserTableStruct";
import { usePagination, useTable } from "react-table";
import "./table.css";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

export const PrevUserTable = () => {
  const SearchCabinetRedux = useSelector(
    (state: RootState) => state.SearchUser
  );

  const columns = useMemo(() => prevUserTableStruct, []);
  // const columns = cabinetMiniDataStruct;
  const data = useMemo(
    () => SearchCabinetRedux.data?.resultFromLentLog || [],
    [SearchCabinetRedux.data?.resultFromLentLog]
  );
  // const data = SearchCabinetRedux;

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        // @ts-ignore
        columns,
        data,
        initialState: { pageSize: 10 },
      },
      usePagination
    );

  return (
    <div className="table">
      <p>이전 대여 사물함 기록</p>
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

export default PrevUserTable;

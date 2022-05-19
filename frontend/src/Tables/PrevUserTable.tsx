import { useMemo } from "react";
import { prevUserTableStruct } from "./prevUserTableStruct";
import { usePagination, useTable } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { TableHead, TableSheet, Td, Th, Tr } from "./tableStyleComponent";

export const PrevUserTable = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );

  const columns = useMemo(() => prevUserTableStruct, []);
  const data = useMemo(
    () => SearchResponseRedux.resultFromLentLog || [],
    [SearchResponseRedux.resultFromLentLog]
  );

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
    <div>
      <h2>이전 대여 사물함 기록</h2>
      <TableSheet {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </TableHead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </TableSheet>
    </div>
  );
};

export default PrevUserTable;

import { useMemo } from "react";
import { prevCabinetTableStruct } from "./prevCabinetTableStruct";
import { useTable, useSortBy } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { TableHead, TableSheet, Td, Th, Tr } from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { SearchResponseFromLentLog } from "../DataTypes";

export const PrevCabinetTable = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );

  const columns = useMemo(() => prevCabinetTableStruct, []);
  const data = useMemo(
    () => SearchResponseRedux.resultFromLentLog || [],
    [SearchResponseRedux.resultFromLentLog]
  );

  const navigate = useNavigate();
  const GoToUserPage = (data: SearchResponseFromLentLog) => {
    navigate({
      pathname: "/saerom/search/searchDashboard",
      search: createSearchParams({
        intraId: data.intra_id || "",
      }).toString(),
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        // @ts-ignore
        columns,
        data,
        initialState: { pageSize: 10 },
      },
      useSortBy
    );
  return (
    <div>
      <h2>이전 사용자 기록</h2>
      <TableSheet {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column?: any) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </TableHead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => GoToUserPage(row.original)}
              >
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

export default PrevCabinetTable;

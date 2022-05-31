import { useMemo } from "react";
import { ExpiredTableStruct } from "./ExpiredTableStruct";
import { usePagination, useTable } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { TableHead, TableSheet, Td, Th, Tr } from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { StatusResponseExpired } from "../type";

export const ExpiredTable = () => {
  const StatusExpiredRedux = useSelector(
    (state: RootState) => state.StatusExpired,
    shallowEqual
  );

  const columns = useMemo(() => ExpiredTableStruct, []);
  const data = useMemo(() => StatusExpiredRedux || [], [StatusExpiredRedux]);

  const navigate = useNavigate();
  const GoToUserPage = (data: StatusResponseExpired) => {
    navigate({
      pathname: "/saerom/search/searchDashboard",
      search: createSearchParams({
        intraId: data.intra_id || "",
      }).toString(),
    });
  };

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
      <h2>연체자 리스트</h2>
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

export default ExpiredTable;

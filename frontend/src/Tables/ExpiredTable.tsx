import { useMemo } from "react";
import { ExpiredTableStruct } from "./ExpiredTableStruct";
import { usePagination, useSortBy, useTable } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import {
  TableHead,
  TableIndexBox,
  TablePageControlBox,
  TableSheet,
  Td,
  Th,
  Tr,
} from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { StatusResponseExpired } from "../type";
import { PrevLogBox } from "../Components/DashboardStyleComponent";

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useSortBy,
    usePagination
  );
  const { pageIndex } = state;
  const totalDataCount = StatusExpiredRedux.length;

  if (StatusExpiredRedux.length !== 0) {
    return (
      <div>
        <h2>연체자 리스트</h2>
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
        <TablePageControlBox>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
          <span>
            <TableIndexBox>
              {pageIndex + 1} / {pageOptions.length}
            </TableIndexBox>
            총 {totalDataCount}건
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </TablePageControlBox>
      </div>
    );
  } else {
    return <PrevLogBox>연체 중인 사용자가 없습니다.</PrevLogBox>;
  }
};

export default ExpiredTable;

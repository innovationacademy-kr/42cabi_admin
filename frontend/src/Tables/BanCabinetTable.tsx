import { useMemo } from "react";
import { banCabinetTableStruct } from "./banCabinetTableStruct";
import { usePagination, useSortBy, useTable } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import {
  TableHead,
  TableSheet,
  Td,
  Th,
  Tr,
  TablePageControlBox,
  TableIndexBox,
} from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { TaskBanCabinet } from "../type";
import { PrevLogBox } from "../Components/DashboardStyleComponent";

export const BanCabinetTable = () => {
  const TaskBanCabinetRedux = useSelector(
    (state: RootState) => state.TaskBanCabinet,
    shallowEqual
  );

  const columns = useMemo(() => banCabinetTableStruct, []);
  const data = useMemo(() => TaskBanCabinetRedux || [], [TaskBanCabinetRedux]);

  const navigate = useNavigate();
  const GoToCabinetPage = (data: TaskBanCabinet) => {
    navigate({
      pathname: "/saerom/search/searchDashboard",
      search: createSearchParams({
        floor: data.floor?.toString() || "",
        cabinetNum: data.cabinet_num?.toString() || "",
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
  const totalDataCount = TaskBanCabinetRedux.length;

  if (TaskBanCabinetRedux.length !== 0) {
    return (
      <div>
        <h2>확인해야 할 사물함 리스트</h2>
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
                  onClick={() => GoToCabinetPage(row.original)}
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
    return <PrevLogBox>확인해야 할 사물함이 없습니다!</PrevLogBox>;
  }
};

export default BanCabinetTable;

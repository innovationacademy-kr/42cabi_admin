import { useMemo } from "react";
import { disabledTableStruct } from "./disabledTableStruct";
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
import { StatusResponseDisabled } from "../type";
import { PrevLogBox } from "../Components/DashboardStyleComponent";

export const DisabledTable = (props: any) => {
  const StatusDisabledRedux = useSelector(
    (state: RootState) => state.StatusDisabled,
    shallowEqual
  );

  const columns = useMemo(() => disabledTableStruct, []);
  const data = useMemo(() => StatusDisabledRedux || [], [StatusDisabledRedux]);
  const { setParams } = props;

  const SetCabinetParams = (data: StatusResponseDisabled) => {
    setParams({ floor: data.floor, cabinetNum: data.cabinet_num });
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
      initialState: { pageSize: 10 },
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );
  const { pageIndex } = state;
  const totalDataCount = StatusDisabledRedux.length;

  if (StatusDisabledRedux.length !== 0) {
    return (
      <div>
        <h2>사용 불가 사물함</h2>
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
                  onClick={() => SetCabinetParams(row.original)}
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
    return <PrevLogBox>사용 불가 사물함이 없습니다.</PrevLogBox>;
  }
};

export default DisabledTable;

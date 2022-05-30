import { useMemo } from "react";
import { DisabledTableStruct } from "./DisabledTableStruct";
import { usePagination, useTable } from "react-table";
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
import { StatusResponseDisabled } from "../DataTypes";
import { PrevLogBox } from "../Components/DashboardStyleComponent";

export const DisabledTable = () => {
  const StatusDisabledRedux = useSelector(
    (state: RootState) => state.StatusDisabled,
    shallowEqual
  );

  const columns = useMemo(() => DisabledTableStruct, []);
  const data = useMemo(() => StatusDisabledRedux || [], [StatusDisabledRedux]);

  const navigate = useNavigate();
  const GoToCabinetPage = (data: StatusResponseDisabled) => {
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
    usePagination
  );
  const { pageIndex } = state;

  if (StatusDisabledRedux.length !== 0) {
    return (
      <div>
        <h2>비활성화 사물함 리스트</h2>
        <TableSheet {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
    return <PrevLogBox>비활성화 된 사물함이 없습니다.</PrevLogBox>;
  }
};

export default DisabledTable;

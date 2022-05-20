import { useMemo } from "react";
import { DisabledTableStruct } from "./DisabledTableStruct";
import { usePagination, useTable } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { TableHead, TableSheet, Td, Th, Tr } from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { StatusResponseDisabled } from "../DataTypes";

export const DisabledTable = () => {
  const StatusExpiredRedux = useSelector(
    (state: RootState) => state.StatusDisabled,
    shallowEqual
  );

  const columns = useMemo(() => DisabledTableStruct, []);
  const data = useMemo(() => StatusExpiredRedux || [], [StatusExpiredRedux]);

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
      <h2>비활성화 사물함 리스트</h2>
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
    </div>
  );
};

export default DisabledTable;

import { useMemo } from "react";
import { prevUserTableStruct } from "./prevUserTableStruct";
import { useTable, useSortBy } from "react-table";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import {
  TableHead,
  TableSheet,
  Td,
  Th,
  Tr,
  SmallGrayText,
  BigBlackText,
} from "./tableStyleComponent";
import { useNavigate, createSearchParams } from "react-router-dom";
import { SearchResponseFromLentLog } from "../DataTypes";

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

  const navigate = useNavigate();
  const GoToCabinetPage = (data: SearchResponseFromLentLog) => {
    navigate({
      pathname: "/saerom/search/searchDashboard",
      search: createSearchParams({
        floor: data.floor?.toString() || "",
        cabinetNum: data.cabinet_num?.toString() || "",
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
      <BigBlackText>이전 대여 사물함 기록</BigBlackText>
      <SmallGrayText>최근 10건까지 표시됩니다.</SmallGrayText>
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

export default PrevUserTable;

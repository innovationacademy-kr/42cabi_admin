import { useMemo } from "react";
import { cabinetMiniDataStruct } from "./cabinetMiniDataStruct";
import { usePagination, useTable } from "react-table";
import "./table.css";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

export const MiniTable = () => {
  //   const SearchCabinetRedux = useSelector(
  //     (state: RootState) => state.SearchCabinet
  //   );
  //   const columns = useMemo(() => cabinetMiniDataStruct, []);
  //   // const columns = cabinetMiniDataStruct;
  //   const data = useMemo(() => SearchCabinetRedux, [SearchCabinetRedux]);
  //   // const data = SearchCabinetRedux;
  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     page,
  //     state,
  //     prepareRow,
  //   } = useTable(
  //     {
  //       // @ts-ignore
  //       columns,
  //       data,
  //       initialState: { pageSize: 20 },
  //     },
  //     usePagination
  //   );
  //   return (
  //     <div className="table">
  //       <table {...getTableProps()}>
  //         <thead>
  //           {headerGroups.map((headerGroup) => (
  //             <tr {...headerGroup.getHeaderGroupProps()}>
  //               {headerGroup.headers.map((column) => (
  //                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
  //               ))}
  //             </tr>
  //           ))}
  //         </thead>
  //         <tbody {...getTableBodyProps()}>
  //           {page.map((row: any) => {
  //             prepareRow(row);
  //             return (
  //               <tr {...row.getRowProps()}>
  //                 {row.cells.map((cell: any) => {
  //                   return (
  //                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  //                   );
  //                 })}
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
};

export default MiniTable;

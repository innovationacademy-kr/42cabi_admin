import moment from "moment";

export const disabledTableStruct = [
  {
    Header: "층",
    accessor: "floor",
  },
  {
    Header: "번호",
    accessor: "cabinet_num",
  },
  {
    Header: "사유",
    accessor: "note",
  },
  // {
  //   Header: "고장 발생일",
  //   accessor: "disabled_time",
  //   Cell: (props: any) => {
  //     const date = props;
  //     return moment(date.value).format("YY-MM-DD");
  //   },
  // },
];

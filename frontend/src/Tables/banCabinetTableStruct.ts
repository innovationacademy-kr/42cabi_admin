// import moment from "moment";

export const banCabinetTableStruct = [
  {
    Header: "층",
    accessor: "floor",
  },
  {
    Header: "위치",
    accessor: "section",
  },
  {
    Header: "번호",
    accessor: "cabinet_num",
  },
  // {
  //   Header: "고장 발생일",
  //   accessor: "expire_time",
  //   Cell: (props: any) => {
  //     const date = props;
  //     return moment(date.value).format("YY-MM-DD");
  //   },
  // },
];

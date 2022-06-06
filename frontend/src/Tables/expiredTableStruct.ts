import moment from "moment";

export const expiredTableStruct = [
  {
    Header: "인트라 ID",
    accessor: "intra_id",
  },
  {
    Header: "층",
    accessor: "floor",
  },
  {
    Header: "번호",
    accessor: "cabinet_num",
  },
  {
    Header: "반납 예정일",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date = props;
      return moment(date.value).format("YY-MM-DD");
    },
  },
  {
    Header: "연체일수",
    accessor: "none",
    Cell: (row: any) => {
      const expireDayString = moment(row.row.original.expire_time);
      const todayString = moment();
      return todayString.diff(expireDayString, "days") + "일";
    },
  },
];

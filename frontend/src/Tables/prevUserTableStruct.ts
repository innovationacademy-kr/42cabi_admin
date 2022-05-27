import moment from "moment";

export const prevUserTableStruct = [
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
  {
    Header: "대여일",
    accessor: "lent_time",
    Cell: (props: any) => {
      const date: string = props;
      return moment(date).format("YY-MM-DD");
    },
  },
  {
    Header: "반납일",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date: string = props;
      return moment(date).format("YY-MM-DD");
    },
  },
];

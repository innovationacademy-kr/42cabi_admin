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
    Header: "표시 번호",
    accessor: "cabinet_num",
  },
  {
    Header: "대여 시간",
    accessor: "lent_time",
    Cell: (props: any) => {
      const date: string = props.value.toString().split("T")[0];
      return moment(date).format("YYYY년 MM월 DD일");
    },
  },
  {
    Header: "반납 시간",
    accessor: "return_time",
    Cell: (props: any) => {
      const date: string = props.value.toString().split("T")[0];
      return moment(date).format("YYYY년 MM월 DD일");
    },
  },
];

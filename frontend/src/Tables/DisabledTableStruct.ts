import moment from "moment";

export const DisabledTableStruct = [
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
    accessor: "reason",
  },
  {
    Header: "고장 발생일",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date = props;
      return moment(date.value).format("YYYY년 MM월 DD일");
    },
  },
];

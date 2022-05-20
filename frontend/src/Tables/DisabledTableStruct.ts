import moment from "moment";

export const DisabledTableStruct = [
  {
    Header: "인트라 ID",
    accessor: "intra_id",
  },
  {
    Header: "층",
    accessor: "floor",
  },
  {
    Header: "표시 번호",
    accessor: "cabinet_num",
  },
  {
    Header: "반납 예정일",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date: string = props;
      return moment(date).format("YYYY년 MM월 DD일");
    },
  },
];

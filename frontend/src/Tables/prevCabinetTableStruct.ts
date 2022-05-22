import moment from "moment";

export const prevCabinetTableStruct = [
  {
    Header: "인트라 ID",
    accessor: "intra_id",
  },
  {
    Header: "대여 시간",
    accessor: "lent_time",
    Cell: (props: any) => {
      const date: string = props;
      return moment(date).format("YYYY년 MM월 DD일");
    },
  },
  {
    Header: "반납 시간",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date: string = props;
      return moment(date).format("YYYY년 MM월 DD일");
    },
  },
];

import moment from "moment";

export const prevCabinetTableStruct = [
  {
    Header: "인트라 아이디",
    accessor: "intra_id",
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

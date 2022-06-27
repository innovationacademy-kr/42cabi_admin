import moment from "moment";

export const banUserTableStruct = [
  {
    Header: "인트라 ID",
    accessor: "intra_id",
  },
  {
    Header: "처리 일자",
    accessor: " bannedDate",
    Cell: (props: any) => {
      const date = props;
      return moment(date.value).format("YY-MM-DD");
    },
  },
];

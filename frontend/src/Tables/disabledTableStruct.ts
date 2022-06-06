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
    accessor: "reason",
    Cell: () => {
      return "몇 글자까지 들어가는게 이쁘게 보일";
    },
  },
  {
    Header: "고장 발생일",
    accessor: "expire_time",
    Cell: (props: any) => {
      const date = props;
      return moment(date.value).format("YY-MM-DD");
    },
  },
];

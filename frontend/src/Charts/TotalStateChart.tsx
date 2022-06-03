import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { FloorStateData, PieData } from "../type";
import styled from "styled-components";
import * as API from "../Networks/APIType";

const TotalStateChart = () => {
  const [totalState, setTotalState] = useState<PieData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await API.axiosFormat(
          {
            method: "GET",
            url: API.url("/api/cabinet/count/floor"),
          },
          token
        );
        let used = 0,
          overdue = 0,
          disabled = 0,
          unused = 0;
        res.data.forEach((element: FloorStateData) => {
          used += element.used;
          overdue += element.overdue;
          disabled += element.disabled;
          unused += element.unused;
        });
        setTotalState([
          { name: "사용 중", value: used },
          { name: "연체", value: overdue },
          { name: "사용 불가", value: disabled },
          { name: "미사용", value: unused },
        ]);
      } catch (e) {
        console.log("error");
        setIsError(true);
      }
    };
    fetchState();
  }, []);

  const colors = ["#05a55a", "#f39c13", "#f56a54", "#bbbbbb"];

  if (isError)
    return (
      <DataLoadErrorStyles>데이터를 불러올 수 없습니다 :(</DataLoadErrorStyles>
    );
  return (
    <PieChart width={500} height={300}>
      <Tooltip cursor={false} contentStyle={{ backgroundColor: "#ffffffaa" }} />
      <Legend />
      <Pie
        data={totalState}
        innerRadius={70}
        outerRadius={100}
        paddingAngle={1}
        dataKey="value"
        animationBegin={0}
        animationDuration={800}
      >
        {totalState.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

const DataLoadErrorStyles = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TotalStateChart;

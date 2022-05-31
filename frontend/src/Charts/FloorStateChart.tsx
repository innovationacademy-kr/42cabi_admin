import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { FloorStateData } from "../type";
import styled from "styled-components";

const FloorStateChart = () => {
  const [floorStateData, setFloorStateData] = useState<FloorStateData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/cabinet/count/floor"
        );
        res.data.forEach((element: FloorStateData) => {
          element.floor += "F";
        });
        setFloorStateData(res.data);
      } catch (e) {
        console.log("error");
        setIsError(true);
      }
    };
    fetchState();
  }, []);

  if (isError)
    return (
      <DataLoadErrorStyles>데이터를 불러올 수 없습니다 :(</DataLoadErrorStyles>
    );
  return (
    <BarChart
      width={500}
      height={300}
      data={floorStateData}
      margin={{
        top: 15,
        right: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3" />
      <XAxis dataKey="floor" />
      <YAxis />
      <Legend wrapperStyle={{ left: 30 }} />
      <Tooltip cursor={false} contentStyle={{ backgroundColor: "#ffffffcc" }} />
      <Bar name="사용 중" dataKey="used" stackId="a" fill="#05a55a" />
      <Bar name="연체" dataKey="overdue" stackId="a" fill="#f39c13" />
      <Bar name="사용 불가" dataKey="disabled" stackId="a" fill="#f56a54" />
      <Bar name="미사용" dataKey="unused" stackId="a" fill="#bbbbbb" />
    </BarChart>
  );
};

const DataLoadErrorStyles = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FloorStateChart;

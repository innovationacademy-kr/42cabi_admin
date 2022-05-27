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

const FloorStateChart = () => {
  const [floorStateData, setFloorStateData] = useState<FloorStateData[]>([]);
  useEffect(() => {
    const fetchState = async () => {
      // const res = await axios.get(
      //   "http://localhost:8080/api/cabinet/count/floor"
      // );

      // 임시 데이터
      const res = {
        data: [
          {
            floor: "2",
            total: 148,
            used: 73,
            overdue: 36,
            unused: 39,
            disabled: 0,
          },
          {
            floor: "4",
            total: 100,
            used: 50,
            overdue: 21,
            unused: 28,
            disabled: 1,
          },
          {
            floor: "5",
            total: 96,
            used: 40,
            overdue: 22,
            unused: 34,
            disabled: 0,
          },
        ],
      };

      res.data.forEach((element: FloorStateData) => {
        element.floor += "F";
      });
      setFloorStateData(res.data);
    };
    fetchState();
  }, []);

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
      <Legend />
      <Tooltip cursor={false} contentStyle={{ backgroundColor: "#ffffffcc" }} />
      <Bar name="사용 중" dataKey="used" stackId="a" fill="#05a55a" />
      <Bar name="연체" dataKey="overdue" stackId="a" fill="#f39c13" />
      <Bar name="사용 불가" dataKey="disabled" stackId="a" fill="#f56a54" />
      <Bar name="미사용" dataKey="unused" stackId="a" fill="#bbbbbb" />
    </BarChart>
  );
};

export default FloorStateChart;

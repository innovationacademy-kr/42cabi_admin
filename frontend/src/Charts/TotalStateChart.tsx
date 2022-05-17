import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { FloorState } from "../type";

export type PieData = { name: string; value: number };

const TotalStateChart = () => {
  const [totalState, setTotalState] = useState<PieData[]>([]);
  useEffect(() => {
    const fetchState = async () => {
      //   const res = await axios.get(
      //     "http://localhost:8080/api/cabinet/count/floor"
      //   );

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

      let used = 0,
        overdue = 0,
        disabled = 0,
        unused = 0;
      res.data.forEach((element: FloorState) => {
        used += element.used;
        overdue += element.overdue;
        disabled += element.disabled;
        unused += element.unused;
      });
      setTotalState([
        { name: "사용 중", value: used },
        { name: "연체", value: overdue },
        { name: "고장", value: disabled },
        { name: "미사용", value: unused },
      ]);
      // console.log(totalState);
    };
    fetchState();
  }, []);

  const colors = ["#05a55a", "#f39c13", "#f56a54", "#bbbbbb"];

  return (
    <PieChart
      width={500}
      height={300}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Tooltip cursor={false} contentStyle={{ backgroundColor: "#ffffffaa" }} />
      <Legend />
      <Pie
        data={totalState}
        // startAngle={180}
        // endAngle={0}
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

export default TotalStateChart;

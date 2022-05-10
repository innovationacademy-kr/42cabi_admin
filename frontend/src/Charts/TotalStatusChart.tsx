import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["사용 중", "연체", "고장", "사용 가능"],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ["#05a55a", "#f39c13", "#f56a54", "#d2d6de"],
      borderWidth: 0.5,
    },
  ],
};

const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "새롬관",
    },
  },
};

const TotalStatusChart = () => {
  return (
    <Doughnut data={data} options={options} style={{ objectFit: "fill" }} />
  );
};

export default TotalStatusChart;

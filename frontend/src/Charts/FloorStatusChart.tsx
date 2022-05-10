import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

const data = {
  labels: ["2F", "4F", "5F"],
  datasets: [
    {
      label: "대여",
      data: [65, 59, 80],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
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

const FloorStatusChart = () => {
  return <Bar data={data} options={options} style={{ objectFit: "fill" }} />;
};

export default FloorStatusChart;

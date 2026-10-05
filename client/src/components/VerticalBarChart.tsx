import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#FFFFFF",
        font: {
          size: 14,
          family: "Arial",
        },
      },
    },
    title: {
      display: true,
      text: "Victorías de los caracoles durante el día",
      color: "#FFFFFF",
    },
  },
};

const labels = [
  "1° Carrera",
  "2° Carrera",
  "3° Carrera",
  "4° Carrera",
  "5° Carrera",
  "6° Carrera",
];

const generateRandomSeries = () =>
  labels.map(() => Math.floor(Math.random() * 101));
// console.log(generateRandomSeries());

export const data = {
  labels,
  datasets: [
    {
      label: "Caracol 1(Luis)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(49, 201, 80, 0.8)",
    },
    {
      label: "Caracol 2(María)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(251, 44, 54, 0.8)",
    },
    {
      label: "Caracol 3(Pedro)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(255, 105, 42, 0.8)",
    },
    {
      label: "Caracol 4(Ana)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(25, 166, 244, 0.8)",
    },
    {
      label: "Caracol 5(Juan)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(173, 70, 255, 0.8)",
    },
    {
      label: "Caracol 6(Sofía)",
      data: generateRandomSeries(),
      backgroundColor: "rgba(255, 217, 0, 0.8)",
    },
  ],
};

export const VerticalBarChart = () => {
  return (
    <div style={{ width: "60%" }}>
      <h2 style={{ marginTop: "2rem" }}>Carreras hechas durante el día</h2>
      <br />
      <Bar options={options} data={data} />
    </div>
  );
};

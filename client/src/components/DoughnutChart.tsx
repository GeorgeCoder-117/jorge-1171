import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Ganadas', 'Perdidas'],
  datasets: [
    {
      label: 'Porcentaje %',
      data: [56, 44],
      backgroundColor: [
        'rgba(49, 201, 80, 0.8)',
        'rgba(251, 44, 54, 0.8)',
      ],
      borderColor: [
        'rgba(23, 130, 54, 1)',
        'rgba(193, 16, 7, 1)',
      ],
      borderWidth: 4,
    },
  ],
};

const options: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#FFFFFF',
        font: {
          size: 14,
          family: 'Arial',
        },
      },
    },
  },
};

export const DoughnutChart = () => {
    return (
        <div style={{width: '30%'}}>
            <h2>Apuestas</h2>
            <br/>
            <Doughnut data={data} options={options}/>
        </div>
    );
}


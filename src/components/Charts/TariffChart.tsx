import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TariffData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TariffChartProps {
  data: TariffData[];
  height?: number;
  title?: string;
  color?: string;
}

const TariffChart: React.FC<TariffChartProps> = ({ 
  data, 
  height = 300, 
  title = 'Rate (%)',
  color = '#0071ce'
}) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: title,
        data: data.map(d => d.rate),
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: data.map(d => d.event ? '#dc2626' : color),
        pointBorderColor: data.map(d => d.event ? '#dc2626' : color),
        pointRadius: data.map(d => d.event ? 6 : 4),
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const index = context.dataIndex;
            const event = data[index]?.event;
            return event ? `Event: ${event}` : '';
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 11
          }
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: title,
          font: {
            size: 11
          }
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TariffChart;
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EvolutionChartProps {
  data: {
    julio: { [key: string]: number };
    leandro: { [key: string]: number };
  };
}

export const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
  const dates = Array.from(
    new Set([
      ...Object.keys(data.julio),
      ...Object.keys(data.leandro),
    ])
  ).sort();

  const chartData = {
    labels: dates.map(date => 
      format(parseISO(date), 'dd/MM', { locale: ptBR })
    ),
    datasets: [
      {
        label: 'Equipe Julio',
        data: dates.map(date => data.julio[date] || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Equipe Leandro/Adriano',
        data: dates.map(date => data.leandro[date] || 0),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução de Demandas por Dia',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <Line data={chartData} options={options} />
    </div>
  );
};

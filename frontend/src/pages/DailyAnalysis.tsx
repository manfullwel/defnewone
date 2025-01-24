import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { metricsService } from '../services/metricsService';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function DailyAnalysis() {
  const { data: dailyMetrics, isLoading } = useQuery({
    queryKey: ['dailyMetrics'],
    queryFn: metricsService.getDailyMetrics
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!dailyMetrics) {
    return <div>Erro ao carregar métricas diárias</div>;
  }

  // Ordenar as datas
  const dates = Object.keys(dailyMetrics).sort();
  const values = dates.map(date => dailyMetrics[date]);

  // Calcular métricas
  const total = values.reduce((sum, value) => sum + value, 0);
  const average = total / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  // Calcular tendência
  const trend = values[values.length - 1] > values[0] ? 'crescente' : 'decrescente';
  const trendPercentage = ((values[values.length - 1] - values[0]) / values[0] * 100).toFixed(1);

  const chartData = {
    labels: dates.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Demandas por Dia',
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução Diária de Demandas',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => Math.round(value)
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Análise Diária</h1>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Total do Período</h2>
          <p className="text-4xl font-bold text-blue-600">{total}</p>
          <p className="text-sm text-gray-500">demandas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Média Diária</h2>
          <p className="text-4xl font-bold text-green-600">{average.toFixed(1)}</p>
          <p className="text-sm text-gray-500">demandas/dia</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Pico de Demandas</h2>
          <p className="text-4xl font-bold text-purple-600">{max}</p>
          <p className="text-sm text-gray-500">maior volume</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Tendência</h2>
          <p className={`text-4xl font-bold ${trend === 'crescente' ? 'text-green-600' : 'text-red-600'}`}>
            {trendPercentage}%
          </p>
          <p className="text-sm text-gray-500">
            {trend === 'crescente' ? 'de aumento' : 'de redução'}
          </p>
        </div>
      </div>

      {/* Gráfico de Evolução */}
      <div className="bg-white rounded-lg shadow p-6">
        <Line options={chartOptions} data={chartData} />
      </div>

      {/* Tabela de Dados */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demandas
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dates.map((date, index) => {
              const currentValue = dailyMetrics[date];
              const previousValue = index > 0 ? dailyMetrics[dates[index - 1]] : currentValue;
              const variation = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
              
              return (
                <tr key={date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {currentValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${
                      Number(variation) > 0 
                        ? 'text-green-600' 
                        : Number(variation) < 0 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                    }`}>
                      {variation}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

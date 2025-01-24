import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { metricsService, MetricsSummary } from '../services/metricsService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Distribuição de Demandas',
    },
  },
};

export function Dashboard() {
  const { data: metrics, isLoading } = useQuery<MetricsSummary>({
    queryKey: ['metrics'],
    queryFn: metricsService.getMetricsSummary
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!metrics) {
    return <div>Erro ao carregar métricas</div>;
  }

  const chartData = {
    labels: ['Receptivo', 'Ativo'],
    datasets: [
      {
        label: 'Quantidade de Demandas',
        data: [metrics.total_receptivo, metrics.total_ativo],
        backgroundColor: ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Demandas</h1>
      
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Total de Demandas</h2>
          <p className="text-4xl font-bold text-blue-600">{metrics.total_demandas}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Demandas Resolvidas</h2>
          <p className="text-4xl font-bold text-green-600">{metrics.total_resolvidas}</p>
          <p className="text-sm text-gray-500">Taxa de Resolução: {metrics.taxa_resolucao}%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Distribuição</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Receptivo</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.total_receptivo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ativo</p>
              <p className="text-2xl font-bold text-red-600">{metrics.total_ativo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Distribuição */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <Bar options={chartOptions} data={chartData} />
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Insights</h2>
        <div className="space-y-4">
          {metrics.insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                insight.impacto === 'ALTO'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : insight.impacto === 'MEDIO'
                  ? 'bg-yellow-50 border-l-4 border-yellow-500'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{insight.equipe}</h3>
                  <p className="text-gray-600">{insight.insight}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    insight.impacto === 'ALTO'
                      ? 'bg-red-100 text-red-800'
                      : insight.impacto === 'MEDIO'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {insight.impacto}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

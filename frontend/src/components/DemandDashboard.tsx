import React, { useEffect, useState } from 'react';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DemandMetrics {
  total_demandas: number;
  total_resolvidas: number;
  taxa_resolucao: number;
  total_receptivo: number;
  total_ativo: number;
  insights: Array<{
    equipe: string;
    total: number;
    resolvidas: number;
    percentual_receptivo: number;
  }>;
}

export default function DemandDashboard() {
  const [metrics, setMetrics] = useState<DemandMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/metrics/summary');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Received data:', data); // Debug log
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching data:', err); // Debug log
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg text-gray-600">Carregando dados...</div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <div className="text-red-700">Erro ao carregar dados: {error}</div>
      <div className="text-sm text-red-500 mt-2">Por favor, verifique se o servidor está rodando em http://localhost:5000</div>
    </div>
  );

  if (!metrics) return null;

  const chartData = {
    labels: metrics.insights.map(insight => insight.equipe),
    datasets: [
      {
        label: 'Total de Demandas',
        data: metrics.insights.map(insight => insight.total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Demandas Resolvidas',
        data: metrics.insights.map(insight => insight.resolvidas),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Demandas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Taxa de Resolução</h3>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.taxa_resolucao.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total de Demandas</h3>
          <p className="text-3xl font-bold text-green-600">
            {metrics.total_demandas}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Demandas Resolvidas</h3>
          <p className="text-3xl font-bold text-purple-600">
            {metrics.total_resolvidas}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Demandas por Equipe</h2>
        <div className="h-64">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Detalhes por Equipe</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Equipe</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-right">Resolvidas</th>
                <th className="px-4 py-2 text-right">% Receptivo</th>
              </tr>
            </thead>
            <tbody>
              {metrics.insights.map((insight, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{insight.equipe}</td>
                  <td className="px-4 py-2 text-right">{insight.total}</td>
                  <td className="px-4 py-2 text-right">{insight.resolvidas}</td>
                  <td className="px-4 py-2 text-right">
                    {insight.percentual_receptivo.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { metricsService, TeamMetrics } from '../services/metricsService';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

export function TeamAnalysis() {
  const { data: teamMetrics, isLoading } = useQuery<TeamMetrics>({
    queryKey: ['teamMetrics'],
    queryFn: metricsService.getTeamMetrics
  });

  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!teamMetrics) {
    return <div>Erro ao carregar métricas das equipes</div>;
  }

  const teams = Object.keys(teamMetrics);
  const members = selectedTeam ? Object.keys(teamMetrics[selectedTeam]) : [];
  const memberData = selectedTeam && selectedMember ? teamMetrics[selectedTeam][selectedMember] : null;

  const chartData = memberData ? {
    labels: Object.keys(memberData.demandas_por_dia),
    datasets: [
      {
        label: 'Demandas por Dia',
        data: Object.values(memberData.demandas_por_dia),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução de Demandas',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Análise por Equipe</h1>

      {/* Seletores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione a Equipe
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setSelectedMember('');
            }}
          >
            <option value="">Selecione...</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {selectedTeam && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o Membro
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Selecione...</option>
              {members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Métricas do Membro */}
      {memberData && (
        <div className="space-y-8">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Demandas</h2>
              <div className="space-y-2">
                <p>Total: <span className="font-bold text-blue-600">{memberData.total_demandas}</span></p>
                <p>Resolvidas: <span className="font-bold text-green-600">{memberData.resolvidas}</span></p>
                <p>Taxa: <span className="font-bold text-purple-600">{memberData.taxa_resolucao}%</span></p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Atividade</h2>
              <div className="space-y-2">
                <p>Média Diária: <span className="font-bold text-blue-600">{memberData.media_diaria}</span></p>
                <p>Dias Ativos: <span className="font-bold text-green-600">{memberData.dias_ativos}</span></p>
                <p>Pico: <span className="font-bold text-purple-600">{memberData.pico_quantidade}</span> em {new Date(memberData.pico_data).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Distribuição</h2>
              <div className="space-y-2">
                <p>Receptivo: <span className="font-bold text-blue-600">{memberData.receptivo}</span></p>
                <p>Ativo: <span className="font-bold text-green-600">{memberData.ativo}</span></p>
                <p>Proporção: <span className="font-bold text-purple-600">
                  {((memberData.receptivo / (memberData.receptivo + memberData.ativo)) * 100).toFixed(1)}% Receptivo
                </span></p>
              </div>
            </div>
          </div>

          {/* Gráfico de Evolução */}
          {chartData && (
            <div className="bg-white rounded-lg shadow p-6">
              <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { ResponsavelMetrics } from '../types/metrics';

interface TopPerformersProps {
  responsaveis: {
    [key: string]: ResponsavelMetrics;
  };
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ responsaveis }) => {
  const sortedResponsaveis = Object.entries(responsaveis)
    .sort(([, a], [, b]) => b.resolvidas - a.resolvidas)
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Top Performers
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Responsável
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Resolvidas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Taxa
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Média Diária
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResponsaveis.map(([nome, metricas]) => (
              <tr key={nome}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metricas.resolvidas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metricas.taxa_resolucao}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metricas.media_diaria}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from 'react';
import { Insight } from '../types/metrics';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface InsightsListProps {
  insights: Insight[];
}

export const InsightsList: React.FC<InsightsListProps> = ({ insights }) => {
  const getInsightColor = (impacto: string) => {
    switch (impacto) {
      case 'ALTO':
        return 'bg-red-50';
      case 'MEDIO':
        return 'bg-yellow-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getInsightIcon = (impacto: string) => {
    switch (impacto) {
      case 'ALTO':
        return (
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        );
      case 'MEDIO':
        return (
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        );
      default:
        return (
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        );
    }
  };

  const getInsightBadgeColor = (impacto: string) => {
    switch (impacto) {
      case 'ALTO':
        return 'bg-red-100 text-red-800';
      case 'MEDIO':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`flex items-start p-4 rounded-lg ${getInsightColor(
            insight.impacto
          )}`}
        >
          <div className="flex-shrink-0">
            {getInsightIcon(insight.impacto)}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              {insight.equipe}
              {insight.responsavel && ` - ${insight.responsavel}`}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{insight.insight}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              Ação: {insight.acao}
            </p>
          </div>
          <div className="ml-3 flex-shrink-0">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInsightBadgeColor(
                insight.impacto
              )}`}
            >
              {insight.impacto}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  description,
}) => {
  return (
    <div className="metric-card">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="metric-value">{value}</p>
        {trend && (
          <span
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              trend.isPositive ? 'trend-up' : 'trend-down'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
            )}
            <span className="ml-1">{trend.value}%</span>
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

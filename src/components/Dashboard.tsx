import React, { useState, useCallback, useMemo } from 'react';
import { DashboardFilters } from './DashboardFilters';
import { DailyChart } from './DailyChart';
import { DataTable } from './DataTable';
import { SummaryCards } from './SummaryCards';
import { ReportFilters, INITIAL_FILTERS } from '@/types/report';
import { ErrorBoundary } from './ErrorBoundary';
import { errorHandler } from '@/utils/errorHandler';
import { Contract, Employee } from '@/types/spreadsheet';

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(INITIAL_FILTERS);

  // Mock data for initial render
  const mockChartData = [
    { name: 'Segunda', resolved: 10, pending: 5 },
    { name: 'Terça', resolved: 15, pending: 8 },
    { name: 'Quarta', resolved: 12, pending: 6 },
    { name: 'Quinta', resolved: 18, pending: 4 },
    { name: 'Sexta', resolved: 14, pending: 7 },
  ];

  const mockContracts: Contract[] = [
    {
      id: '1',
      contractNumber: 'CONT-001',
      clientName: 'Cliente A',
      receivingBank: 'Banco X',
      responsibleEmployee: 'João',
      status: 'Pendente',
      lastUpdate: new Date().toISOString(),
    },
  ];

  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'João Silva',
      group: 'JULIO',
      approved: true,
      pendingTasks: 5,
    },
    {
      id: '2',
      name: 'Maria Santos',
      group: 'ADRIANO/LEANDRO',
      approved: false,
      pendingTasks: 3,
    },
  ];

  const handleFilterChange = useCallback((newFilters: ReportFilters) => {
    try {
      setFilters(newFilters);
    } catch (error) {
      errorHandler.logError(error as Error, {
        component: 'Dashboard',
        action: 'handleFilterChange',
      });
    }
  }, []);

  // Memoize components to prevent unnecessary re-renders
  const memoizedFilters = useMemo(
    () => <DashboardFilters filters={filters} onFilterChange={handleFilterChange} />,
    [filters, handleFilterChange]
  );

  const memoizedChart = useMemo(
    () => <DailyChart data={mockChartData} />,
    [mockChartData]
  );

  const memoizedTable = useMemo(
    () => <DataTable data={mockContracts} type="contracts" />,
    [mockContracts]
  );

  const memoizedSummary = useMemo(
    () => <SummaryCards contracts={mockContracts} employees={mockEmployees} />,
    [mockContracts, mockEmployees]
  );

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard de Demandas</h1>
          {memoizedFilters}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {memoizedSummary}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Análise Diária</h2>
          {memoizedChart}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Contratos</h2>
          {memoizedTable}
        </div>
      </div>
    </ErrorBoundary>
  );
};

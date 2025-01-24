export interface DailyReport {
  date: Date;
  totalDemands: number;
  completedDemands: number;
  pendingDemands: number;
  inProgressDemands: number;
  cancelledDemands: number;
  averageResolutionTime: number;
  Contratos_Resolvidos: number;
  Pendentes_Receptivo: number;
  Pendentes_Ativo: number;
  Quitados: number;
  Aprovados: number;
  Nome_Funcionario: string;
  Data_Relatorio: Date;
}

export interface DemandSummary {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  cancelled: number;
  averageResolutionTime: number;
}

export interface Demand {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  assignedTo?: string;
  category?: string;
  tags?: string[];
}

export interface ReportFilters {
  date: Date | null;
  status: 'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export const INITIAL_FILTERS: ReportFilters = {
  date: null,
  status: 'all',
};

export type DemandStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type DemandPriority = 'low' | 'medium' | 'high';

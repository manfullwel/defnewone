import { StatCard } from './StatCard';

interface EmployeeStatsProps {
  name: string;
  stats: {
    resolved: number;
    pendingReceptive: number;
    pendingActive: number;
    priorities: number;
    dailyAnalysis: number;
    totalAnalysis: number;
    settled: number;
    approved: number;
    receptive: number;
  };
}

export const EmployeeStats = ({ name, stats }: EmployeeStatsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">{name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Resolvidos" value={stats.resolved} />
        <StatCard title="Pendentes Receptivo" value={stats.pendingReceptive} />
        <StatCard title="Pendentes Ativo" value={stats.pendingActive} />
        <StatCard title="Prioridades" value={stats.priorities} />
        <StatCard title="Análises do Dia" value={stats.dailyAnalysis} />
        <StatCard title="Total das Análises" value={stats.totalAnalysis} />
        <StatCard title="Quitados" value={stats.settled} />
        <StatCard title="Aprovados" value={stats.approved} />
        <StatCard title="Receptivo" value={stats.receptive} />
      </div>
    </div>
  );
};

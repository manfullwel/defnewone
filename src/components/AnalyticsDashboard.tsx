import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyReport } from '@/types/report';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowDown, ArrowUp, Users, FileCheck2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RouteContext {
  data: DailyReport[];
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  trend?: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, trend, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend !== undefined && (
        <div
          className={`flex items-center text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {trend >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          <span>{Math.abs(trend)}% em relação à média</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export const AnalyticsDashboard = () => {
  const { data } = useOutletContext<RouteContext>();

  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        totalResolvidos: 0,
        mediaDiaria: 0,
        pendentesReceptivo: 0,
        pendentesAtivo: 0,
        totalQuitados: 0,
        totalAprovados: 0,
        trendContratos: 0,
      };
    }

    const totalContratos = data.reduce((sum, item) => sum + item.Contratos_Resolvidos, 0);
    const mediaContratos = totalContratos / data.length;
    const ultimosDados = data[data.length - 1];
    const trendContratos =
      ((ultimosDados.Contratos_Resolvidos - mediaContratos) / mediaContratos) * 100;

    return {
      totalResolvidos: totalContratos,
      mediaDiaria: Math.round(mediaContratos),
      pendentesReceptivo: data.reduce((sum, item) => sum + item.Pendentes_Receptivo, 0),
      pendentesAtivo: data.reduce((sum, item) => sum + item.Pendentes_Ativo, 0),
      totalQuitados: data.reduce((sum, item) => sum + item.Quitados, 0),
      totalAprovados: data.reduce((sum, item) => sum + item.Aprovados, 0),
      trendContratos: Math.round(trendContratos),
    };
  }, [data]);

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        name: item.Nome_Funcionario,
        resolvidos: item.Contratos_Resolvidos,
        pendentes: item.Pendentes_Receptivo + item.Pendentes_Ativo,
        quitados: item.Quitados,
        aprovados: item.Aprovados,
      })),
    [data]
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Contratos Resolvidos"
          value={stats.totalResolvidos}
          description={`Média diária: ${stats.mediaDiaria}`}
          trend={stats.trendContratos}
          icon={<FileCheck2 className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pendentes Receptivo"
          value={stats.pendentesReceptivo}
          description="Total de contratos aguardando"
          icon={<AlertCircle className="h-4 w-4 text-yellow-500" />}
        />
        <StatCard
          title="Pendentes Ativo"
          value={stats.pendentesAtivo}
          description="Contratos em processamento"
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Contratos Aprovados"
          value={stats.totalAprovados}
          description={`${stats.totalQuitados} quitados`}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Funcionário</CardTitle>
          <CardDescription>
            Visualização comparativa dos indicadores por funcionário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="resolvidos" name="Resolvidos" fill="#22c55e" />
                <Bar dataKey="pendentes" name="Pendentes" fill="#eab308" />
                <Bar dataKey="quitados" name="Quitados" fill="#3b82f6" />
                <Bar dataKey="aprovados" name="Aprovados" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

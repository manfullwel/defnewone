import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { DailyReport as DailyReportType, Demand } from '@/types/report';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Download } from 'lucide-react';
import { DemandasTable } from './DemandasTable';

interface RouteContext {
  data: DailyReportType[];
  demandas: Demand[];
  fileName?: string;
}

interface FuncionarioStats {
  Resolvidos: number;
  Pendentes_Receptivo: number;
  Pendentes_Ativo: number;
  Prioridades: number;
  Analises_do_Dia: number;
  Total_das_Analises: number;
  Quitados: number;
  Aprovados: number;
  Receptivo: number;
}

export const DailyReport = () => {
  const { data, demandas, fileName } = useOutletContext<RouteContext>();
  const currentDate = new Date();

  // Agrupar dados por funcionário
  const statsData = useMemo(() => {
    const funcionarios = new Set(data.map((d) => d.Nome_Funcionario));
    const stats: Record<string, FuncionarioStats> = {};

    funcionarios.forEach((func) => {
      const funcionarioDemandas = demandas.filter((d) => d.Grupo === func);
      const reportData = data.find((d) => d.Nome_Funcionario === func);

      if (reportData) {
        stats[func] = {
          Resolvidos: reportData.Contratos_Resolvidos,
          Pendentes_Receptivo: reportData.Pendentes_Receptivo,
          Pendentes_Ativo: reportData.Pendentes_Ativo,
          Prioridades: funcionarioDemandas.filter((d) => d.Prioridade === 'Sim').length,
          Analises_do_Dia: funcionarioDemandas.reduce((sum, d) => sum + d.Analises_do_Dia, 0),
          Total_das_Analises: funcionarioDemandas.length,
          Quitados: reportData.Quitados,
          Aprovados: reportData.Aprovados,
          Receptivo: funcionarioDemandas.filter((d) => d.Receptivo).length,
        };
      }
    });

    return stats;
  }, [data, demandas]);

  // Dados para o gráfico
  const chartData = useMemo(() => {
    return Object.entries(statsData).map(([name, stats]) => ({
      name,
      Pendentes: stats.Pendentes_Ativo + stats.Pendentes_Receptivo,
      Resolvidos: stats.Resolvidos,
    }));
  }, [statsData]);

  // Função para exportar funcionários
  const exportFuncionarios = () => {
    // Implementar exportação
  };

  // Função para exportar contratos
  const exportContratos = () => {
    // Implementar exportação
  };

  const renderFuncionarioStats = (nome: string, stats: FuncionarioStats) => (
    <div key={nome} className="space-y-4">
      <h3 className="text-xl font-bold">{nome}</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Resolvidos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Resolvidos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Pendentes Receptivo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Pendentes_Receptivo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Pendentes Ativo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Pendentes_Ativo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Prioridades</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Prioridades}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Análises do Dia</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Analises_do_Dia}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Total das Análises</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Total_das_Analises}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Quitados</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Quitados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Aprovados</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Aprovados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Receptivo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.Receptivo}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Relatório Geral de Demandas ({format(currentDate, 'dd/MM/yyyy')})
          </h2>
          {fileName && <p className="text-muted-foreground">Arquivo: {fileName}</p>}
        </div>
        <Button onClick={exportFuncionarios}>
          <Download className="mr-2 h-4 w-4" />
          Baixar Projeto
        </Button>
      </div>

      {/* Visão Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: '#0f172a',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                />
                <YAxis />
                <Tooltip
                  labelStyle={{
                    color: '#0f172a',
                    fontWeight: 'bold',
                  }}
                />
                <Bar dataKey="Pendentes" fill="#fbbf24" />
                <Bar dataKey="Resolvidos" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas por Funcionário */}
      {Object.entries(statsData).map(([nome, stats]) => renderFuncionarioStats(nome, stats))}

      {/* Planilha de Demandas */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Planilha de Demandas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={exportFuncionarios} variant="outline" className="w-full">
            Exportar Funcionários (Excel)
          </Button>
          <Button onClick={exportContratos} variant="outline" className="w-full">
            Exportar Contratos (Excel)
          </Button>
        </div>
        <DemandasTable demandas={demandas} />
      </div>
    </div>
  );
};

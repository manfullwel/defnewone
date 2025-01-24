import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface DemandaStats {
  resolvidos: number;
  pendenteReceptivo: number;
  pendenteAtivo: number;
  prioridades: number;
  analisesDia: number;
  totalAnalises: number;
  quitados: number;
  aprovados: number;
  receptivo: number;
}

export const RelatorioDiario: React.FC = () => {
  // Dados de exemplo - em produção, viriam de uma API
  const stats: DemandaStats = {
    resolvidos: 140,
    pendenteReceptivo: 102,
    pendenteAtivo: 701,
    prioridades: 3,
    analisesDia: 3,
    totalAnalises: 49,
    quitados: 9,
    aprovados: 2,
    receptivo: 0,
  };

  const hoje = new Date();

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Relatório Geral de Demandas ({format(hoje, 'dd/MM/yyyy')})
          </h1>
          <Button variant="default">
            <Download className="mr-2 h-4 w-4" />
            Baixar Projeto
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">JULIO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primeira Linha */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Resolvidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.resolvidos}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendenteReceptivo}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendenteAtivo}</div>
              </CardContent>
            </Card>

            {/* Segunda Linha */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Prioridades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.prioridades}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Análises do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.analisesDia}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total das Análises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalAnalises}</div>
              </CardContent>
            </Card>

            {/* Terceira Linha */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.quitados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Aprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.aprovados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.receptivo}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gráfico de Visão Geral */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-end justify-around gap-16 p-4">
              {/* Julio */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 h-[300px]">
                  <div className="w-16 bg-primary h-[150px]"></div>
                  <div className="w-16 bg-blue-400 h-[250px]"></div>
                </div>
                <span className="font-medium">Julio</span>
              </div>

              {/* Adriano/Leandro */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 h-[300px]">
                  <div className="w-16 bg-primary h-[150px]"></div>
                  <div className="w-16 bg-blue-400 h-[200px]"></div>
                </div>
                <span className="font-medium">Adriano/Leandro</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

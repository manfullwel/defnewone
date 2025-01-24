import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BarChart2, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const MobileDemo: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const mockData = {
    urgentDemands: 3,
    totalDemands: 843,
    resolvedToday: 15,
    pendingAnalysis: 28,
  };

  const currentTime = format(new Date(), 'HH:mm', { locale: ptBR });
  const currentDate = format(new Date(), 'dd/MM/yyyy', { locale: ptBR });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        {/* Header com Notificações */}
        <header className="bg-primary text-white p-4 sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold">Demand Report</h1>
              <p className="text-sm opacity-90">{currentDate}</p>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotification(!showNotification)}>
                <Bell className="h-6 w-6" />
                {mockData.urgentDemands > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {mockData.urgentDemands}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Notificações Popup */}
        {showNotification && (
          <div className="fixed top-16 right-2 bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm z-50">
            <h3 className="font-bold mb-2">Notificações Urgentes</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <AlertTriangle className="text-red-500 h-4 w-4" />
                <p className="text-sm">Nova demanda prioritária: #12345</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                <Clock className="text-yellow-500 h-4 w-4" />
                <p className="text-sm">Prazo próximo: Análise #98765</p>
              </div>
            </div>
          </div>
        )}

        {/* Cards de Métricas */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-500 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Demandas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.totalDemands}</div>
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Resolvidos Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.resolvedToday}</div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico Simplificado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Análises do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-end justify-around gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 bg-primary h-24"></div>
                  <span className="text-xs">Julio</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 bg-primary h-32"></div>
                  <span className="text-xs">Adriano</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 bg-primary h-16"></div>
                  <span className="text-xs">Leandro</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Pendências */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                Pendentes de Análise
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  {mockData.pendingAnalysis}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="text-sm font-medium">Demanda #{item}234</p>
                      <p className="text-xs text-gray-500">Vence em 2 dias</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barra de Navegação Inferior */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-2">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex flex-col items-center">
              <BarChart2 className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Clock className="h-5 w-5" />
              <span className="text-xs">Diário</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs">Urgentes</span>
            </Button>
          </div>
        </nav>

        {/* Indicador de Atualização */}
        <div className="fixed bottom-16 left-0 right-0 flex justify-center">
          <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
            Última atualização: {currentTime}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

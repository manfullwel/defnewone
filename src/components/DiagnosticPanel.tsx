import React, { useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { errorHandler } from '@/utils/errorHandler';
import { format } from 'date-fns';

interface PerformanceReport {
  averageRenderTime: number;
  errorRate: number;
  slowestOperations: Array<{
    name: string;
    duration: number;
    timestamp: number;
    type: string;
  }>;
  recommendations: string[];
}

export function DiagnosticPanel() {
  const { getPerformanceReport } = usePerformance('DiagnosticPanel');
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [errorLogs, setErrorLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateDiagnostics = async () => {
      try {
        const perfReport = await getPerformanceReport();
        setReport(perfReport);
        setErrorLogs(errorHandler.getErrorLogs());
      } catch (error) {
        console.error('Erro ao atualizar diagnósticos:', error);
      } finally {
        setLoading(false);
      }
    };

    updateDiagnostics();
    const interval = setInterval(updateDiagnostics, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando Diagnósticos...</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={33} />
        </CardContent>
      </Card>
    );
  }

  const getHealthStatus = () => {
    if (!report) return 'unknown';
    if (report.errorRate > 0.1) return 'critical';
    if (report.errorRate > 0.05) return 'warning';
    if (report.averageRenderTime > 500) return 'warning';
    return 'healthy';
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Diagnóstico do Sistema</CardTitle>
          <CardDescription>
            Monitoramento em tempo real da saúde e performance da aplicação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Status Geral */}
            <Alert
              variant={
                healthStatus === 'healthy'
                  ? 'default'
                  : healthStatus === 'warning'
                  ? 'warning'
                  : 'destructive'
              }
            >
              <AlertTitle>Status do Sistema: {healthStatus.toUpperCase()}</AlertTitle>
              <AlertDescription>
                Última atualização: {format(new Date(), 'dd/MM/yyyy HH:mm:ss')}
              </AlertDescription>
            </Alert>

            {/* Métricas de Performance */}
            {report && (
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Tempo Médio de Renderização:</span>
                        <span className="ml-2">{report.averageRenderTime.toFixed(2)}ms</span>
                      </div>
                      <div>
                        <span className="font-medium">Taxa de Erros:</span>
                        <span className="ml-2">{(report.errorRate * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Operações Mais Lentas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.slowestOperations.map((op, index) => (
                        <li key={index} className="text-sm">
                          {op.name} - {op.duration.toFixed(2)}ms
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recomendações */}
            {report?.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recomendações de Otimização</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Logs de Erro Recentes */}
            {errorLogs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Logs de Erro Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {errorLogs.slice(0, 5).map((log, index) => (
                      <Alert key={index} variant="destructive">
                        <AlertTitle>{log.type}</AlertTitle>
                        <AlertDescription>
                          <div className="space-y-1">
                            <p>{log.message}</p>
                            <p className="text-xs">{log.timestamp}</p>
                            {log.autoCorrection && (
                              <p className="text-sm text-green-600">
                                Correção Automática: {log.autoCorrection}
                              </p>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

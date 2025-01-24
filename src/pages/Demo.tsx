import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const Demo: React.FC = () => {
  const dataJulio = {
    resolvidos: 140,
    pendentes: {
      receptivo: 102,
      ativo: 701
    },
    prioridades: 3,
    analises: {
      dia: 3,
      total: 49
    },
    status: {
      quitados: 9,
      aprovados: 2,
      receptivo: 0
    }
  };

  const dataLeandro = {
    resolvidos: 130,
    pendentes: {
      receptivo: 161,
      ativo: 482
    },
    prioridades: 1,
    analises: {
      dia: 20,
      total: 32
    },
    status: {
      quitados: 16,
      aprovados: 5,
      receptivo: 1
    }
  };

  const totais = {
    quitados: 26,
    quitadosCliente: 1,
    quitadoAprovado: 0,
    aprovados: 91,
    aprovadosDuplicados: 6
  };

  const julioChartData = [
    { name: 'Resolvidos', value: dataJulio.resolvidos },
    { name: 'Receptivo', value: dataJulio.pendentes.receptivo },
    { name: 'Ativo', value: dataJulio.pendentes.ativo }
  ];

  const leandroChartData = [
    { name: 'Resolvidos', value: dataLeandro.resolvidos },
    { name: 'Receptivo', value: dataLeandro.pendentes.receptivo },
    { name: 'Ativo', value: dataLeandro.pendentes.ativo }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Relatório Diário de Demandas</h1>
        <p className="text-xl text-muted-foreground">Acompanhamento em Tempo Real - 10/01/2025</p>
      </header>

      {/* Métricas do Grupo Julio */}
      <Card>
        <CardHeader>
          <CardTitle>Grupo Julio</CardTitle>
          <CardDescription>Métricas de desempenho atualizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-600">Resolvidos</p>
                        <h3 className="text-2xl font-bold text-green-700">{dataJulio.resolvidos}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Prioridades</p>
                        <h3 className="text-2xl font-bold text-yellow-700">{dataJulio.prioridades}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-blue-600" />
                      <p className="text-lg font-medium text-blue-700">Pendentes</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Receptivo</p>
                        <p className="text-2xl font-bold text-blue-700">{dataJulio.pendentes.receptivo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Ativo</p>
                        <p className="text-2xl font-bold text-blue-700">{dataJulio.pendentes.ativo}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={julioChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas do Grupo Leandro */}
      <Card>
        <CardHeader>
          <CardTitle>Grupo Leandro</CardTitle>
          <CardDescription>Métricas de desempenho atualizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-600">Resolvidos</p>
                        <h3 className="text-2xl font-bold text-green-700">{dataLeandro.resolvidos}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Prioridades</p>
                        <h3 className="text-2xl font-bold text-yellow-700">{dataLeandro.prioridades}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-blue-600" />
                      <p className="text-lg font-medium text-blue-700">Pendentes</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Receptivo</p>
                        <p className="text-2xl font-bold text-blue-700">{dataLeandro.pendentes.receptivo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Ativo</p>
                        <p className="text-2xl font-bold text-blue-700">{dataLeandro.pendentes.ativo}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leandroChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link to="/dashboard">
          <Button size="lg" className="px-8">
            <Users className="mr-2 h-5 w-5" />
            Acessar o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Demo;

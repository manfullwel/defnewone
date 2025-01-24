import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { cn } from '@/lib/utils';

interface AnaliseData {
  julio: {
    resolvidos: number;
    pendenteReceptivo: number;
    pendenteAtivo: number;
    prioridades: number;
    analisesDia: number;
    totalAnalises: number;
    quitados: number;
    aprovados: number;
    receptivo: number;
  };
  adrianoLeandro: {
    resolvidos: number;
    pendenteReceptivo: number;
    pendenteAtivo: number;
    prioridades: number;
    analisesDia: number;
    totalAnalises: number;
    quitados: number;
    aprovados: number;
    receptivo: number;
    totalQuitados: number;
    totalQuitadosCliente: number;
    totalQuitadoAprovado: number;
    totalAprovados: number;
    aprovadosDuplicados: number;
  };
}

export const RelatorioGeral: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Dados atualizados conforme as imagens
  const dadosAnalise: AnaliseData = {
    julio: {
      resolvidos: 140,
      pendenteReceptivo: 102,
      pendenteAtivo: 701,
      prioridades: 3,
      analisesDia: 3,
      totalAnalises: 49,
      quitados: 9,
      aprovados: 2,
      receptivo: 0,
    },
    adrianoLeandro: {
      resolvidos: 130,
      pendenteReceptivo: 161,
      pendenteAtivo: 482,
      prioridades: 1,
      analisesDia: 20,
      totalAnalises: 32,
      quitados: 16,
      aprovados: 5,
      receptivo: 1,
      totalQuitados: 25,
      totalQuitadosCliente: 1,
      totalQuitadoAprovado: 0,
      totalAprovados: 91,
      aprovadosDuplicados: 6,
    },
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Relatório Geral de Demandas ({format(date, 'dd/MM/yyyy')})
          </h1>
          <div className="flex gap-4">
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate || new Date());
                    setDatePickerOpen(false);
                  }}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Baixar Projeto
            </Button>
          </div>
        </div>

        {/* JULIO */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">JULIO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Resolvidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.resolvidos}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.pendenteReceptivo}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.pendenteAtivo}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Prioridades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.prioridades}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Análises do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.analisesDia}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total das Análises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.totalAnalises}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.quitados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Aprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.aprovados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.julio.receptivo}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ADRIANO/LEANDRO */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">ADRIANO/LEANDRO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Resolvidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.resolvidos}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.pendenteReceptivo}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pendentes Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.pendenteAtivo}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Prioridades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.prioridades}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Análises do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.analisesDia}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total das Análises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.totalAnalises}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.quitados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Aprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.aprovados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Receptivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.receptivo}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Informações Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total de Quitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.totalQuitados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total de Quitados Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.totalQuitadosCliente}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Quitado Aprovado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.totalQuitadoAprovado}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total de Aprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.totalAprovados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Aprovados Duplicados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dadosAnalise.adrianoLeandro.aprovadosDuplicados}</div>
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
                  <div className="w-16 bg-primary h-[150px]" title="Análises">
                    <div className="text-center text-white mt-2">{dadosAnalise.julio.totalAnalises}</div>
                  </div>
                  <div className="w-16 bg-blue-400 h-[250px]" title="Pendentes">
                    <div className="text-center text-white mt-2">
                      {dadosAnalise.julio.pendenteAtivo + dadosAnalise.julio.pendenteReceptivo}
                    </div>
                  </div>
                </div>
                <span className="font-medium">Julio</span>
              </div>

              {/* Adriano/Leandro */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 h-[300px]">
                  <div className="w-16 bg-primary h-[150px]" title="Análises">
                    <div className="text-center text-white mt-2">{dadosAnalise.adrianoLeandro.totalAnalises}</div>
                  </div>
                  <div className="w-16 bg-blue-400 h-[200px]" title="Pendentes">
                    <div className="text-center text-white mt-2">
                      {dadosAnalise.adrianoLeandro.pendenteAtivo + dadosAnalise.adrianoLeandro.pendenteReceptivo}
                    </div>
                  </div>
                </div>
                <span className="font-medium">Adriano/Leandro</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link para Planilha */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Planilha de Demandas</h2>
          <Card>
            <CardContent className="p-4">
              <Button variant="outline" className="w-full">
                Acessar Planilha de Demandas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

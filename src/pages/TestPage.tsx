import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Plus, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { cn } from '@/lib/utils';

interface Demand {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  assignedTo: string;
}

export const TestPage: React.FC = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [newDemand, setNewDemand] = useState<Partial<Demand>>({
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(),
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleAddDemand = () => {
    if (newDemand.title && newDemand.description) {
      const demand: Demand = {
        id: Math.random().toString(36).substr(2, 9),
        title: newDemand.title,
        description: newDemand.description,
        status: newDemand.status || 'pending',
        priority: newDemand.priority || 'medium',
        dueDate: newDemand.dueDate || new Date(),
        assignedTo: newDemand.assignedTo || 'Não atribuído',
      };

      setDemands([...demands, demand]);
      setNewDemand({
        status: 'pending',
        priority: 'medium',
        dueDate: new Date(),
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Página de Teste - Sistema de Demandas</h1>
          <Button onClick={() => setNewDemand({ ...newDemand })}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Demanda
          </Button>
        </div>

        {/* Formulário de Nova Demanda */}
        <Card>
          <CardHeader>
            <CardTitle>Nova Demanda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newDemand.title || ''}
                    onChange={(e) => setNewDemand({ ...newDemand, title: e.target.value })}
                    placeholder="Digite o título da demanda"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Atribuído para</Label>
                  <Input
                    id="assignedTo"
                    value={newDemand.assignedTo || ''}
                    onChange={(e) => setNewDemand({ ...newDemand, assignedTo: e.target.value })}
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newDemand.description || ''}
                  onChange={(e) => setNewDemand({ ...newDemand, description: e.target.value })}
                  placeholder="Descreva a demanda"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newDemand.status}
                    onValueChange={(value) => setNewDemand({ ...newDemand, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in-progress">Em Andamento</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={newDemand.priority}
                    onValueChange={(value) => setNewDemand({ ...newDemand, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data de Vencimento</Label>
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !newDemand.dueDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newDemand.dueDate ? (
                          format(newDemand.dueDate, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newDemand.dueDate}
                        onSelect={(date) => {
                          setNewDemand({ ...newDemand, dueDate: date || new Date() });
                          setDatePickerOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button onClick={handleAddDemand} className="w-full">
                Adicionar Demanda
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Demandas */}
        <Card>
          <CardHeader>
            <CardTitle>Demandas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar demandas..."
                      className="pl-8"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* Tabela */}
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left">Título</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Prioridade</th>
                      <th className="p-2 text-left">Vencimento</th>
                      <th className="p-2 text-left">Responsável</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demands.map((demand) => (
                      <tr key={demand.id} className="border-b">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{demand.title}</div>
                            <div className="text-sm text-muted-foreground">{demand.description}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(demand.status)}`}>
                            {demand.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(demand.priority)}`}>
                            {demand.priority}
                          </span>
                        </td>
                        <td className="p-2">
                          {format(demand.dueDate, 'dd/MM/yyyy')}
                        </td>
                        <td className="p-2">{demand.assignedTo}</td>
                      </tr>
                    ))}
                    {demands.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                          Nenhuma demanda encontrada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Demandas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{demands.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {demands.filter((d) => d.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {demands.filter((d) => d.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {demands.filter((d) => d.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

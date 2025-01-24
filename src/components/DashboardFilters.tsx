import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Filter, X } from 'lucide-react';
import { ReportFilters, INITIAL_FILTERS } from '@/types/report';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from './ErrorBoundary';
import { errorHandler } from '@/utils/errorHandler';

interface DashboardFiltersProps {
  filters: ReportFilters;
  onFilterChange: (filters: ReportFilters) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    try {
      if (date) {
        onFilterChange({ ...filters, date });
      }
    } catch (error) {
      errorHandler.logError(error as Error, {
        component: 'DashboardFilters',
        action: 'handleDateSelect',
      });
    }
  };

  const handleStatusSelect = (status: string) => {
    try {
      onFilterChange({ ...filters, status });
    } catch (error) {
      errorHandler.logError(error as Error, {
        component: 'DashboardFilters',
        action: 'handleStatusSelect',
      });
    }
  };

  const handleClearFilters = () => {
    try {
      onFilterChange(INITIAL_FILTERS);
      setIsOpen(false);
    } catch (error) {
      errorHandler.logError(error as Error, {
        component: 'DashboardFilters',
        action: 'handleClearFilters',
      });
    }
  };

  const formatDate = (date: Date) => {
    try {
      return format(date, 'PPP', { locale: ptBR });
    } catch (error) {
      errorHandler.logError(error as Error, {
        component: 'DashboardFilters',
        action: 'formatDate',
      });
      return 'Data inválida';
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal sm:w-[240px]',
                  !filters.date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? formatDate(filters.date) : 'Selecione uma data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={handleDateSelect}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="status" className="sr-only">
            Status
          </Label>
          <Select value={filters.status || "all"} onValueChange={handleStatusSelect}>
            <SelectTrigger
              id="status"
              className={cn('w-full sm:w-[180px]', !filters.status && 'text-muted-foreground')}
            >
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="in_progress">Em Andamento</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(filters.date || filters.status) && (
          <Button
            variant="ghost"
            className="px-2 sm:px-4"
            onClick={handleClearFilters}
            title="Limpar filtros"
          >
            <X className="h-4 w-4" />
            <span className="ml-2 sm:inline">Limpar</span>
          </Button>
        )}
      </div>
    </ErrorBoundary>
  );
};

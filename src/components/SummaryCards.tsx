import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Contract, Employee } from '../types/spreadsheet';

interface SummaryCardsProps {
  contracts: Contract[];
  employees: Employee[];
}

export const SummaryCards = ({ contracts, employees }: SummaryCardsProps) => {
  const totalContracts = contracts.length;
  const quitadosCount = contracts.filter((c) => c.status === 'Quitado').length;
  const pendentesCount = contracts.filter((c) => c.status === 'Pendente').length;
  const analisarCount = contracts.filter((c) => c.status === 'Analisar').length;

  const julioGroup = employees.filter((e) => e.group === 'JULIO');
  const adrianoGroup = employees.filter((e) => e.group === 'ADRIANO/LEANDRO');

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalContracts}</div>
          <p className="text-xs text-muted-foreground">{quitadosCount} quitados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contratos Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendentesCount}</div>
          <p className="text-xs text-muted-foreground">{analisarCount} para analisar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Grupo Júlio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{julioGroup.length}</div>
          <p className="text-xs text-muted-foreground">
            {julioGroup.filter((e) => e.approved).length} aprovados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Grupo Adriano/Leandro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adrianoGroup.length}</div>
          <p className="text-xs text-muted-foreground">
            {adrianoGroup.filter((e) => e.approved).length} aprovados
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

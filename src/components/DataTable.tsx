import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Contract, Employee } from '../types/spreadsheet';
import { Badge } from './ui/badge';

interface DataTableProps {
  data: Contract[] | Employee[];
  type: 'contracts' | 'employees';
}

export const DataTable = ({ data, type }: DataTableProps) => {
  if (data.length === 0) {
    return <div className="text-center p-4 text-gray-500">Nenhum dado disponível</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'quitado':
        return 'bg-green-500';
      case 'pendente':
        return 'bg-yellow-500';
      case 'analisar':
        return 'bg-blue-500';
      case 'cancelado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (type === 'contracts') {
    const contracts = data as Contract[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Banco</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Atualização</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.contractNumber}</TableCell>
              <TableCell>{contract.clientName}</TableCell>
              <TableCell>{contract.receivingBank}</TableCell>
              <TableCell>{contract.responsibleEmployee}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
              </TableCell>
              <TableCell>{contract.lastUpdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const employees = data as Employee[];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Grupo</TableHead>
          <TableHead>Banco</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Análises</TableHead>
          <TableHead>Indicadores</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.group}</TableCell>
            <TableCell>{employee.bank}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
            </TableCell>
            <TableCell>{employee.dailyAnalysis}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {employee.priority && <Badge className="bg-purple-500">Prioritário</Badge>}
                {employee.settled && <Badge className="bg-green-500">Quitado</Badge>}
                {employee.approved && <Badge className="bg-blue-500">Aprovado</Badge>}
                {employee.receptive && <Badge className="bg-yellow-500">Receptivo</Badge>}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

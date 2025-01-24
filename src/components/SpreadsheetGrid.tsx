import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpreadsheetActions } from './SpreadsheetActions';
import { Employee, Contract, BANKS, DemandStatus, ContractStatus } from '@/types/spreadsheet';

const EMPLOYEE_NAMES = [
  'Maria Silva',
  'João Santos',
  'Ana Oliveira',
  'Pedro Costa',
  'Carla Souza',
  'Lucas Pereira',
  'Julia Lima',
  'Rafael Alves',
  'Beatriz Ferreira',
  'Marcos Ribeiro',
  'Patricia Gomes',
  'Fernando Santos',
  'Camila Costa',
  'Ricardo Oliveira',
  'Mariana Lima',
  'Bruno Almeida',
  'Laura Martins',
  'Gabriel Santos',
  'Isabella Costa',
  'Thiago Silva',
  'Daniela Oliveira',
  'André Pereira',
  'Carolina Lima',
  'Gustavo Santos',
  'Amanda Costa',
  'Felipe Souza',
  'Leticia Silva',
  'Leonardo Oliveira',
  'Natalia Lima',
  'Rodrigo Santos',
  'Vanessa Costa',
  'Eduardo Silva',
  'Fernanda Lima',
  'Marcelo Santos',
  'Juliana Costa',
  'Roberto Oliveira',
  'Cristina Lima',
  'Henrique Santos',
  'Renata Costa',
  'Paulo Silva',
];

// Generate 40 fake employees
const generateFakeEmployees = (): Employee[] => {
  const statuses: DemandStatus[] = ['Resolvido', 'Pendente Receptivo', 'Pendente Ativo'];
  return EMPLOYEE_NAMES.map((name, i) => ({
    id: `emp-${i + 1}`,
    name,
    bank: BANKS[Math.floor(Math.random() * BANKS.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: Math.random() > 0.7,
    dailyAnalysis: Math.floor(Math.random() * 10),
    settled: Math.random() > 0.5,
    approved: Math.random() > 0.5,
    receptive: Math.random() > 0.7,
    group: i < 20 ? 'JULIO' : 'ADRIANO/LEANDRO',
  }));
};

// Generate fake contracts
const generateFakeContracts = (employees: Employee[]): Contract[] => {
  const contractStatuses: ContractStatus[] = ['Analisar', 'Pendente', 'Quitado'];
  return Array.from({ length: 100 }, (_, i) => {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    return {
      id: `contract-${i + 1}`,
      contractNumber: `${Math.floor(Math.random() * 1000000)}`,
      clientName: `Cliente ${i + 1}`,
      receivingBank: BANKS[Math.floor(Math.random() * BANKS.length)],
      responsibleEmployee: employee.name,
      status: contractStatuses[Math.floor(Math.random() * contractStatuses.length)],
      lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };
  });
};

export const SpreadsheetGrid = () => {
  const [employees] = useState<Employee[]>(generateFakeEmployees());
  const [contracts] = useState<Contract[]>(generateFakeContracts(employees));
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('employees');

  const filteredEmployees =
    selectedBank === 'all' ? employees : employees.filter((emp) => emp.bank === selectedBank);

  const filteredContracts =
    selectedBank === 'all'
      ? contracts
      : contracts.filter((contract) => contract.receivingBank === selectedBank);

  return (
    <div className="space-y-4">
      <SpreadsheetActions employees={employees} contracts={contracts} />

      <div className="flex items-center gap-4">
        <label className="font-medium">Filtrar por Banco:</label>
        <Select value={selectedBank} onValueChange={setSelectedBank}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um banco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {BANKS.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="employees">Funcionários</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Grupo</TableHead>
                  <TableHead>Banco</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Análises do Dia</TableHead>
                  <TableHead>Quitado</TableHead>
                  <TableHead>Aprovado</TableHead>
                  <TableHead>Receptivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.group}</TableCell>
                    <TableCell>{employee.bank}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>{employee.priority ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>{employee.dailyAnalysis}</TableCell>
                    <TableCell>{employee.settled ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>{employee.approved ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>{employee.receptive ? 'Sim' : 'Não'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="contracts">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número do Contrato</TableHead>
                  <TableHead>Nome do Cliente</TableHead>
                  <TableHead>Banco Recebedor</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Atualização</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>{contract.contractNumber}</TableCell>
                    <TableCell>{contract.clientName}</TableCell>
                    <TableCell>{contract.receivingBank}</TableCell>
                    <TableCell>{contract.responsibleEmployee}</TableCell>
                    <TableCell>{contract.status}</TableCell>
                    <TableCell>{contract.lastUpdate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

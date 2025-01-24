import { Employee, Contract, ContractStatus } from '../types/spreadsheet';
import { format } from 'date-fns';

// Lista de bancos comuns
const BANKS = [
  'Banco do Brasil',
  'Caixa Econômica',
  'Bradesco',
  'Itaú',
  'Santander',
  'Nubank',
  'Inter',
  'Sicoob',
  'HSBC',
  'Safra',
];

// Lista de status possíveis
const CONTRACT_STATUS: ContractStatus[] = [
  'Analisar',
  'Pendente',
  'Em Processamento',
  'Quitado',
  'Cancelado',
];

// Gera um número de contrato único
const generateContractNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return `${year}${random}`;
};

// Gera uma data aleatória nos últimos 30 dias
const generateRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.setDate(now.getDate() - daysAgo));
  return format(date, 'yyyy-MM-dd');
};

// Gera nome fictício
const generateEmployeeName = () => {
  const firstNames = [
    'João',
    'Maria',
    'José',
    'Ana',
    'Pedro',
    'Paulo',
    'Carlos',
    'Marcos',
    'Lucas',
    'Gabriel',
    'Rafael',
    'Daniel',
    'Bruno',
    'Fernando',
    'Ricardo',
    'Rodrigo',
    'Marcelo',
    'André',
    'Felipe',
    'Eduardo',
  ];

  const lastNames = [
    'Silva',
    'Santos',
    'Oliveira',
    'Souza',
    'Rodrigues',
    'Ferreira',
    'Alves',
    'Pereira',
    'Lima',
    'Gomes',
    'Costa',
    'Ribeiro',
    'Martins',
    'Carvalho',
    'Almeida',
    'Lopes',
    'Soares',
    'Fernandes',
    'Vieira',
    'Barbosa',
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

// Gera nome de cliente fictício
const generateClientName = () => {
  const firstNames = [
    'Miguel',
    'Arthur',
    'Bernardo',
    'Heitor',
    'Davi',
    'Lorenzo',
    'Théo',
    'Pedro',
    'Gabriel',
    'Enzo',
    'Matheus',
    'Lucas',
    'Benjamin',
    'Nicolas',
    'Guilherme',
    'Rafael',
    'Joaquim',
    'Samuel',
    'Enzo',
    'João',
  ];

  const lastNames = [
    'Moreira',
    'Cardoso',
    'Dias',
    'Castro',
    'Campos',
    'Rocha',
    'Mendes',
    'Franco',
    'Melo',
    'Pinto',
    'Andrade',
    'Barros',
    'Freitas',
    'Correia',
    'Teixeira',
    'Medeiros',
    'Reis',
    'Siqueira',
    'Neves',
    'Ramos',
  ];

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
};

// Gera funcionários fictícios
export const generateEmployees = (count: number = 40): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 0; i < count; i++) {
    const group = i < count / 2 ? 'JULIO' : 'ADRIANO/LEANDRO';
    employees.push({
      id: `EMP${(i + 1).toString().padStart(3, '0')}`,
      name: generateEmployeeName(),
      bank: BANKS[Math.floor(Math.random() * BANKS.length)],
      status: CONTRACT_STATUS[Math.floor(Math.random() * CONTRACT_STATUS.length)],
      priority: Math.random() > 0.7,
      dailyAnalysis: Math.floor(Math.random() * 20),
      settled: Math.random() > 0.6,
      approved: Math.random() > 0.7,
      receptive: Math.random() > 0.5,
      group,
    });
  }

  return employees;
};

// Gera contratos fictícios
export const generateContracts = (employees: Employee[], count: number = 200): Contract[] => {
  const contracts: Contract[] = [];

  for (let i = 0; i < count; i++) {
    const employee = employees[Math.floor(Math.random() * employees.length)];

    contracts.push({
      id: `CON${(i + 1).toString().padStart(3, '0')}`,
      contractNumber: generateContractNumber(),
      clientName: generateClientName(),
      receivingBank: BANKS[Math.floor(Math.random() * BANKS.length)],
      responsibleEmployee: employee.name,
      status: CONTRACT_STATUS[Math.floor(Math.random() * CONTRACT_STATUS.length)],
      lastUpdate: generateRecentDate(),
    });
  }

  return contracts;
};

// Gera dados completos para a planilha
export const generateSpreadsheetData = () => {
  const employees = generateEmployees(40);
  const contracts = generateContracts(employees, 200);

  return {
    employees,
    contracts,
  };
};

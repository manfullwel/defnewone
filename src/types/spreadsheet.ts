export interface Employee {
  id: string;
  name: string;
  bank: string;
  status: ContractStatus;
  priority: boolean;
  dailyAnalysis: number;
  settled: boolean;
  approved: boolean;
  receptive: boolean;
  group: 'JULIO' | 'ADRIANO/LEANDRO';
}

export interface Contract {
  id: string;
  contractNumber: string;
  clientName: string;
  receivingBank: string;
  responsibleEmployee: string;
  status: ContractStatus;
  lastUpdate: string;
}

export type ContractStatus = 'Analisar' | 'Pendente' | 'Em Processamento' | 'Quitado' | 'Cancelado';

export type DemandStatus = 'Resolvido' | 'Pendente Receptivo' | 'Pendente Ativo';

export const BANKS = [
  'Bradesco',
  'Santander',
  'BV Financiamento',
  'Omni',
  'Itaú',
  'Banco do Brasil',
  'Caixa Econômica',
  'Safra',
  'Pan',
  'BMG',
] as const;

export interface ImportResult {
  employees: Employee[];
  contracts: Contract[];
  status: 'success' | 'error';
  message: string;
}

export interface SpreadsheetData {
  employees: Employee[];
  contracts: Contract[];
}

export interface AnalysisResult {
  date: Date;
  employeeStats: {
    [key: string]: {
      resolvidos: number;
      pendentesReceptivo: number;
      pendentesAtivo: number;
      quitados: number;
      aprovados: number;
    };
  };
  totalStats: {
    quitadosTotal: number;
    quitadosCliente: number;
    quitadoAprovado: number;
    aprovadosTotal: number;
    aprovadosDuplicados: number;
  };
}

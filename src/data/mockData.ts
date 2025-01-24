import { DailyReport, Demanda } from '@/types/report';

export const mockDemandas: Demanda[] = [
  {
    Nome: 'Maria Silva',
    Grupo: 'JULIO',
    Banco: 'Santander',
    Status: 'Resolvido',
    Prioridade: 'Não',
    Analises_do_Dia: 5,
    Quitado: false,
    Aprovado: true,
    Receptivo: false,
  },
  {
    Nome: 'João Santos',
    Grupo: 'JULIO',
    Banco: 'Omni',
    Status: 'Pendente Ativo',
    Prioridade: 'Não',
    Analises_do_Dia: 9,
    Quitado: true,
    Aprovado: true,
    Receptivo: false,
  },
  {
    Nome: 'Ana Oliveira',
    Grupo: 'JULIO',
    Banco: 'Pan',
    Status: 'Pendente Ativo',
    Prioridade: 'Não',
    Analises_do_Dia: 0,
    Quitado: false,
    Aprovado: true,
    Receptivo: true,
  },
  {
    Nome: 'Pedro Costa',
    Grupo: 'JULIO',
    Banco: 'Itaú',
    Status: 'Pendente Ativo',
    Prioridade: 'Não',
    Analises_do_Dia: 1,
    Quitado: true,
    Aprovado: true,
    Receptivo: true,
  },
  {
    Nome: 'Carla Souza',
    Grupo: 'JULIO',
    Banco: 'Santander',
    Status: 'Pendente Ativo',
    Prioridade: 'Sim',
    Analises_do_Dia: 4,
    Quitado: false,
    Aprovado: true,
    Receptivo: false,
  },
  // ... mais demandas para JULIO
  {
    Nome: 'Lucas Pereira',
    Grupo: 'ADRIANO/LEANDRO',
    Banco: 'BV Financiamento',
    Status: 'Pendente Ativo',
    Prioridade: 'Não',
    Analises_do_Dia: 8,
    Quitado: false,
    Aprovado: false,
    Receptivo: false,
  },
];

export const mockReportData: DailyReport[] = [
  {
    Nome_Funcionario: 'JULIO',
    Contratos_Resolvidos: 140,
    Pendentes_Receptivo: 102,
    Pendentes_Ativo: 701,
    Quitados: 9,
    Aprovados: 2,
    Data_Relatorio: new Date('2025-01-13'),
  },
  {
    Nome_Funcionario: 'ADRIANO/LEANDRO',
    Contratos_Resolvidos: 130,
    Pendentes_Receptivo: 161,
    Pendentes_Ativo: 482,
    Quitados: 16,
    Aprovados: 5,
    Data_Relatorio: new Date('2025-01-13'),
  },
];

export const mockStats = {
  JULIO: {
    Prioridades: 3,
    Analises_do_Dia: 3,
    Total_das_Analises: 49,
    Receptivo: 0,
  },
  'ADRIANO/LEANDRO': {
    Prioridades: 1,
    Analises_do_Dia: 20,
    Total_das_Analises: 32,
    Receptivo: 1,
  },
  Totais: {
    Total_de_Quitados: 25,
    Total_de_Quitados_Cliente: 1,
    Total_Quitado_Aprovado: 0,
    Total_de_Aprovados: 91,
    Aprovados_Duplicados: 6,
  },
};

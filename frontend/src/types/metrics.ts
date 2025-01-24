export interface ResponsavelMetrics {
  total: number;
  resolvidas: number;
  taxa_resolucao: number;
  media_diaria: number;
  dias_ativos: number;
  receptivo: number;
  ativo: number;
}

export interface EquipeMetrics {
  total: number;
  resolvidas: number;
  taxa_resolucao: number;
  receptivo: number;
  ativo: number;
  pendentes_receptivo: number;
  pendentes_ativo: number;
  demandas_dia: { [key: string]: number };
  responsaveis: { [key: string]: ResponsavelMetrics };
}

export interface Insight {
  equipe: string;
  responsavel?: string;
  insight: string;
  acao: string;
  impacto: 'ALTO' | 'MEDIO' | 'BAIXO';
}

export interface MetricsData {
  timestamp: string;
  geral: {
    total_demandas: number;
    resolvidas: number;
    taxa_geral: number;
    total_receptivo: number;
    total_ativo: number;
  };
  julio: EquipeMetrics;
  leandro: EquipeMetrics;
  insights: Insight[];
}

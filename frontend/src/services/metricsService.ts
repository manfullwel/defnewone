import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Insight {
  equipe: string;
  insight: string;
  impacto: 'ALTO' | 'MEDIO' | 'INFORMATIVO';
}

export interface MetricsSummary {
  total_demandas: number;
  total_resolvidas: number;
  taxa_resolucao: number;
  total_receptivo: number;
  total_ativo: number;
  insights: Insight[];
}

export interface ResponsavelMetrics {
  total_demandas: number;
  resolvidas: number;
  taxa_resolucao: number;
  media_diaria: number;
  dias_ativos: number;
  receptivo: number;
  ativo: number;
  pico_data: string;
  pico_quantidade: number;
  demandas_por_dia: { [key: string]: number };
}

export interface TeamMetrics {
  [equipe: string]: {
    [responsavel: string]: ResponsavelMetrics;
  };
}

export const metricsService = {
  async getMetricsSummary(): Promise<MetricsSummary> {
    const response = await axios.get(`${API_URL}/metrics/summary`);
    return response.data;
  },

  async getTeamMetrics(): Promise<TeamMetrics> {
    const response = await axios.get(`${API_URL}/metrics/team`);
    return response.data;
  },

  async getDailyMetrics(): Promise<{ [key: string]: number }> {
    const response = await axios.get(`${API_URL}/metrics/daily`);
    return response.data;
  }
};

import { DailyReport } from '@/types/report';

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public async importSheetData(spreadsheetId: string, range: string): Promise<DailyReport[]> {
    if (!this.accessToken) {
      throw new Error('Não autenticado. Faça login primeiro.');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao acessar a planilha');
      }

      const data = await response.json();
      const rows = data.values;

      if (!rows || rows.length === 0) {
        return [];
      }

      // Convert sheet data to DailyReport objects
      return rows.map(
        (row: any[]): DailyReport => ({
          Nome_Funcionario: row[0] || '',
          Contratos_Resolvidos: parseInt(row[1]) || 0,
          Pendentes_Receptivo: parseInt(row[2]) || 0,
          Pendentes_Ativo: parseInt(row[3]) || 0,
          Quitados: parseInt(row[4]) || 0,
          Aprovados: parseInt(row[5]) || 0,
          Data_Relatorio: new Date(row[6]),
        })
      );
    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error);
      throw error;
    }
  }
}

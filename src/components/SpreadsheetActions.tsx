import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ExcelJS from 'exceljs';
import {
  Employee,
  Contract,
  ImportResult,
  SpreadsheetData,
  AnalysisResult,
} from '@/types/spreadsheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';

interface SpreadsheetActionsProps {
  onDataImported?: (result: ImportResult) => void;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export const SpreadsheetActions = ({
  onDataImported,
  onAnalysisComplete,
}: SpreadsheetActionsProps) => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const exportToExcel = async (type: 'employees' | 'contracts', data: Employee[] | Contract[]) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(type === 'employees' ? 'Funcionários' : 'Contratos');

      // Add headers
      const headers = Object.keys(data[0] || {});
      worksheet.addRow(headers.map((header) => header.charAt(0).toUpperCase() + header.slice(1)));

      // Add data
      data.forEach((item) => {
        worksheet.addRow(Object.values(item));
      });

      // Style the header row
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE9ECEF' },
      };

      // Auto-fit columns
      worksheet.columns.forEach((column) => {
        column.width =
          Math.max(
            ...worksheet.getColumn(column.number).values.map((v) => (v ? v.toString().length : 0))
          ) + 2;
      });

      // Generate file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sete-capital-${type}-${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Exportação concluída',
        description: 'Arquivo Excel gerado com sucesso!',
      });
    } catch (error) {
      toast({
        title: 'Erro na exportação',
        description: 'Não foi possível gerar o arquivo Excel.',
        variant: 'destructive',
      });
    }
  };

  const importFromGoogleSheets = async () => {
    try {
      setIsLoading(true);
      if (!googleSheetUrl) {
        toast({
          title: 'URL não fornecida',
          description: 'Por favor, insira a URL do Google Sheets ou arquivo Excel.',
          variant: 'destructive',
        });
        return;
      }

      // Simular processamento de dados
      // Aqui você implementaria a lógica real de importação
      const mockResult: ImportResult = {
        employees: [
          {
            id: '1',
            name: 'Julio',
            bank: 'Bradesco',
            status: 'Resolvido',
            priority: true,
            dailyAnalysis: 3,
            settled: true,
            approved: false,
            receptive: false,
            group: 'JULIO',
          },
        ],
        contracts: [
          {
            id: '1',
            contractNumber: '123456',
            clientName: 'Cliente Teste',
            receivingBank: 'Bradesco',
            responsibleEmployee: 'Julio',
            status: 'Analisar',
            lastUpdate: new Date().toISOString(),
          },
        ],
        status: 'success',
        message: 'Dados importados com sucesso!',
      };

      // Análise dos dados
      const analysisResult: AnalysisResult = {
        date: new Date(),
        employeeStats: {
          Julio: {
            resolvidos: 140,
            pendentesReceptivo: 102,
            pendentesAtivo: 701,
            quitados: 9,
            aprovados: 2,
          },
          'Adriano/Leandro': {
            resolvidos: 130,
            pendentesReceptivo: 161,
            pendentesAtivo: 482,
            quitados: 16,
            aprovados: 5,
          },
        },
        totalStats: {
          quitadosTotal: 25,
          quitadosCliente: 1,
          quitadoAprovado: 0,
          aprovadosTotal: 91,
          aprovadosDuplicados: 6,
        },
      };

      onDataImported?.(mockResult);
      onAnalysisComplete?.(analysisResult);

      toast({
        title: 'Importação concluída',
        description: mockResult.message,
      });
    } catch (error) {
      toast({
        title: 'Erro na importação',
        description: 'Não foi possível importar os dados.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações de Planilha</CardTitle>
        <CardDescription>Importe dados do Google Sheets ou exporte para Excel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Input
            placeholder="Cole a URL do Google Sheets ou arraste um arquivo Excel"
            value={googleSheetUrl}
            onChange={(e) => setGoogleSheetUrl(e.target.value)}
            className="flex-1"
          />
          <div className="flex space-x-2">
            <Button onClick={importFromGoogleSheets} disabled={isLoading} className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              {isLoading ? 'Importando...' : 'Importar Dados'}
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => exportToExcel('employees', [])}
            variant="outline"
            className="flex-1"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Funcionários
          </Button>
          <Button
            onClick={() => exportToExcel('contracts', [])}
            variant="outline"
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar Contratos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload } from 'lucide-react';
import { DailyReport } from '@/types/report';
import * as ExcelJS from 'exceljs';

interface FileUploadProps {
  onDataImported: (data: DailyReport[], fileName: string) => void;
}

export const FileUpload = ({ onDataImported }: FileUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelFile = async (file: File) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new Error('Planilha não encontrada');
      }

      const jsonData: any[][] = [];
      worksheet.eachRow((row, rowNumber) => {
        const rowData = row.values;
        // ExcelJS começa do índice 1, então removemos o primeiro item vazio
        rowData.shift();
        jsonData.push(rowData);
      });

      if (jsonData.length > 1) {
        // Verificamos se há dados além do cabeçalho
        const reports = jsonData.slice(1).map(
          (row): DailyReport => ({
            Nome_Funcionario: String(row[0] || ''),
            Contratos_Resolvidos: Number(row[1]) || 0,
            Pendentes_Receptivo: Number(row[2]) || 0,
            Pendentes_Ativo: Number(row[3]) || 0,
            Quitados: Number(row[4]) || 0,
            Aprovados: Number(row[5]) || 0,
            Data_Relatorio: row[6] instanceof Date ? row[6] : new Date(),
          })
        );
        onDataImported(reports, file.name);
      } else {
        throw new Error('Arquivo vazio ou sem dados válidos');
      }
    } catch (err) {
      console.error('Erro ao processar arquivo:', err);
      throw new Error('Erro ao processar arquivo. Verifique se o formato está correto.');
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      setError(null);

      try {
        if (acceptedFiles.length === 0) {
          throw new Error('Nenhum arquivo selecionado');
        }

        const file = acceptedFiles[0];
        await processExcelFile(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao processar arquivo');
      } finally {
        setLoading(false);
      }
    },
    [onDataImported]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg">Solte o arquivo aqui...</p>
        ) : (
          <p className="text-lg">Arraste um arquivo Excel ou clique para selecionar</p>
        )}
        <p className="text-sm text-gray-500 mt-2">Apenas arquivos .xlsx ou .xls</p>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <Loader2 className="w-6 h-6 animate-spin inline-block" />
          <span className="ml-2">Processando arquivo...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 text-center">
        <Button {...getRootProps()} variant="outline" disabled={loading}>
          Selecionar Arquivo
        </Button>
      </div>
    </div>
  );
};

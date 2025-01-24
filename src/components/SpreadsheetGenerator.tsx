wimport { Button } from './ui/button';
import { generateSpreadsheetData } from '../utils/mockDataGenerator';
import { exportToExcel } from '../utils/excelExporter';
import { toast } from './ui/use-toast';

export const SpreadsheetGenerator = () => {
  const handleGenerateSpreadsheet = async () => {
    try {
      const data = generateSpreadsheetData();
      await exportToExcel(data, 'contratos_demandas.xlsx');

      toast({
        title: 'Sucesso!',
        description: 'Planilha gerada com sucesso.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Erro ao gerar planilha:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao gerar planilha. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4">
      <Button
        onClick={handleGenerateSpreadsheet}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Gerar Planilha de Exemplo
      </Button>
      <p className="mt-2 text-sm text-gray-600">
        Gera uma planilha Excel com dados fictícios de contratos e funcionários, divididos em grupos
        e com fórmulas de totalização.
      </p>
    </div>
  );
};

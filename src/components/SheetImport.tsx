import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleSheetsService } from '@/services/googleSheets';
import { DailyReport } from '@/types/report';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, FileSpreadsheet, Table2 } from 'lucide-react';
import { GoogleSheetsWizard } from './GoogleSheetsWizard';
import { FileUpload } from './FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SheetImportProps {
  onDataImported: (data: DailyReport[], fileName?: string) => void;
  onRawDataImported: (data: any[][], fileName?: string) => void;
}

export const SheetImport = ({ onDataImported, onRawDataImported }: SheetImportProps) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [sheetRange, setSheetRange] = useState('A2:G');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [showGoogleSetup, setShowGoogleSetup] = useState(false);

  const handleAuthComplete = (token: string) => {
    const sheetsService = GoogleSheetsService.getInstance();
    sheetsService.setAccessToken(token);
    setIsConfigured(true);
  };

  const extractSpreadsheetId = (url: string): string | null => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  };

  const handleImport = async () => {
    setLoading(true);
    setError(null);

    try {
      const spreadsheetId = extractSpreadsheetId(sheetUrl);
      if (!spreadsheetId) {
        throw new Error('URL da planilha inválida');
      }

      const sheetsService = GoogleSheetsService.getInstance();
      const data = await sheetsService.importSheetData(spreadsheetId, sheetRange);
      onDataImported(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao importar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showGoogleSetup && !isConfigured && <GoogleSheetsWizard onComplete={handleAuthComplete} />}

      <Card>
        <CardHeader>
          <CardTitle>Importar Dados</CardTitle>
          <CardDescription>Escolha como deseja importar seus dados para análise</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="file" className="space-y-4">
            <TabsList>
              <TabsTrigger value="file">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Upload de Arquivo
              </TabsTrigger>
              <TabsTrigger value="sheets">
                <Table2 className="h-4 w-4 mr-2" />
                Google Sheets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-4">
              <FileUpload
                onDataImported={(data, fileName) => {
                  onDataImported(data, fileName);
                  onRawDataImported(
                    data.map((d) => [
                      d.Nome_Funcionario,
                      d.Contratos_Resolvidos,
                      d.Pendentes_Receptivo,
                      d.Pendentes_Ativo,
                      d.Quitados,
                      d.Aprovados,
                      d.Data_Relatorio,
                    ]),
                    fileName
                  );
                }}
              />
            </TabsContent>

            <TabsContent value="sheets" className="space-y-4">
              {!isConfigured ? (
                <div className="text-center space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Para importar do Google Sheets, você precisa primeiro configurar a integração.
                  </p>
                  <Button onClick={() => setShowGoogleSetup(true)}>Configurar Google Sheets</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sheetUrl">URL da Planilha do Google</Label>
                    <Input
                      id="sheetUrl"
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sheetRange">Intervalo de Células (opcional)</Label>
                    <Input
                      id="sheetRange"
                      value={sheetRange}
                      onChange={(e) => setSheetRange(e.target.value)}
                      placeholder="A2:G"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Erro</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={handleImport} disabled={loading || !sheetUrl} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Importando...
                      </>
                    ) : (
                      'Importar Dados'
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

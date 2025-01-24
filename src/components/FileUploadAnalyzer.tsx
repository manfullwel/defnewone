import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Loader2, FileUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { parse } from 'papaparse';

interface FileAnalysisResult {
  date: string;
  totalDemands: number;
  groups: {
    name: string;
    resolvidos: number;
    pendentesReceptivo: number;
    pendentesAtivo: number;
    quitados: number;
    aprovados: number;
    members: {
      name: string;
      pendentesReceptivo: number;
      pendentesAtivo: number;
      quitados: number;
      aprovados: number;
      lastUpdate?: {
        contract: string;
        status: string;
        timestamp: string;
      };
    }[];
  }[];
}

export const FileUploadAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<FileAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    try {
      const content = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });

      // Simular progresso de análise
      const simulateProgress = () => {
        setProgress((prev) => {
          if (prev < 90) {
            setTimeout(simulateProgress, 200);
            return prev + 10;
          }
          return prev;
        });
      };
      simulateProgress();

      // Analisar CSV usando PapaParse
      parse(content, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          
          // Processar dados
          const analysisResult: FileAnalysisResult = {
            date: new Date().toISOString().split('T')[0],
            totalDemands: data.length,
            groups: []
          };

          // Agrupar dados por equipe
          const groupedData = data.reduce((acc, row) => {
            const group = acc.find(g => g.name === row.grupo);
            if (group) {
              group.demands.push(row);
            } else {
              acc.push({ name: row.grupo, demands: [row] });
            }
            return acc;
          }, [] as { name: string; demands: any[] }[]);

          // Calcular métricas para cada grupo
          analysisResult.groups = groupedData.map(group => ({
            name: group.name,
            resolvidos: group.demands.filter(d => d.status === 'Resolvido').length,
            pendentesReceptivo: group.demands.filter(d => d.status === 'Pendente Receptivo').length,
            pendentesAtivo: group.demands.filter(d => d.status === 'Pendente Ativo').length,
            quitados: group.demands.filter(d => d.status === 'Quitado').length,
            aprovados: group.demands.filter(d => d.status === 'Aprovado').length,
            members: Object.entries(
              group.demands.reduce((acc, demand) => {
                const member = acc[demand.responsavel] || {
                  name: demand.responsavel,
                  pendentesReceptivo: 0,
                  pendentesAtivo: 0,
                  quitados: 0,
                  aprovados: 0
                };
                
                switch (demand.status) {
                  case 'Pendente Receptivo':
                    member.pendentesReceptivo++;
                    break;
                  case 'Pendente Ativo':
                    member.pendentesAtivo++;
                    break;
                  case 'Quitado':
                    member.quitados++;
                    break;
                  case 'Aprovado':
                    member.aprovados++;
                    break;
                }

                if (demand.ultima_atualizacao) {
                  member.lastUpdate = {
                    contract: demand.contrato,
                    status: demand.status,
                    timestamp: demand.ultima_atualizacao
                  };
                }

                acc[demand.responsavel] = member;
                return acc;
              }, {} as Record<string, any>)
            ).map(([_, member]) => member)
          }));

          setProgress(100);
          setResult(analysisResult);
          setIsAnalyzing(false);
        },
        error: (error) => {
          setError(`Erro ao analisar arquivo: ${error.message}`);
          setIsAnalyzing(false);
        }
      });
    } catch (err) {
      setError(`Erro ao processar arquivo: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Analisador de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => document.getElementById('fileInput')?.click()}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4" />
                )}
                Selecionar Arquivo
              </Button>
              <input
                id="fileInput"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) analyzeFile(file);
                }}
              />
              {isAnalyzing && (
                <div className="flex-1">
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Análise Concluída</AlertTitle>
                  <AlertDescription>
                    Arquivo analisado com sucesso. Total de demandas: {result.totalDemands}
                  </AlertDescription>
                </Alert>

                {result.groups.map((group) => (
                  <Card key={group.name}>
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{group.resolvidos}</div>
                          <div className="text-sm text-muted-foreground">Resolvidos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{group.pendentesReceptivo}</div>
                          <div className="text-sm text-muted-foreground">Pendentes Receptivo</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{group.pendentesAtivo}</div>
                          <div className="text-sm text-muted-foreground">Pendentes Ativo</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{group.quitados}</div>
                          <div className="text-sm text-muted-foreground">Quitados</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{group.aprovados}</div>
                          <div className="text-sm text-muted-foreground">Aprovados</div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        {group.members.map((member) => (
                          <Card key={member.name}>
                            <CardHeader>
                              <CardTitle className="text-lg">{member.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="text-xl font-bold">{member.pendentesReceptivo}</div>
                                  <div className="text-sm text-muted-foreground">Pendentes Receptivo</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold">{member.pendentesAtivo}</div>
                                  <div className="text-sm text-muted-foreground">Pendentes Ativo</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold">{member.quitados}</div>
                                  <div className="text-sm text-muted-foreground">Quitados</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold">{member.aprovados}</div>
                                  <div className="text-sm text-muted-foreground">Aprovados</div>
                                </div>
                              </div>
                              {member.lastUpdate && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                  Última atualização: Contrato {member.lastUpdate.contract} - 
                                  {member.lastUpdate.status} em {member.lastUpdate.timestamp}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

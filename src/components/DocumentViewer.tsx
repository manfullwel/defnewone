import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DocumentViewerProps {
  data: any[][];
  fileName?: string;
  uploadDate?: Date;
}

export const DocumentViewer = ({ data, fileName, uploadDate }: DocumentViewerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visualizador de Documento</CardTitle>
          <CardDescription>Nenhum dado disponível para exibição</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const headers = data[0];
  const rows = data
    .slice(1)
    .filter((row) =>
      row.some((cell) => cell?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualizador de Documento</CardTitle>
        <CardDescription>
          {fileName && <div>Arquivo: {fileName}</div>}
          {uploadDate && (
            <div>
              Importado em: {uploadDate.toLocaleDateString('pt-BR')} às{' '}
              {uploadDate.toLocaleTimeString('pt-BR')}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar em todas as colunas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header: string, index: number) => (
                  <TableHead key={index} className="font-bold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <TableCell key={cellIndex}>{cell?.toString() || '-'}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

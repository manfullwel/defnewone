import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Demanda } from '@/types/report';
import { Search } from 'lucide-react';

interface DemandasTableProps {
  demandas: Demanda[];
}

export const DemandasTable = ({ demandas }: DemandasTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBanco, setFilterBanco] = useState('all');
  const [filterGrupo, setFilterGrupo] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Obter listas únicas para os filtros
  const bancos = Array.from(new Set(demandas.map((d) => d.Banco)));
  const grupos = Array.from(new Set(demandas.map((d) => d.Grupo)));
  const statusList = Array.from(new Set(demandas.map((d) => d.Status)));

  // Filtrar demandas
  const filteredDemandas = demandas.filter((demanda) => {
    const matchesSearch =
      searchTerm === '' || demanda.Nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBanco = filterBanco === 'all' || demanda.Banco === filterBanco;
    const matchesGrupo = filterGrupo === 'all' || demanda.Grupo === filterGrupo;
    const matchesStatus = filterStatus === 'all' || demanda.Status === filterStatus;

    return matchesSearch && matchesBanco && matchesGrupo && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filtros */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={filterBanco} onValueChange={setFilterBanco}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por banco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os bancos</SelectItem>
                {bancos.map((banco) => (
                  <SelectItem key={banco} value={banco}>
                    {banco}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterGrupo} onValueChange={setFilterGrupo}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os grupos</SelectItem>
                {grupos.map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>
                    {grupo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {statusList.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Grupo</TableHead>
                  <TableHead>Banco</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead className="text-center">Análises do Dia</TableHead>
                  <TableHead className="text-center">Quitado</TableHead>
                  <TableHead className="text-center">Aprovado</TableHead>
                  <TableHead className="text-center">Receptivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDemandas.map((demanda, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{demanda.Nome}</TableCell>
                    <TableCell>{demanda.Grupo}</TableCell>
                    <TableCell>{demanda.Banco}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          demanda.Status === 'Concluído'
                            ? 'success'
                            : demanda.Status === 'Pendente'
                              ? 'warning'
                              : 'default'
                        }
                      >
                        {demanda.Status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          demanda.Prioridade === 'Alta'
                            ? 'destructive'
                            : demanda.Prioridade === 'Média'
                              ? 'warning'
                              : 'default'
                        }
                      >
                        {demanda.Prioridade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{demanda.Analises_do_Dia}</TableCell>
                    <TableCell className="text-center">{demanda.Quitado ? '✓' : '✗'}</TableCell>
                    <TableCell className="text-center">{demanda.Aprovado ? '✓' : '✗'}</TableCell>
                    <TableCell className="text-center">{demanda.Receptivo ? '✓' : '✗'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import ExcelJS from 'exceljs';
import { Employee, Contract } from '../types/spreadsheet';

export const exportToExcel = async (
  data: { employees: Employee[]; contracts: Contract[] },
  filename: string = 'contratos.xlsx'
) => {
  const workbook = new ExcelJS.Workbook();

  // Planilha Principal - Todos os Contratos
  const mainSheet = workbook.addWorksheet('Contratos');
  mainSheet.columns = [
    { header: 'Número do Contrato', key: 'contractNumber', width: 20 },
    { header: 'Nome do Cliente', key: 'clientName', width: 30 },
    { header: 'Banco Recebedor', key: 'receivingBank', width: 20 },
    { header: 'Responsável', key: 'responsibleEmployee', width: 30 },
    { header: 'Status do Contrato', key: 'status', width: 20 },
    { header: 'Data de Atualização', key: 'lastUpdate', width: 20 },
  ];

  // Estiliza o cabeçalho
  mainSheet.getRow(1).font = { bold: true };
  mainSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE9ECEF' },
  };

  // Adiciona os dados
  mainSheet.addRows(data.contracts);

  // Planilha Grupo Júlio
  const julioSheet = workbook.addWorksheet('Grupo Júlio');
  julioSheet.columns = mainSheet.columns;
  julioSheet.getRow(1).font = { bold: true };
  julioSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE9ECEF' },
  };

  // Planilha Grupo Adriano/Leandro
  const adrianoSheet = workbook.addWorksheet('Grupo Adriano/Leandro');
  adrianoSheet.columns = mainSheet.columns;
  adrianoSheet.getRow(1).font = { bold: true };
  adrianoSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE9ECEF' },
  };

  // Filtra contratos por grupo
  const julioEmployees = data.employees
    .filter((emp) => emp.group === 'JULIO')
    .map((emp) => emp.name);
  const adrianoEmployees = data.employees
    .filter((emp) => emp.group === 'ADRIANO/LEANDRO')
    .map((emp) => emp.name);

  const julioContracts = data.contracts.filter((contract) =>
    julioEmployees.includes(contract.responsibleEmployee)
  );
  const adrianoContracts = data.contracts.filter((contract) =>
    adrianoEmployees.includes(contract.responsibleEmployee)
  );

  julioSheet.addRows(julioContracts);
  adrianoSheet.addRows(adrianoContracts);

  // Planilha de Funcionários
  const employeesSheet = workbook.addWorksheet('Funcionários');
  employeesSheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Nome', key: 'name', width: 30 },
    { header: 'Grupo', key: 'group', width: 20 },
    { header: 'Banco', key: 'bank', width: 20 },
    { header: 'Status', key: 'status', width: 20 },
    { header: 'Prioridade', key: 'priority', width: 15 },
    { header: 'Análises Diárias', key: 'dailyAnalysis', width: 15 },
    { header: 'Quitado', key: 'settled', width: 15 },
    { header: 'Aprovado', key: 'approved', width: 15 },
    { header: 'Receptivo', key: 'receptive', width: 15 },
  ];

  employeesSheet.getRow(1).font = { bold: true };
  employeesSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE9ECEF' },
  };

  employeesSheet.addRows(data.employees);

  // Adiciona fórmulas e totalizadores
  const addTotals = (sheet: ExcelJS.Worksheet, startRow: number) => {
    const lastRow = sheet.rowCount;
    sheet.getCell(`A${lastRow + 2}`).value = 'Totais:';
    sheet.getCell(`A${lastRow + 2}`).font = { bold: true };

    // Conta total de contratos
    sheet.getCell(`B${lastRow + 2}`).value = {
      formula: `COUNTA(A2:A${lastRow})`,
    };

    // Conta por status
    sheet.getCell(`E${lastRow + 2}`).value = {
      formula: `COUNTIF(E2:E${lastRow}, "Quitado")`,
    };
  };

  addTotals(mainSheet, 2);
  addTotals(julioSheet, 2);
  addTotals(adrianoSheet, 2);

  // Salva o arquivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Cria link para download
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

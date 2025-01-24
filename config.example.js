// Google Sheets API Configuration
export const config = {
    // Sua chave API do Google Sheets
    API_KEY: 'YOUR_API_KEY',
    
    // ID da sua planilha (encontrado na URL)
    // Exemplo: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
    
    // Range da planilha (ajuste conforme sua estrutura)
    RANGE: 'Demandas!A1:Z',
    
    // Intervalo de atualização em milissegundos (padrão: 1 minuto)
    UPDATE_INTERVAL: 60000
};

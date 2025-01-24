// Google Sheets API Integration
class GoogleSheetsAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
        this.SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
    }

    async init() {
        try {
            await gapi.client.init({
                apiKey: this.apiKey,
                discoveryDocs: this.DISCOVERY_DOCS,
                scope: this.SCOPES
            });
            console.log('Google Sheets API initialized');
            return true;
        } catch (error) {
            console.error('Error initializing Google Sheets API:', error);
            return false;
        }
    }

    async loadSheetData(spreadsheetId, range) {
        try {
            const response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetId,
                range: range,
            });

            return this.processSheetData(response.result.values);
        } catch (error) {
            console.error('Error loading sheet data:', error);
            return null;
        }
    }

    processSheetData(values) {
        if (!values || values.length === 0) {
            return null;
        }

        const headers = values[0];
        const data = values.slice(1);

        return data.map(row => {
            const item = {};
            headers.forEach((header, index) => {
                item[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
            });
            return item;
        });
    }

    async startRealTimeSync(spreadsheetId, range, callback, interval = 60000) {
        // Primeira carga
        const initialData = await this.loadSheetData(spreadsheetId, range);
        if (initialData) {
            callback(initialData);
        }

        // Atualização periódica
        setInterval(async () => {
            const updatedData = await this.loadSheetData(spreadsheetId, range);
            if (updatedData) {
                callback(updatedData);
            }
        }, interval);
    }
}

// Função para calcular métricas a partir dos dados do Google Sheets
function calcularMetricas(dados) {
    const metricas = {};
    
    dados.forEach(row => {
        const colaborador = row.colaborador;
        if (!metricas[colaborador]) {
            metricas[colaborador] = {
                total: 0,
                resolvidas: 0,
                receptivo: 0,
                ativo: 0,
                equipe: row.equipe,
                pico: { quantidade: 0, data: null },
                demandas_por_dia: {}
            };
        }

        // Incrementar contadores
        metricas[colaborador].total++;
        if (row.status === 'Resolvido') {
            metricas[colaborador].resolvidas++;
        }
        if (row.tipo === 'Receptivo') {
            metricas[colaborador].receptivo++;
        } else {
            metricas[colaborador].ativo++;
        }

        // Registrar demanda por dia
        const data = row.data;
        if (!metricas[colaborador].demandas_por_dia[data]) {
            metricas[colaborador].demandas_por_dia[data] = 0;
        }
        metricas[colaborador].demandas_por_dia[data]++;

        // Atualizar pico se necessário
        if (metricas[colaborador].demandas_por_dia[data] > metricas[colaborador].pico.quantidade) {
            metricas[colaborador].pico = {
                quantidade: metricas[colaborador].demandas_por_dia[data],
                data: data
            };
        }
    });

    // Calcular médias e percentuais
    Object.keys(metricas).forEach(colaborador => {
        const m = metricas[colaborador];
        const dias = Object.keys(m.demandas_por_dia).length;
        m.mediadiaria = dias > 0 ? (m.resolvidas / dias).toFixed(1) : 0;
        m.percentual = m.total > 0 ? Math.round((m.resolvidas / m.total) * 100) : 0;
    });

    return metricas;
}

export { GoogleSheetsAPI, calcularMetricas };

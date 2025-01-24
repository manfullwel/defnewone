// Armazena a URL do ngrok
var NGROK_URL = 'https://19ef-191-202-116-213.ngrok-free.app';

function onEdit(e) {
  // Verifica se houve alteração na planilha
  if (e) {
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    
    // Verifica se a célula tem validação de dados
    var dataValidation = range.getDataValidation();
    if (dataValidation) {
      var criteria = dataValidation.getCriteriaType();
      var validValues = dataValidation.getCriteriaValues();
      var value = range.getValue();
      
      // Se o valor não estiver na lista de valores válidos
      if (criteria == SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST && 
          validValues[0].indexOf(value) === -1) {
        // Mostra mensagem de erro
        SpreadsheetApp.getActiveSpreadsheet().toast(
          'Valor inválido! Valores permitidos: ' + validValues[0].join(', '), 
          'Erro de Validação', 
          5
        );
        return;
      }
    }
    
    // Aguarda 2 segundos para garantir que todas as alterações foram feitas
    Utilities.sleep(2000);
    
    // Envia os dados para o dashboard
    sendToDashboard();
  }
}

// Função para configurar a URL do ngrok
function setNgrokUrl(url) {
  NGROK_URL = url;
  PropertiesService.getScriptProperties().setProperty('NGROK_URL', url);
  SpreadsheetApp.getActiveSpreadsheet().toast('URL do ngrok configurada: ' + url, 'Configuração', 3);
}

// Função para obter a URL do ngrok
function getNgrokUrl() {
  if (!NGROK_URL) {
    NGROK_URL = PropertiesService.getScriptProperties().getProperty('NGROK_URL') || '';
  }
  return NGROK_URL;
}

function sendToDashboard() {
  try {
    // Obtém a URL do ngrok
    var ngrokUrl = getNgrokUrl();
    if (!ngrokUrl) {
      throw new Error('URL do ngrok não configurada. Use setNgrokUrl() primeiro.');
    }
    
    // URL da API
    var apiUrl = ngrokUrl + '/update_demandas';
    
    // Obtém as planilhas
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var julioSheet = ss.getSheetByName('DEMANDAS JULIO');
    var leandroSheet = ss.getSheetByName('DEMANDA LEANDROADRIANO');
    
    // Função para validar valor com regras de validação
    function isValidValue(value, sheet, col) {
      if (value === '') return true;
      
      var lastRow = sheet.getLastRow();
      var range = sheet.getRange(2, col, 1, 1);
      var validation = range.getDataValidation();
      
      if (validation) {
        var criteria = validation.getCriteriaType();
        var validValues = validation.getCriteriaValues();
        
        if (criteria == SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
          return validValues[0].indexOf(value) !== -1;
        }
      }
      return true;
    }
    
    // Função para converter planilha em JSON
    function sheetToJson(sheet, equipe) {
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var jsonData = [];
      
      for (var i = 1; i < data.length; i++) {
        var row = {};
        var validRow = true;
        
        for (var j = 0; j < headers.length; j++) {
          var value = data[i][j];
          
          // Verifica validação para a célula
          if (!isValidValue(value, sheet, j + 1)) {
            SpreadsheetApp.getActiveSpreadsheet().toast(
              'Valor inválido na linha ' + (i + 1) + ', coluna ' + headers[j],
              'Erro de Validação',
              5
            );
            validRow = false;
            break;
          }
          
          row[headers[j]] = value;
        }
        
        if (validRow) {
          row['EQUIPE'] = equipe;
          jsonData.push(row);
        }
      }
      return jsonData;
    }
    
    // Converte dados das duas planilhas
    var julioData = sheetToJson(julioSheet, 'Julio');
    var leandroData = sheetToJson(leandroSheet, 'Leandro');
    
    // Combina os dados
    var allData = julioData.concat(leandroData);
    
    // Configura a requisição
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(allData),
      'muteHttpExceptions': true
    };
    
    // Tenta enviar os dados
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseCode = response.getResponseCode();
    
    if (responseCode == 200) {
      var result = JSON.parse(response.getContentText());
      SpreadsheetApp.getActiveSpreadsheet().toast(
        'Dados enviados com sucesso!\nJulio: ' + result.details.julio_count + ' demandas\n' +
        'Leandro: ' + result.details.leandro_count + ' demandas',
        'Sucesso',
        5
      );
    } else {
      throw new Error('Erro na resposta do servidor: ' + response.getContentText());
    }
    
  } catch (error) {
    console.error('Erro:', error);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Erro ao enviar dados: ' + error.toString(),
      'Erro',
      5
    );
  }
}

// Adiciona menu personalizado na planilha
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard')
      .addItem('Atualizar Dashboard', 'sendToDashboard')
      .addItem('Configurar URL do ngrok', 'showNgrokUrlPrompt')
      .addToUi();
}

// Função para mostrar prompt de configuração do ngrok
function showNgrokUrlPrompt() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    'Configurar URL do ngrok',
    'Digite a URL do ngrok (ex: https://abc123.ngrok.io):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (result.getSelectedButton() == ui.Button.OK) {
    var url = result.getResponseText().trim();
    if (url) {
      setNgrokUrl(url);
    }
  }
}

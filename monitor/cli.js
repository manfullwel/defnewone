import readline from 'readline';

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Estado do monitor
let metrics = [];
let errors = [];

// Configuração do readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Limpar a tela
function clearScreen() {
  console.clear();
}

// Mostrar cabeçalho
function showHeader() {
  console.log(colors.cyan + colors.bright);
  console.log('=================================');
  console.log('       MONITOR DE PERFORMANCE     ');
  console.log('=================================');
  console.log(colors.reset);
}

// Mostrar menu
function showMenu() {
  console.log('\n' + colors.yellow + 'Comandos disponíveis:' + colors.reset);
  console.log('1 - Mostrar métricas de performance');
  console.log('2 - Mostrar logs de erro');
  console.log('3 - Limpar tela');
  console.log('4 - Mostrar análise de performance');
  console.log('5 - Atualizar dados');
  console.log('q - Sair');
  console.log('\n');
}

// Mostrar métricas
function showMetrics() {
  console.log(colors.cyan + '\nMétricas de Performance:' + colors.reset);
  if (metrics.length === 0) {
    console.log('Nenhuma métrica registrada ainda.');
    return;
  }

  metrics.slice(-10).forEach((metric, index) => {
    const duration = metric.duration.toFixed(2);
    const color = duration > 1000 ? colors.red : duration > 500 ? colors.yellow : colors.green;
    console.log(
      `${index + 1}. ${metric.name} - ${color}${duration}ms${colors.reset} (${new Date(metric.timestamp).toLocaleTimeString()})`
    );
  });
}

// Mostrar erros
function showErrors() {
  console.log(colors.red + '\nLogs de Erro:' + colors.reset);
  if (errors.length === 0) {
    console.log('Nenhum erro registrado.');
    return;
  }

  errors.slice(-10).forEach((error, index) => {
    console.log(`${index + 1}. [${error.type}] ${error.message}`);
    if (error.stack) {
      console.log(colors.bright + error.stack + colors.reset);
    }
  });
}

// Análise de performance
function showAnalysis() {
  console.log(colors.cyan + '\nAnálise de Performance:' + colors.reset);
  
  if (metrics.length === 0) {
    console.log('Dados insuficientes para análise.');
    return;
  }

  // Calcular métricas
  const averageTime = metrics.reduce((acc, m) => acc + m.duration, 0) / metrics.length;
  const slowOperations = metrics.filter(m => m.duration > 1000);
  const errorRate = errors.length / Math.max(metrics.length, 1);

  // Mostrar resultados
  console.log(`\nTempo médio de operação: ${colors.yellow}${averageTime.toFixed(2)}ms${colors.reset}`);
  console.log(`Operações lentas: ${colors.red}${slowOperations.length}${colors.reset}`);
  console.log(`Taxa de erros: ${colors.yellow}${(errorRate * 100).toFixed(2)}%${colors.reset}`);

  // Recomendações
  console.log('\nRecomendações:');
  if (averageTime > 500) {
    console.log(colors.yellow + '⚠️ Alto tempo médio de resposta. Considere otimizar as operações.' + colors.reset);
  }
  if (slowOperations.length > 0) {
    console.log(colors.red + '⚠️ Operações lentas detectadas:' + colors.reset);
    slowOperations.slice(-5).forEach(op => {
      console.log(`   - ${op.name}: ${op.duration.toFixed(2)}ms`);
    });
  }
  if (errorRate > 0.05) {
    console.log(colors.red + '⚠️ Alta taxa de erros. Verifique o tratamento de erros.' + colors.reset);
  }
}

// Atualizar dados do servidor
async function updateData() {
  try {
    const response = await fetch('http://localhost:5175/metrics');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    metrics = data.metrics;
    errors = data.errors;
    console.log(colors.green + '✓ Dados atualizados com sucesso' + colors.reset);
  } catch (error) {
    console.error(colors.red + 'Erro ao atualizar dados:', error.message + colors.reset);
  }
}

// Processar comandos
async function processCommand(command) {
  clearScreen();
  showHeader();

  switch(command.toLowerCase()) {
    case '1':
      showMetrics();
      break;
    case '2':
      showErrors();
      break;
    case '3':
      // Tela já foi limpa
      break;
    case '4':
      showAnalysis();
      break;
    case '5':
      await updateData();
      break;
    case 'q':
      console.log(colors.yellow + 'Encerrando monitor...' + colors.reset);
      process.exit(0);
    default:
      console.log(colors.red + 'Comando inválido' + colors.reset);
  }

  showMenu();
}

// Inicialização
clearScreen();
showHeader();
showMenu();

// Atualizar dados iniciais
updateData();

// Processar input do usuário
rl.on('line', (input) => {
  processCommand(input);
});

// Atualizar dados periodicamente
setInterval(updateData, 5000);

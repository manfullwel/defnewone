import { createServer } from 'http';

// Criar servidor HTTP
const server = createServer((req, res) => {
  // Adicionar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Lidar com POST de métricas
  if (req.method === 'POST' && req.url === '/metrics') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.type === 'metric') {
          metrics.push(data.data);
          if (metrics.length > 1000) metrics.shift();
        } else if (data.type === 'error') {
          errors.push(data.data);
          if (errors.length > 1000) errors.shift();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid data format' }));
      }
    });
    return;
  }

  // Lidar com GET de métricas
  if (req.method === 'GET' && req.url === '/metrics') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ metrics, errors }));
    return;
  }

  // Rota padrão
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Monitor Server Running');
});

// Armazenar métricas e erros
const metrics = [];
const errors = [];

// Iniciar servidor
const PORT = process.env.PORT || 5175;
server.listen(PORT, () => {
  console.log(`🚀 Servidor de monitoramento iniciado na porta ${PORT}`);
  console.log('📊 Abra http://localhost:5175/metrics para ver as métricas');
});

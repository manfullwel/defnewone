import { WebSocketServer } from 'ws';
import { createServer } from 'vite';
import type { ViteDevServer } from 'vite';

export async function createMonitorServer() {
  const vite = await createServer({
    server: { port: 5175 }
  });

  const wss = new WebSocketServer({ server: vite.httpServer });
  
  const clients = new Set();

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  // Função para transmitir métricas para todos os clientes
  const broadcast = (data: any) => {
    clients.forEach(client => {
      if (client.readyState === 1) { // OPEN
        client.send(JSON.stringify(data));
      }
    });
  };

  // Middleware para interceptar métricas e erros
  vite.middlewares.use((req, res, next) => {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks: Buffer[] = [];

    res.write = function(chunk: any) {
      chunks.push(Buffer.from(chunk));
      return oldWrite.apply(res, arguments as any);
    };

    res.end = function(chunk: any) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }

      // Registrar métrica de resposta
      const responseTime = res.getHeader('X-Response-Time');
      if (responseTime) {
        broadcast({
          type: 'metric',
          data: {
            name: `${req.method}-${req.url}`,
            duration: Number(responseTime),
            timestamp: Date.now(),
            type: 'api'
          }
        });
      }

      oldEnd.apply(res, arguments as any);
    };

    next();
  });

  return {
    vite,
    wss,
    broadcast
  };
}

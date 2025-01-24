import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Função para registrar logs
async function logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    const logPath = path.join(__dirname, 'security.log');
    
    try {
        await fs.appendFile(logPath, logMessage);
    } catch (error) {
        console.error('Erro ao escrever log:', error);
    }
}

// Middleware para interceptar e bloquear elementos Lovable
app.use(async (req, res, next) => {
    const url = req.url.toLowerCase();
    if (url.includes('lovable')) {
        await logToFile(`Tentativa de acesso bloqueada: ${req.url} - IP: ${req.ip}`);
        return res.status(403).send('Acesso negado');
    }
    next();
});

// Middleware para servir arquivos estáticos
app.use(express.static('docs'));

// Middleware para modificar respostas HTML
app.use(async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = async function(body) {
        if (typeof body === 'string' && body.includes('<!DOCTYPE html>')) {
            // Bloqueia elementos Lovable no HTML
            body = body.replace(/<[^>]*(?:lovable|Lovable)[^>]*>/g, '<!-- Elemento bloqueado -->');
            
            // Remove atributos relacionados ao Lovable
            body = body.replace(/(?:data-lovable|id="lovable[^"]*"|class="lovable[^"]*")/g, '');
            
            await logToFile(`Conteúdo HTML sanitizado - URL: ${req.url}`);
        }
        originalSend.call(this, body);
    };
    
    next();
});

// Rota para o proxy demo
app.get('/.netlify/functions/proxy-demo', async (req, res) => {
    await logToFile('Requisição ao proxy demo');
    res.redirect('/demo-secure.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    logToFile('Servidor iniciado');
});

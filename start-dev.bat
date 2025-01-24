@echo off
echo Iniciando ambiente de desenvolvimento...

echo Iniciando servidor de monitoramento...
start "Monitor Server" cmd /k "cd monitor && node server.js"

echo Iniciando aplicação...
start "Development Server" cmd /k "npm run dev"

echo Iniciando cliente de monitoramento...
start "Monitor Client" cmd /k "cd monitor && node cli.js"

echo Ambiente de desenvolvimento iniciado!
echo Pressione qualquer tecla para encerrar todos os processos...
pause

echo Encerrando processos...
taskkill /F /FI "WindowTitle eq Monitor Server*" /T
taskkill /F /FI "WindowTitle eq Development Server*" /T
taskkill /F /FI "WindowTitle eq Monitor Client*" /T

@echo off
echo Iniciando ambiente de produção...

echo Verificando build...
if not exist "dist" (
    echo Build não encontrado! Execute build-prod.bat primeiro.
    pause
    exit /b 1
)

echo Iniciando servidor de monitoramento...
start "Monitor Server" cmd /k "cd monitor && node server.js"

echo Iniciando servidor de produção...
start "Production Server" cmd /k "npm run preview"

echo Iniciando cliente de monitoramento...
start "Monitor Client" cmd /k "cd monitor && node cli.js"

echo Ambiente de produção iniciado!
echo Pressione qualquer tecla para encerrar todos os processos...
pause

echo Encerrando processos...
taskkill /F /FI "WindowTitle eq Monitor Server*" /T
taskkill /F /FI "WindowTitle eq Production Server*" /T
taskkill /F /FI "WindowTitle eq Monitor Client*" /T

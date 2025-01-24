@echo off
echo Iniciando build de produção...

echo Executando verificações...
call npm run type-check
if errorlevel 1 goto error

call npm run lint
if errorlevel 1 goto error

echo Gerando build de produção...
call npm run build
if errorlevel 1 goto error

echo Build concluído com sucesso!
goto end

:error
echo Erro durante o build!
pause
exit /b 1

:end
echo Build está pronto em ./dist
pause

@echo off
echo Limpando instalação...

echo Removendo node_modules...
rmdir /s /q node_modules

echo Removendo package-lock.json...
del /f /q package-lock.json

echo Limpando cache do npm...
npm cache clean --force

echo Instalando dependências...
npm install --legacy-peer-deps

echo Instalação concluída!
pause

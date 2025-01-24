@echo off
echo Forçando limpeza de arquivos bloqueados...

echo Matando processos que podem estar bloqueando arquivos...
taskkill /F /IM node.exe
taskkill /F /IM npm.cmd

echo Removendo arquivos bloqueados...
rmdir /s /q node_modules\@esbuild
rmdir /s /q node_modules\@rollup
rmdir /s /q node_modules\@swc

echo Removendo node_modules...
rmdir /s /q node_modules

echo Removendo package-lock.json...
del /f /q package-lock.json

echo Limpando cache do npm...
npm cache clean --force

echo Instalando dependências...
npm install --no-package-lock --force

echo Instalação concluída!
pause

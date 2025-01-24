@echo off
echo Instalando dependências essenciais...

echo Instalando Vite globalmente...
call npm install -g vite

echo Instalando dependências do projeto...
call npm install vite @vitejs/plugin-react --save-dev
call npm install react react-dom @types/react @types/react-dom --save

echo Instalando outras dependências...
call npm install

echo Instalação concluída!
echo.
echo Agora você pode executar:
echo npm run dev
pause

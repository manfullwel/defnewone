# Guia de Deploy e Configuração

Este guia explica como configurar e fazer deploy do sistema usando serviços gratuitos.

## 1. Configuração do Google Sheets

### 1.1 Criar Projeto no Google Cloud
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a API do Google Sheets
4. Crie credenciais (OAuth 2.0)
5. Baixe o arquivo `credentials.json`

### 1.2 Configurar Planilha
1. Crie uma nova planilha no Google Sheets
2. Compartilhe com a conta de serviço criada
3. Copie o ID da planilha (da URL)
4. Atualize `SPREADSHEET_ID` em `google_sheets_api.py`

## 2. Deploy do Backend (Heroku)

### 2.1 Preparação
1. Crie uma conta no [Heroku](https://heroku.com)
2. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Faça login:
```bash
heroku login
```

### 2.2 Deploy
1. Crie um novo app:
```bash
heroku create seu-app-nome
```

2. Configure as variáveis de ambiente:
```bash
heroku config:set GOOGLE_CREDENTIALS='conteúdo-do-credentials.json'
heroku config:set SPREADSHEET_ID='seu-spreadsheet-id'
```

3. Faça o deploy:
```bash
git push heroku main
```

## 3. Deploy do Frontend (Netlify)

### 3.1 Preparação
1. Crie uma conta no [Netlify](https://netlify.com)
2. Instale o Netlify CLI:
```bash
npm install -g netlify-cli
```

### 3.2 Deploy
1. Build do projeto:
```bash
cd frontend
npm run build
```

2. Deploy:
```bash
netlify deploy --prod
```

## 4. Configuração Final

### 4.1 Variáveis de Ambiente
1. No Netlify, configure:
   - `REACT_APP_API_URL`: URL do seu app Heroku

2. No Heroku, configure:
   - `CORS_ORIGIN`: URL do seu site Netlify

### 4.2 Domínio Personalizado (Opcional)
1. No Netlify:
   - Settings > Domain Management
   - Add custom domain

2. No Heroku:
   - Settings > Domains
   - Add domain

## 5. Uso Contínuo

### 5.1 Limites Gratuitos
- **Heroku**:
  - 550 horas/mês
  - Dorme após 30 min inativo
  - 512MB RAM

- **Netlify**:
  - 100GB bandwidth/mês
  - 300 minutos build/mês
  - Deploy ilimitado

- **Google Sheets API**:
  - 300 requisições/minuto
  - 60 requisições/usuário/minuto

### 5.2 Boas Práticas
1. **Cache**:
   - Implemente cache no frontend
   - Reduza chamadas à API

2. **Otimização**:
   - Minimize dados transferidos
   - Use paginação quando possível

3. **Monitoramento**:
   - Configure alertas no Heroku
   - Monitore uso da API

## 6. Manutenção

### 6.1 Atualizações
1. Backend:
```bash
git push heroku main
```

2. Frontend:
```bash
npm run build
netlify deploy --prod
```

### 6.2 Logs
1. Heroku:
```bash
heroku logs --tail
```

2. Netlify:
   - Deploy logs no dashboard

## 7. Troubleshooting

### 7.1 Problemas Comuns
1. **API Offline**:
   - Verifique logs do Heroku
   - Reinicie dyno se necessário

2. **Dados Desatualizados**:
   - Verifique permissões da planilha
   - Teste API localmente

3. **Erros de CORS**:
   - Verifique configurações de CORS
   - Confirme URLs corretas

### 7.2 Suporte
- Heroku: [Status](https://status.heroku.com)
- Netlify: [Status](https://www.netlifystatus.com)
- Google Sheets: [Dashboard](https://console.cloud.google.com)

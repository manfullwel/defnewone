# Sistema de Análise de Demandas

Dashboard profissional para análise e monitoramento de demandas, com foco em métricas de desempenho e insights em tempo real.

[![Deploy to GitHub Pages](https://github.com/manfullwel/ddemandreport/actions/workflows/deploy.yml/badge.svg)](https://github.com/manfullwel/ddemandreport/actions/workflows/deploy.yml)

## 🔗 Links Importantes

- **[Dashboard](https://manfullwel.github.io/ddemandreport/)**: Acesse o dashboard em funcionamento
- **[Repositório](https://github.com/manfullwel/ddemandreport)**: Código fonte do projeto
- **[Relatório Diário](https://manfullwel.github.io/ddemandreport/)**: Relatório atualizado diariamente

## 🌐 Páginas do Projeto

| Página | Link | Descrição |
|--------|------|-----------|
| 📊 **Dashboard** | [Ver Dashboard](https://manfullwel.github.io/ddemandreport/) | Dashboard principal |
| 📝 **Relatório Diário** | [Ver Relatório](https://manfullwel.github.io/ddemandreport/) | Relatório atualizado diariamente |
| 💻 **Código Fonte** | [GitHub](https://github.com/manfullwel/ddemandreport) | Repositório do projeto |

## 👤 Autor

**Igor Soares (manfullwel)**

* GitHub: [@manfullwel](https://github.com/manfullwel)

## 🙏 Agradecimentos

Um agradecimento especial a todos que contribuíram para este projeto:

* Ediene F.
* Nuno S.
* Victor A.
* Victor C.
* Pablo P.

Suas contribuições e inspirações foram fundamentais para o desenvolvimento deste projeto.

## 👥 Colaboradores

[![Equipe de Desenvolvimento](https://github.com/manfullwel/ddemandreport/blob/main/docs/images/equipe.png)](https://github.com/manfullwel/ddemandreport/blob/main/docs/images/equipe.png)
- **Equipe de Desenvolvimento**: Implementação e Testes

## 🔧 Configuração do Google Sheets

Para configurar a integração com o Google Sheets, siga estes passos:

1. **Obtenha as Credenciais**:
   - Acesse o [Google Cloud Console](https://console.cloud.google.com)
   - Crie um novo projeto ou selecione um existente
   - Ative a Google Sheets API
   - Crie uma chave de API em "Credenciais"

2. **Configure o Projeto**:
   - Copie o arquivo `config.example.js` para `config.js`
   - Adicione sua chave API no arquivo `config.js`
   - Adicione o ID da sua planilha (encontrado na URL)
   - Ajuste o range conforme sua estrutura de dados

3. **Estrutura da Planilha**:
   A planilha do Google Sheets deve ter as seguintes colunas:

| Coluna | Descrição | Valores Aceitos |
|--------|-----------|-----------------|
| Colaborador | Nome do colaborador responsável | Texto |
| Data | Data do registro | Data (DD/MM/YYYY) |
| Status | Estado atual da demanda | RESOLVIDOS<br>PENDENTE ATIVO<br>PENDENTE RECEPTIVO<br>PRIORIDADE<br>PRIORIDADE TOTAL<br>SOMA DAS PRIORIDADES<br>ANÁLISE<br>ANÁLISE DO DIA<br>RECEPTIVO<br>QUITADO CLIENTE<br>QUITADO<br>APROVADOS |
| Tipo | Tipo de atendimento | Receptivo, Ativo |
| Equipe | Equipe responsável | JULIO, LEANDROADRIANO |

> ⚠️ **Importante**: 
> - Mantenha exatamente os mesmos nomes de colunas e valores aceitos para garantir o funcionamento correto do dashboard
> - Os status devem ser escritos exatamente como mostrado acima, incluindo maiúsculas e acentuação
> - A classificação correta do status é essencial para a geração precisa dos relatórios

4. **Compartilhamento**:
   - Certifique-se de que a planilha está compartilhada com permissão de leitura

## 📱 Versão Mobile (Em Desenvolvimento)

Estamos desenvolvendo uma versão mobile completa do Sistema de Análise de Demandas, que estará disponível para iOS e Android. O aplicativo oferecerá todas as funcionalidades do dashboard web em uma interface otimizada para dispositivos móveis.

### Preview do App Mobile

```
┌─────────── Análise de Demandas ───────────┐
│                                           │
│    ┌───────── Status Atual ──────────┐    │
│    │ ✅ Resolvidos Hoje: 270        │    │
│    │ 📊 Taxa de Resolução: 85%      │    │
│    └─────────────────────────────────┘    │
│                                           │
│    ┌─────── Equipe Julio ───────────┐    │
│    │ Resolvidos: 140               │    │
│    │ [██████████] 85%              │    │
│    │                               │    │
│    │ Pendentes: 102                │    │
│    │ [████████──] 70%              │    │
│    └─────────────────────────────────┘    │
│                                           │
│    ┌── Equipe Adriano/Leandro ────┐    │
│    │ Resolvidos: 130               │    │
│    │ [█████████─] 80%              │    │
│    │                               │    │
│    │ Pendentes: 161                │    │
│    │ [███████───] 60%              │    │
│    └─────────────────────────────────┘    │
│                                           │
│    ┌────── Menu Rápido ─────────┐    │
│    │ [📊] Dashboard  [📈] Gráficos │    │
│    │ [👥] Equipes   [⚙️] Config   │    │
│    └─────────────────────────────────┘    │
│                                           │
└───────────────────────────────────────────┘
```

### Recursos do App Mobile

- **Interface Adaptativa**: Design responsivo que se ajusta a diferentes tamanhos de tela
- **Gestos Intuitivos**: Navegação por gestos para uma experiência fluida
- **Modo Offline**: Acesso aos dados mesmo sem conexão
- **Notificações Push**: Alertas em tempo real sobre atualizações importantes
- **Biometria**: Autenticação segura por impressão digital ou Face ID
- **Widgets**: Visualização rápida das métricas principais na tela inicial
- **Dark Mode**: Suporte a tema escuro para melhor visualização

### Tecnologias Mobile

- **Frontend Mobile**:
  - React Native
  - Expo
  - Native Base UI
  - React Navigation
  
- **Recursos Nativos**:
  - Notificações Push
  - Armazenamento Local
  - Biometria
  - Geolocalização
  - Câmera (para scan de QR Code)

### Screenshots do App (Preview)

<div align="center">
<img src="docs/images/mobile/dashboard.png" alt="Dashboard Mobile" width="250"/>
<img src="docs/images/mobile/charts.png" alt="Gráficos Mobile" width="250"/>
<img src="docs/images/mobile/team.png" alt="Equipes Mobile" width="250"/>
</div>

### Status do Desenvolvimento

- [x] Protótipo de Interface
- [x] Arquitetura do App
- [x] Implementação do Dashboard
- [ ] Integração com API
- [ ] Testes Beta
- [ ] Lançamento na App Store
- [ ] Lançamento na Play Store

## 🌟 Inspiração do Projeto

Este projeto foi inspirado na necessidade de ter uma visão clara e objetiva das demandas diárias da equipe. As principais inspirações foram:

- **Dashboards Modernos**: Design inspirado em ferramentas como Tableau e Power BI
- **Metodologias Ágeis**: Kanban e Scrum para visualização de fluxo de trabalho
- **Análise de Dados**: Técnicas de data visualization e analytics

## 🚀 Funcionalidades

### 1. Dashboard Interativo

#### Métricas em Tempo Real
- Métricas atualizadas em tempo real
- Gráficos dinâmicos e interativos
- Comparativo entre equipes
- Visualização de pendências

### 2. Análise de Métricas

#### Análise de Desempenho
- KPIs individuais e por equipe
- Distribuição de pendências
- Comparativos entre grupos
- Totalizadores gerais

### 3. Insights Automáticos

#### Relatórios Diários
- Resumo diário por equipe
- Distribuição de demandas
- Métricas de produtividade
- Indicadores de desempenho

## 📊 Visualizações

O dashboard inclui as seguintes visualizações:

1. **Comparativo de Desempenho**
   - Resolvidos
   - Pendentes Receptivo
   - Pendentes Ativo
   - Análises do Dia

2. **Distribuição de Pendências**
   - Pendentes Receptivo por equipe
   - Pendentes Ativo por equipe

3. **Totalizadores**
   - Quitados
   - Quitados Cliente
   - Quitado Aprovado
   - Aprovados
   - Aprovados Duplos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **Visualização**: Python (Matplotlib, Seaborn)
- **Análise de Dados**: Pandas, NumPy
- **Estilo**: CSS Grid, Flexbox

## 📈 Exemplo de Relatório

```
RELATÓRIO GERAL DE DEMANDAS (10/01/2025)

🔵 Equipe Julio
- Resolvidos: 140
- Pendentes Receptivo: 102
- Pendentes Ativo: 701
- Análises do Dia: 3

🔵 Equipe Adriano/Leandro
- Resolvidos: 130
- Pendentes Receptivo: 161
- Pendentes Ativo: 482
- Análises do Dia: 20

🎯 Totalizadores
- Quitados: 26
- Quitados Cliente: 1
- Quitado Aprovado: 0
- Aprovados: 91
- Aprovados Duplos: 6
```

## 🔄 Atualizações Recentes

- Novo design mais profissional e moderno
- Gráficos otimizados para melhor visualização
- Métricas mais relevantes em destaque
- Layout responsivo e adaptativo
- Cores e estilos padronizados

## 📱 Responsividade

O dashboard é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## 🔜 Próximas Atualizações

1. Filtros avançados por período
2. Exportação de relatórios em PDF
3. Modo escuro
4. Alertas personalizados
5. Dashboard em tempo real

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Dashboard de Análise de Demandas

Um sistema completo para análise de demandas com integração entre Google Sheets e dashboard local, oferecendo visualização em tempo real e sincronização automática de dados.

![Dashboard Preview](docs/images/dashboard_preview.png)

## 🌟 Funcionalidades

- **Dashboard Interativo**
  - Visualização de métricas em tempo real
  - Gráficos comparativos entre equipes
  - Tabelas de resolução diária
  - Atualização automática dos dados

- **Integração com Google Sheets**
  - Sincronização bidirecional
  - Validação de dados em tempo real
  - Menu personalizado para controle
  - Notificações de status

- **Análise de Dados**
  - Métricas por equipe
  - Comparação de desempenho
  - Histórico de resoluções
  - Tendências temporais

## 🚀 Como Usar

### Pré-requisitos

- Python 3.8+
- Google Account
- ngrok account (gratuita)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/ddemandreport.git
   cd ddemandreport
   ```

2. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure o Google Sheets**
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com)
   - Habilite a Google Sheets API
   - Baixe as credenciais (`credentials.json`)
   - Coloque o arquivo na pasta raiz do projeto

4. **Configure o ngrok**
   - [Baixe e instale o ngrok](https://ngrok.com/download)
   - Autentique com seu token:
     ```bash
     ngrok config add-authtoken seu-token-aqui
     ```

### Executando o Sistema

1. **Inicie o Servidor API**
   ```bash
   python scripts/api_server.py
   ```

2. **Inicie o Dashboard**
   ```bash
   python scripts/dashboard_comparativo.py
   ```

3. **Crie o Túnel ngrok**
   ```bash
   ngrok http 8052
   ```

4. **Configure o Google Sheets**
   - Abra sua planilha do Google Sheets
   - Vá em `Extensões > Apps Script`
   - Cole o código de `google_sheets_script.gs`
   - Configure a URL do ngrok no script
   - Salve e autorize o script

## 📊 Estrutura do Projeto

```
ddemandreport/
├── docs/                    # Documentação
│   └── images/             # Imagens da documentação
├── scripts/
│   ├── api_server.py       # Servidor API
│   ├── dashboard_comparativo.py  # Dashboard principal
│   ├── google_sheets_sync.py    # Sincronização com Google Sheets
│   └── google_sheets_script.gs  # Script para Google Apps Script
├── requirements.txt        # Dependências Python
└── README.md              # Documentação principal
```

## 🔧 Configuração do Dashboard

### Configuração do Google Sheets

1. **Estrutura da Planilha**
   - Planilha "DEMANDAS JULIO"
   - Planilha "DEMANDA LEANDROADRIANO"
   - Colunas necessárias:
     - STATUS (PENDENTE, PRIORIDADE, RESOLVIDO, etc.)
     - DATA
     - RESPONSÁVEL
     - DESCRIÇÃO

2. **Menu do Dashboard**
   - **Atualizar Dashboard**: Força sincronização
   - **Configurar URL do ngrok**: Define URL de conexão

### Validações de Dados

- Status válidos:
  - PENDENTE
  - PRIORIDADE
  - RESOLVIDO
  - ANÁLISE
  - RECEPTIVO
  - PRIORIDADE TOTAL

## 📈 Funcionalidades do Dashboard

### Métricas Principais

- Total de demandas resolvidas por equipe
- Média diária de resoluções
- Comparativo entre equipes
- Distribuição por status

### Visualizações

- Gráfico de barras comparativo
- Timeline de resoluções
- Tabelas de resolução diária
- Distribuição por tipo de demanda

## 🔄 Pipeline de Integração Contínua

### GitHub Actions

```yaml
name: Dashboard CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    - name: Run tests
      run: |
        python -m pytest tests/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to production
      run: |
        echo "Deploy steps here"
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📧 Contato

Igor Soares - [@manfullwel](https://github.com/manfullwel)

Link do Projeto: [https://github.com/manfullwel/ddemandreport](https://github.com/manfullwel/ddemandreport)

## 📸 Screenshots Automáticos

O dashboard possui um sistema automatizado de captura de screenshots que é executado a cada 6 horas. Isso garante que a documentação sempre tenha imagens atualizadas do sistema. Os screenshots incluem:

- Visão geral do dashboard
- Comparação entre equipes
- Distribuição de demandas
- Métricas diárias

Os screenshots são salvos automaticamente na pasta `docs/screenshots` e são atualizados no GitHub Pages.

Para capturar screenshots manualmente, você pode:

1. Iniciar o dashboard:
```bash
python scripts/api_server.py
```

2. Em outro terminal, executar o script de captura:
```bash
python scripts/capture_screenshots.py
```

## 📚 Manual de Instalação

Para uma instalação passo a passo detalhada, com instruções para usuários iniciantes, acesse nosso [Manual Interativo](https://manfullwel.github.io/ddemandreport/manual.html).

Este manual inclui:
- ✅ Guia visual passo a passo
- ⚠️ Alertas importantes em cada etapa
- 🔒 Instruções detalhadas para configuração do Google Cloud
- 📝 Checklist de requisitos
- 🎯 Confirmação de sucesso em cada etapa
# Tutorial do Sistema de Análise de Demandas

Este tutorial vai te guiar passo a passo no uso do sistema de análise de demandas.

## 1. Primeiros Passos

### 1.1 Instalação

1. **Backend (Python/Flask)**
```bash
# Instalar dependências
pip install -r requirements.txt

# Iniciar API
python scripts/api.py
```

2. **Frontend (React)**
```bash
# Entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Iniciar aplicação
npm start
```

### 1.2 Acessando o Sistema

1. Abra seu navegador
2. Acesse `http://localhost:3000`
3. Você verá a página inicial do dashboard

## 2. Usando o Dashboard

### 2.1 Visão Geral
- **Cards de Métricas**: No topo, mostrando:
  - Total de demandas
  - Demandas resolvidas
  - Taxa de resolução

- **Gráfico de Evolução**: 
  - Mostra tendências diárias
  - Hover para ver detalhes
  - Zoom disponível

### 2.2 Análise por Grupo
- Visualize métricas por grupo
- Compare desempenho entre grupos
- Analise taxas de resolução

### 2.3 Análise por Responsável
- Performance individual
- Quantidade de demandas
- Tempo médio de resolução

## 3. Quitação de Demandas

### 3.1 Acessando a Página
1. Clique em "Quitação" no menu superior
2. Visualize lista de demandas

### 3.2 Quitando Demandas
1. Localize a demanda desejada
2. Clique no botão "Quitar"
3. Confirme a ação
4. Observe o feedback visual

### 3.3 Filtros e Busca
- Use filtros por status
- Busque por responsável
- Filtre por data

## 4. Relatórios e Análises

### 4.1 Gerando Relatórios
```bash
python scripts/analise_dados.py
```

### 4.2 Tipos de Relatórios
1. **Excel (analise_demandas.xlsx)**
   - Dados brutos
   - Análise diária
   - Análise semanal
   - Análise mensal
   - Análise por responsável
   - Análise por grupo

2. **Insights (INSIGHTS.md)**
   - Performance geral
   - Top performers
   - Análise por grupo
   - Tempos médios

### 4.3 Interpretando os Dados

#### Métricas Principais
- **Taxa de Resolução**: % de demandas resolvidas
- **Tempo Médio**: Horas até resolução
- **Volume**: Quantidade de demandas

#### Análise Temporal
- **Diária**: Evolução no dia
- **Semanal**: Tendências semanais
- **Mensal**: Visão macro

## 5. Dicas e Boas Práticas

### 5.1 Performance
- Atualize dados regularmente
- Use filtros para focar
- Monitore tendências

### 5.2 Gestão
- Priorize demandas antigas
- Balance carga de trabalho
- Acompanhe métricas diárias

### 5.3 Análise
- Compare períodos
- Identifique padrões
- Use insights para decisões

## 6. Solução de Problemas

### 6.1 Problemas Comuns
1. **API não responde**
   - Verifique se api.py está rodando
   - Confira porta 5000

2. **Dashboard não atualiza**
   - Recarregue a página
   - Verifique conexão

3. **Dados incorretos**
   - Valide planilha fonte
   - Verifique datas

### 6.2 Suporte
- Consulte documentação
- Verifique logs
- Contate administrador

## 7. Próximos Passos

### 7.1 Recursos Avançados
- Exportação personalizada
- Dashboards customizados
- Análises preditivas

### 7.2 Integrações
- Sistemas externos
- Automações
- Notificações

## 8. Conclusão

Este sistema foi projetado para simplificar a análise e gestão de demandas. Use este tutorial como referência e explore todas as funcionalidades disponíveis para maximizar sua eficiência.

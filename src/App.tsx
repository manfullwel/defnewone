import React from 'react';
import './App.css';

const mockData = {
  titulo: 'Relatório de Análise Diária',
  arquivo: 'Relatorio_Analise_Diaria.csv',
  data_atual: '2025-01-13',
  grupos: [
    {
      nome: 'Grupo Julio',
      funcionarios: [
        {
          nome: 'Maria Silva',
          contratos_resolvidos: 15,
          pendentes_receptivo: 5,
          pendentes_ativo: 3,
          quitados: 8,
          aprovados: 7,
          ultimas_alteracoes: [
            {
              contrato: 123456,
              campo: 'Status_Contrato',
              valor_antigo: 'Pendente',
              valor_novo: 'Quitado',
              data: '2025-01-13 14:30',
            },
          ],
        },
        {
          nome: 'João Santos',
          contratos_resolvidos: 12,
          pendentes_receptivo: 4,
          pendentes_ativo: 2,
          quitados: 6,
          aprovados: 6,
          ultimas_alteracoes: [
            {
              contrato: 234567,
              campo: 'Status_Contrato',
              valor_antigo: 'Analisar',
              valor_novo: 'Aprovado',
              data: '2025-01-13 15:45',
            },
          ],
        },
      ],
      estatisticas: {
        total_resolvidos: 27,
        total_pendentes_receptivo: 9,
        total_pendentes_ativo: 5,
        total_quitados: 14,
        total_aprovados: 13,
      },
    },
    {
      nome: 'Grupo Leandro e Adriano',
      funcionarios: [
        {
          nome: 'Ana Oliveira',
          contratos_resolvidos: 18,
          pendentes_receptivo: 6,
          pendentes_ativo: 4,
          quitados: 10,
          aprovados: 8,
          ultimas_alteracoes: [
            {
              contrato: 345678,
              campo: 'Status_Contrato',
              valor_antigo: 'Pendente',
              valor_novo: 'Quitado',
              data: '2025-01-13 16:20',
            },
          ],
        },
        {
          nome: 'Carlos Pereira',
          contratos_resolvidos: 14,
          pendentes_receptivo: 5,
          pendentes_ativo: 3,
          quitados: 7,
          aprovados: 7,
          ultimas_alteracoes: [
            {
              contrato: 456789,
              campo: 'Banco_Recebedor',
              valor_antigo: 'Santander',
              valor_novo: 'Itaú',
              data: '2025-01-13 17:15',
            },
          ],
        },
      ],
      estatisticas: {
        total_resolvidos: 32,
        total_pendentes_receptivo: 11,
        total_pendentes_ativo: 7,
        total_quitados: 17,
        total_aprovados: 15,
      },
    },
  ],
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">{mockData.titulo}</h1>
          <p className="text-center text-gray-600 mt-2">Arquivo: {mockData.arquivo}</p>
          <p className="text-center text-gray-500 mt-1">Data: {mockData.data_atual}</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {mockData.grupos.map((grupo, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">{grupo.nome}</h2>
                <div className="mt-2 grid grid-cols-5 gap-4">
                  <div className="text-white">
                    <span className="text-sm opacity-80">Resolvidos</span>
                    <p className="text-2xl font-bold">{grupo.estatisticas.total_resolvidos}</p>
                  </div>
                  <div className="text-yellow-200">
                    <span className="text-sm opacity-80">Pendentes Receptivo</span>
                    <p className="text-2xl font-bold">
                      {grupo.estatisticas.total_pendentes_receptivo}
                    </p>
                  </div>
                  <div className="text-orange-200">
                    <span className="text-sm opacity-80">Pendentes Ativo</span>
                    <p className="text-2xl font-bold">{grupo.estatisticas.total_pendentes_ativo}</p>
                  </div>
                  <div className="text-green-200">
                    <span className="text-sm opacity-80">Quitados</span>
                    <p className="text-2xl font-bold">{grupo.estatisticas.total_quitados}</p>
                  </div>
                  <div className="text-purple-200">
                    <span className="text-sm opacity-80">Aprovados</span>
                    <p className="text-2xl font-bold">{grupo.estatisticas.total_aprovados}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {grupo.funcionarios.map((funcionario, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{funcionario.nome}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {funcionario.contratos_resolvidos} contratos hoje
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <span className="text-sm text-yellow-600">Pendentes Receptivo</span>
                          <p className="text-xl font-semibold text-yellow-700">
                            {funcionario.pendentes_receptivo}
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <span className="text-sm text-orange-600">Pendentes Ativo</span>
                          <p className="text-xl font-semibold text-orange-700">
                            {funcionario.pendentes_ativo}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <span className="text-sm text-green-600">Quitados</span>
                          <p className="text-xl font-semibold text-green-700">
                            {funcionario.quitados}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="text-sm text-purple-600">Aprovados</span>
                          <p className="text-xl font-semibold text-purple-700">
                            {funcionario.aprovados}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Última Alteração</h4>
                        {funcionario.ultimas_alteracoes.map((alteracao, altIdx) => (
                          <div key={altIdx} className="bg-gray-50 p-3 rounded-lg text-sm">
                            <div className="flex justify-between text-gray-600">
                              <span>Contrato #{alteracao.contrato}</span>
                              <span>{alteracao.data}</span>
                            </div>
                            <div className="mt-1 text-gray-800">
                              <span className="font-medium">{alteracao.campo}:</span>{' '}
                              <span className="text-red-600">{alteracao.valor_antigo}</span>{' '}
                              <span className="text-gray-400">→</span>{' '}
                              <span className="text-green-600">{alteracao.valor_novo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-8 text-center text-gray-600">
          <p>Última atualização: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

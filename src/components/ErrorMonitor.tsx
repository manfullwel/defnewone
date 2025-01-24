import React, { useEffect, useState } from 'react';
import { useErrorHandler } from '../utils/errorHandler';

export const ErrorMonitor: React.FC = () => {
  const { getErrorLogs, clearErrorLogs } = useErrorHandler();
  const [isVisible, setIsVisible] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const logs = getErrorLogs();
      setErrorCount(logs.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClear = () => {
    clearErrorLogs();
    setErrorCount(0);
  };

  return (
    <>
      {/* Botão flutuante com contador de erros */}
      <button
        onClick={toggleVisibility}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${
          errorCount > 0 ? 'bg-red-600' : 'bg-green-600'
        } text-white hover:opacity-90 transition-all`}
      >
        {errorCount > 0 ? `🚨 ${errorCount}` : '✅'}
      </button>

      {/* Painel de monitoramento */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-semibold">Monitor de Erros</h2>
              <div className="space-x-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Limpar
                </button>
                <button
                  onClick={toggleVisibility}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Fechar
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
              {getErrorLogs().map((log, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                      {log.type}
                    </span>
                  </div>
                  <p className="text-red-600 font-medium mb-2">{log.message}</p>
                  {log.autoCorrection && (
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-green-700 text-sm">🔧 {log.autoCorrection}</p>
                    </div>
                  )}
                  {log.stack && (
                    <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                      {log.stack}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

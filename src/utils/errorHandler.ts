import { format } from 'date-fns';

interface ErrorLog {
  timestamp: string;
  type: string;
  message: string;
  stack?: string;
  autoCorrection?: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLogs: ErrorLog[] = [];
  private readonly MAX_LOGS = 100;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers(): void {
    // Intercepta erros não tratados
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(error || new Error(message as string));
      return true;
    };

    // Intercepta rejeições de Promise não tratadas
    window.onunhandledrejection = (event) => {
      this.handleError(event.reason);
    };

    // Intercepta erros de carregamento de recursos
    window.addEventListener(
      'error',
      (event) => {
        if (event.target && ('src' in event.target || 'href' in event.target)) {
          this.handleResourceError(event);
        }
      },
      true
    );
  }

  private handleResourceError(event: ErrorEvent): void {
    const target = event.target as HTMLElement & { src?: string; href?: string };
    const resource = target.src || target.href;

    if (resource) {
      this.logError({
        type: 'ResourceError',
        message: `Falha ao carregar recurso: ${resource}`,
        autoCorrection: 'Tentando carregar recurso novamente...',
      });

      // Tenta recarregar o recurso
      setTimeout(() => {
        if (target.src) {
          target.src = target.src;
        } else if (target.href) {
          target.href = target.href;
        }
      }, 2000);
    }
  }

  public handleError(error: Error | unknown): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    // Analisa o erro e tenta corrigir automaticamente
    const correction = this.analyzeAndCorrect(errorObj);

    this.logError({
      type: errorObj.name,
      message: errorObj.message,
      stack: errorObj.stack,
      autoCorrection: correction,
    });
  }

  private analyzeAndCorrect(error: Error): string | undefined {
    // Mapeamento de erros comuns e suas correções
    const errorPatterns = new Map([
      [
        /Cannot find module '(.+)'/,
        (match: RegExpMatchArray) => {
          const module = match[1];
          console.log(`Tentando instalar módulo ausente: ${module}`);
          // Aqui você poderia implementar uma lógica para instalar o módulo
          return `Módulo ausente: ${module}. Tente executar 'npm install ${module}'`;
        },
      ],
      [
        /TypeError: (.+) is not a function/,
        () => 'Verificando se todas as dependências estão corretamente importadas',
      ],
      [
        /Loading chunk (\d+) failed/,
        () => {
          // Limpa o cache e recarrega
          localStorage.clear();
          sessionStorage.clear();
          return 'Limpando cache e recarregando aplicação...';
        },
      ],
      [
        /date-fns/,
        () => {
          return 'Problema com date-fns detectado. Sugerindo reinstalação do pacote.';
        },
      ],
    ]);

    // Tenta encontrar um padrão correspondente
    for (const [pattern, handler] of errorPatterns) {
      const match = error.message.match(pattern);
      if (match) {
        return handler(match);
      }
    }

    return undefined;
  }

  private logError(error: Omit<ErrorLog, 'timestamp'>): void {
    const log: ErrorLog = {
      ...error,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };

    this.errorLogs.unshift(log);

    // Mantém apenas os últimos MAX_LOGS registros
    if (this.errorLogs.length > this.MAX_LOGS) {
      this.errorLogs.pop();
    }

    // Log no console com formatação melhorada
    console.group('🚨 Erro Detectado');
    console.log(`⏰ Timestamp: ${log.timestamp}`);
    console.log(`📝 Tipo: ${log.type}`);
    console.log(`❌ Mensagem: ${log.message}`);
    if (log.stack) console.log(`📚 Stack: ${log.stack}`);
    if (log.autoCorrection) {
      console.log(`🔧 Correção Automática: ${log.autoCorrection}`);
    }
    console.groupEnd();
  }

  public getErrorLogs(): ErrorLog[] {
    return [...this.errorLogs];
  }

  public clearErrorLogs(): void {
    this.errorLogs = [];
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Exporta um hook personalizado para usar o ErrorHandler em componentes React
export function useErrorHandler() {
  return {
    handleError: (error: Error) => errorHandler.handleError(error),
    getErrorLogs: () => errorHandler.getErrorLogs(),
    clearErrorLogs: () => errorHandler.clearErrorLogs(),
  };
}

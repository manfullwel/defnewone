import { errorHandler } from './errorHandler';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  type: 'render' | 'api' | 'interaction' | 'error';
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private observer: PerformanceObserver | null = null;
  private errorCount: number = 0;
  private readonly ERROR_THRESHOLD = 5;
  private readonly PERFORMANCE_THRESHOLD = 1000; // 1 segundo

  private constructor() {
    this.setupObserver();
    this.setupErrorHandler();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupObserver() {
    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.addMetric({
            name: entry.name,
            duration: entry.duration,
            timestamp: Date.now(),
            type: this.getMetricType(entry.entryType)
          });
        });
      });

      this.observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
    } catch (error) {
      errorHandler.handleError(error);
    }
  }

  private setupErrorHandler() {
    window.addEventListener('error', (event) => {
      this.handleError(event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason);
    });
  }

  private handleError(error: Error) {
    this.errorCount++;
    this.addMetric({
      name: error.name,
      duration: 0,
      timestamp: Date.now(),
      type: 'error'
    });

    // Integração com o ErrorHandler existente
    errorHandler.handleError(error);

    if (this.errorCount >= this.ERROR_THRESHOLD) {
      this.notifyDevelopers();
    }
  }

  private getMetricType(entryType: string): PerformanceMetric['type'] {
    switch (entryType) {
      case 'measure':
        return 'render';
      case 'resource':
        return 'api';
      default:
        return 'interaction';
    }
  }

  public startMeasure(name: string) {
    try {
      window.performance.mark(`${name}-start`);
    } catch (error) {
      errorHandler.handleError(error);
    }
  }

  public endMeasure(name: string) {
    try {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
    } catch (error) {
      errorHandler.handleError(error);
    }
  }

  private addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    this.sendMetricToServer(metric);
    
    if (metric.duration > this.PERFORMANCE_THRESHOLD) {
      this.notifySlowPerformance(metric);
    }

    // Manter apenas últimas 1000 métricas
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  private sendMetricToServer(metric: PerformanceMetric) {
    try {
      const ws = new WebSocket('ws://localhost:5175/monitor');
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'metric',
          data: metric
        }));
        ws.close();
      };
    } catch (error) {
      console.error('Erro ao enviar métrica:', error);
    }
  }

  private notifyDevelopers() {
    const errorLogs = errorHandler.getErrorLogs();
    console.error('Múltiplos erros detectados! Notificando equipe de desenvolvimento...', {
      recentErrors: errorLogs.slice(0, 5),
      totalErrors: this.errorCount
    });
    this.errorCount = 0;
  }

  private notifySlowPerformance(metric: PerformanceMetric) {
    console.warn(`Performance crítica detectada: ${metric.name} (${metric.duration}ms)`);
    errorHandler.logError({
      type: 'PerformanceWarning',
      message: `Operação lenta detectada: ${metric.name} (${metric.duration}ms)`,
      autoCorrection: 'Analisando possíveis gargalos de performance...'
    });
  }

  public getMetrics() {
    return this.metrics;
  }

  public async analyzePerformance(): Promise<{
    averageRenderTime: number;
    errorRate: number;
    slowestOperations: PerformanceMetric[];
    recommendations: string[];
  }> {
    const renderMetrics = this.metrics.filter(m => m.type === 'render');
    const averageRenderTime = renderMetrics.length > 0
      ? renderMetrics.reduce((acc, curr) => acc + curr.duration, 0) / renderMetrics.length
      : 0;
    
    const errorRate = this.metrics.length > 0
      ? this.metrics.filter(m => m.type === 'error').length / this.metrics.length
      : 0;
    
    const slowestOperations = [...this.metrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    const recommendations = this.generateRecommendations(averageRenderTime, errorRate, slowestOperations);

    return {
      averageRenderTime,
      errorRate,
      slowestOperations,
      recommendations
    };
  }

  private generateRecommendations(averageRenderTime: number, errorRate: number, slowestOps: PerformanceMetric[]): string[] {
    const recommendations: string[] = [];

    if (averageRenderTime > 100) {
      recommendations.push('⚡ Considere implementar React.memo() ou useMemo() para componentes com renderização pesada');
    }

    if (errorRate > 0.05) {
      recommendations.push('🛡️ Alta taxa de erros detectada. Revise o tratamento de erros e validações');
    }

    const apiSlowOps = slowestOps.filter(op => op.type === 'api');
    if (apiSlowOps.length > 2) {
      recommendations.push('🌐 Múltiplas operações de API lentas detectadas. Considere implementar caching ou otimizar as consultas');
    }

    return recommendations;
  }
}

export default PerformanceMonitor;

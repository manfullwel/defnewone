import { useEffect, useRef } from 'react';
import PerformanceMonitor from '@/utils/PerformanceMonitor';

export function usePerformance(componentName: string) {
  const performanceMonitor = PerformanceMonitor.getInstance();
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    const measureName = `${componentName}-render-${renderCount.current}`;
    
    performanceMonitor.startMeasure(measureName);

    return () => {
      performanceMonitor.endMeasure(measureName);
    };
  });

  const measureOperation = async (operationName: string, operation: () => Promise<any>) => {
    const measureName = `${componentName}-${operationName}`;
    performanceMonitor.startMeasure(measureName);
    
    try {
      const result = await operation();
      return result;
    } finally {
      performanceMonitor.endMeasure(measureName);
    }
  };

  const getPerformanceReport = async () => {
    return await performanceMonitor.analyzePerformance();
  };

  return {
    measureOperation,
    getPerformanceReport
  };
}

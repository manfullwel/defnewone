import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { errorHandler } from './utils/errorHandler';
import './index.css';

// Initialize error handler
const errorHandlerInstance = errorHandler;

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  errorHandlerInstance.logError(error || new Error(String(message)), {
    source,
    line: lineno,
    column: colno,
    type: 'uncaught',
  });
  return false;
};

// Global error handler for unhandled promise rejections
window.onunhandledrejection = (event) => {
  errorHandlerInstance.logError(event.reason, {
    type: 'unhandledRejection',
    promise: event.promise,
  });
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

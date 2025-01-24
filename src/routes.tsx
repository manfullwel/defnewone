import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { TestPage } from './pages/TestPage';
import { RelatorioDiario } from './pages/RelatorioDiario';
import { RelatorioGeral } from './pages/RelatorioGeral';
import { MobileDemo } from './pages/MobileDemo';
import { Demo } from './pages/Demo';
import { AnalisadorArquivos } from './pages/AnalisadorArquivos';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DiagnosticPanel } from '@/components/DiagnosticPanel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Demo />,
    errorElement: <ErrorBoundary><DiagnosticPanel /></ErrorBoundary>,
  },
  {
    path: '/test',
    element: <TestPage />,
    errorElement: <ErrorBoundary><DiagnosticPanel /></ErrorBoundary>,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/relatorio-diario',
    element: <RelatorioDiario />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/relatorio-geral',
    element: <RelatorioGeral />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/mobile',
    element: <MobileDemo />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/analisador',
    element: <AnalisadorArquivos />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/diagnostico',
    element: <DiagnosticPanel />,
    errorElement: <ErrorBoundary />,
  },
]);

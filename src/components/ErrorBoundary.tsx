import React, { Component, ErrorInfo } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorHandler.logError(error, {
      component: 'ErrorBoundary',
      ...errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: '' });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Algo deu errado</AlertTitle>
            <AlertDescription>
              <div className="space-y-2">
                <p>Ocorreu um erro inesperado. Nossa equipe foi notificada.</p>
                {this.state.errorInfo && (
                  <pre className="p-2 bg-secondary text-sm rounded">
                    {this.state.errorInfo}
                  </pre>
                )}
                <Button
                  variant="outline"
                  onClick={this.handleRetry}
                  className="mt-2"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tentar Novamente
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

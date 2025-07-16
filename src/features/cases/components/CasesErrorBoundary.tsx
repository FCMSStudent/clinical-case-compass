
import { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';
import { Button } from '@/shared/components/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CasesErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('[CasesErrorBoundary] Error caught:', error);
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CasesErrorBoundary] Error details:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <CardTitle className="text-white">Cases Page Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white/70 mb-4">
                There was an error loading the cases page. This might be due to database connection issues or missing data.
              </p>
              <div className="space-y-2">
                <Button onClick={this.handleRetry} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <p className="text-xs text-white/50">
                  Error: {this.state.error?.message || 'Unknown error'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

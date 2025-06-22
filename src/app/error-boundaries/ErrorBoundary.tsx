
import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/card';
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static override getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private getErrorMessage(error?: Error): { title: string; description: string; suggestion?: string } {
    const errorMessage = error?.message?.toLowerCase() || '';
    
    // Check for common deployment issues
    if (errorMessage.includes('supabase') || errorMessage.includes('credentials')) {
      return {
        title: "Configuration Issue",
        description: "The application is having trouble connecting to the database.",
        suggestion: "This usually happens when the app is deployed without proper environment variables. The app can still run in offline mode with limited functionality."
      };
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return {
        title: "Connection Issue", 
        description: "Unable to connect to the server.",
        suggestion: "Please check your internet connection and try again."
      };
    }
    
    if (errorMessage.includes('chunk') || errorMessage.includes('loading')) {
      return {
        title: "Loading Error",
        description: "There was a problem loading part of the application.",
        suggestion: "This might be due to a deployment update. Please refresh the page."
      };
    }

    return {
      title: "Something went wrong",
      description: "An unexpected error occurred. Please try refreshing the page.",
      suggestion: "If the problem persists, please contact support."
    };
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorInfo = this.getErrorMessage(this.state.error);

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>{errorInfo.title}</CardTitle>
              <CardDescription>
                {errorInfo.description}
              </CardDescription>
              {errorInfo.suggestion && (
                <p className="text-sm text-muted-foreground mt-2">
                  💡 {errorInfo.suggestion}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={this.handleRetry} variant="default" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={this.handleReload} variant="outline" className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </div>
              
              {/* Show configuration help for deployment issues */}
              {this.state.error?.message?.toLowerCase().includes('supabase') && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>For Developers:</strong> Make sure to set the environment variables 
                    <code className="mx-1 px-1 bg-blue-100 dark:bg-blue-800 rounded">VITE_SUPABASE_URL</code> and 
                    <code className="mx-1 px-1 bg-blue-100 dark:bg-blue-800 rounded">VITE_SUPABASE_ANON_KEY</code> 
                    in your deployment platform's settings.
                  </p>
                </div>
              )}

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

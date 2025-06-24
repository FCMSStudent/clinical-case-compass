import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CasesErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public override getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50/10 rounded-lg border border-red-200/20">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <h2 className="text-xl font-semibold text-red-200 mb-2">Something went wrong</h2>
          <p className="text-red-300 text-center mb-4 max-w-md">
            There was an error loading the cases. Please try refreshing the page or contact support if the problem persists.
          </p>
          <Button 
            onClick={this.handleRetry}
            className="bg-red-500/20 border border-red-400/30 text-red-100 hover:bg-red-500/30"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

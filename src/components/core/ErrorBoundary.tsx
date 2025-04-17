import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch and gracefully handle runtime errors.
 * Particularly useful for catching hydration errors in development.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      // You can render any fallback UI
      return this.props.fallback || (
        <div className="p-4 border border-red-300 rounded-md bg-red-50 text-red-800">
          <h3 className="font-medium text-lg mb-2">Something went wrong</h3>
          <p className="text-sm mb-2">The application encountered an error.</p>
          <details className="text-xs">
            <summary>Technical details</summary>
            <p className="mt-2 font-mono whitespace-pre-wrap">
              {this.state.error?.toString()}
            </p>
          </details>
          <button 
            className="mt-3 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

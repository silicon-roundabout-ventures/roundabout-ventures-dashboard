/**
 * DataFetchingErrorHandler Component
 * 
 * Specialized component for handling data fetching errors with
 * appropriate fallback UI and retry mechanisms
 */
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface DataFetchingErrorHandlerProps {
  /** The error that occurred */
  error: Error | unknown;
  /** Function to retry the data fetching operation */
  retry?: () => void;
  /** Custom title for the error message */
  title?: string;
  /** Custom description for the error message */
  description?: string;
  /** Whether to show full error details (default: false) */
  showDetails?: boolean;
  /** CSS classes for custom styling */
  className?: string;
}

/**
 * Component for displaying data fetching errors with retry option
 */
const DataFetchingErrorHandler: React.FC<DataFetchingErrorHandlerProps> = ({
  error,
  retry,
  title = 'Unable to load data',
  description = 'There was an error loading the requested data.',
  showDetails = false,
  className = '',
}) => {
  // Format the error message for display
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unknown error occurred';

  return (
    <div className={`bg-card rounded-lg p-6 border border-border ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          
          {showDetails && (
            <details className="mt-2 text-sm">
              <summary className="font-medium cursor-pointer">Error details</summary>
              <p className="mt-2 p-2 bg-muted rounded-md font-mono whitespace-pre-wrap text-xs">
                {errorMessage}
              </p>
            </details>
          )}
          
          {retry && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={retry}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataFetchingErrorHandler;

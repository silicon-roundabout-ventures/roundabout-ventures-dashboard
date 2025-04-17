/**
 * Error Handler Utility
 * 
 * Provides centralized error handling functionality for the application
 * including error logging, reporting, and user-friendly error messages
 */

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Error source categories
export enum ErrorSource {
  API = 'api',
  UI = 'ui',
  DATA = 'data',
  AUTHENTICATION = 'auth',
  NAVIGATION = 'navigation',
  UNKNOWN = 'unknown'
}

// Error context interface
export interface ErrorContext {
  // Component or function where error occurred
  source?: string;
  // Additional data related to the error
  data?: Record<string, any>;
  // User action that triggered the error
  userAction?: string;
  // URL path where the error occurred
  path?: string;
}

/**
 * Handles errors throughout the application
 * 
 * @param error The error object
 * @param severity Error severity level
 * @param source Error source category
 * @param context Additional context information
 */
export function handleError(
  error: Error | unknown,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  source: ErrorSource = ErrorSource.UNKNOWN,
  context: ErrorContext = {}
): void {
  // Extract error message or set default
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unknown error occurred';
  
  // Create structured error object
  const errorObject = {
    message: errorMessage,
    severity,
    source,
    timestamp: new Date().toISOString(),
    stack: error instanceof Error ? error.stack : undefined,
    ...context
  };
  
  // Log error to console (in development)
  if (process.env.NODE_ENV !== 'production') {
    console.group('Application Error');
    console.error(errorObject);
    console.groupEnd();
  }
  
  // In production, we would send to error monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to error monitoring service
    // errorMonitoringService.captureException(errorObject);
    
    // Or send to a logging endpoint
    // fetch('/api/logs', {
    //   method: 'POST',
    //   body: JSON.stringify(errorObject),
    //   headers: { 'Content-Type': 'application/json' }
    // }).catch(e => console.error('Failed to log error:', e));
  }
}

/**
 * Get a user-friendly error message based on error type and context
 * 
 * @param error The error object
 * @param fallbackMessage Optional fallback message if no specific message is found
 * @returns User-friendly error message
 */
export function getUserFriendlyErrorMessage(
  error: Error | unknown,
  fallbackMessage = 'Something went wrong. Please try again.'
): string {
  if (error instanceof Error) {
    // Map known error types to user-friendly messages
    if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
      return 'We couldn\'t connect to the server. Please check your internet connection and try again.';
    }
    
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      return 'The request took too long to complete. Please try again.';
    }
    
    if (error.message.includes('not found') || error.message.includes('404')) {
      return 'The requested resource could not be found.';
    }
    
    if (error.message.includes('permission') || error.message.includes('unauthorized') || error.message.includes('403')) {
      return 'You don\'t have permission to access this resource.';
    }
  }
  
  // Return fallback message if no specific message is found
  return fallbackMessage;
}

export default {
  handleError,
  getUserFriendlyErrorMessage,
  ErrorSeverity,
  ErrorSource
};

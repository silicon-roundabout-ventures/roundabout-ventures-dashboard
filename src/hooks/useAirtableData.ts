/**
 * useAirtableData Hook
 * 
 * Custom hook for fetching data from Airtable with built-in
 * error handling, loading states, and retry functionality
 */
import { useState, useEffect, useCallback } from 'react';
import { fetchPortfolioCompanies, PortfolioCompany } from '../services/airtable';

interface UseAirtableDataResult<T> {
  /** The fetched data */
  data: T | null;
  /** Whether the data is currently loading */
  isLoading: boolean;
  /** Any error that occurred during fetching */
  error: Error | null;
  /** Function to manually retry the data fetch */
  retry: () => void;
}

/**
 * Hook to fetch portfolio companies from Airtable with error handling
 */
export function usePortfolioCompanies(): UseAirtableDataResult<PortfolioCompany[]> {
  const [data, setData] = useState<PortfolioCompany[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCounter, setRetryCounter] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const companies = await fetchPortfolioCompanies();
      setData(companies);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching portfolio companies:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch portfolio companies'));
      setIsLoading(false);
    }
  }, []);

  // Retry function that can be called manually
  const retry = useCallback(() => {
    setRetryCounter(prev => prev + 1);
  }, []);

  // Effect to fetch data on mount or when retry is called
  useEffect(() => {
    fetchData();
  }, [fetchData, retryCounter]);

  return { data, isLoading, error, retry };
}

/**
 * Generic hook to fetch any Airtable data with a provided fetch function
 */
export function useAirtableData<T>(
  fetchFn: () => Promise<T>,
  options?: {
    initialData?: T;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
): UseAirtableDataResult<T> {
  const [data, setData] = useState<T | null>(options?.initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCounter, setRetryCounter] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      options?.onSuccess?.(result);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      const errorObj = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObj);
      options?.onError?.(errorObj);
      setIsLoading(false);
    }
  }, [fetchFn, options]);

  // Retry function that can be called manually
  const retry = useCallback(() => {
    setRetryCounter(prev => prev + 1);
  }, []);

  // Effect to fetch data on mount or when retry is called
  useEffect(() => {
    fetchData();
  }, [fetchData, retryCounter]);

  return { data, isLoading, error, retry };
}

export default useAirtableData;

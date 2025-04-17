/**
 * useAsyncData.ts
 * Custom hook for handling async data loading with consistent loading states and error handling
 */
import { useState, useEffect } from 'react';

interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

type AsyncDataFunction<T> = () => Promise<T>;

/**
 * Hook for handling async data fetching with consistent loading, success, and error states
 *
 * @param asyncFn Function that returns a promise with data
 * @param initialData Optional initial data
 * @param dependencies Optional dependencies array for re-fetching
 * @returns Object with data, loading state, error state, and success state
 */
export function useAsyncData<T>(
  asyncFn: AsyncDataFunction<T>,
  initialData: T | null = null,
  dependencies: any[] = []
): AsyncDataState<T> {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: initialData,
    isLoading: true,
    error: null,
    isSuccess: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await asyncFn();
        
        if (isMounted) {
          setState({
            data: result,
            isLoading: false,
            error: null,
            isSuccess: true,
          });
        }
      } catch (error) {
        console.error('Error in useAsyncData:', error);
        
        if (isMounted) {
          setState({
            data: initialData,
            isLoading: false,
            error: error instanceof Error ? error : new Error(String(error)),
            isSuccess: false,
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

/**
 * Helper hook for data memoization to improve performance
 * Memoizes a derived value based on source data
 * 
 * @param sourceData Input data to transform
 * @param transformFn Function to transform the data
 * @returns Memoized transformed data
 */
export function useMemoizedTransform<TInput, TOutput>(
  sourceData: TInput | null,
  transformFn: (data: TInput) => TOutput
): TOutput | null {
  const [memoizedResult, setMemoizedResult] = useState<TOutput | null>(null);
  
  useEffect(() => {
    if (sourceData === null) {
      setMemoizedResult(null);
      return;
    }
    
    // Apply transformation and memoize result
    const result = transformFn(sourceData);
    setMemoizedResult(result);
  }, [sourceData, transformFn]);
  
  return memoizedResult;
}

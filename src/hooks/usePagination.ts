/**
 * usePagination.ts
 * Custom hook for handling pagination with performance optimization
 */
import { useState, useMemo, useCallback } from 'react';

interface PaginationState<T> {
  // All items
  allItems: T[];
  // Current page items
  currentPageItems: T[];
  // Current page number (1-based)
  currentPage: number;
  // Total number of pages
  totalPages: number;
  // Total number of items
  totalItems: number;
  // Number of items per page
  pageSize: number;
  // Is there a previous page?
  hasPreviousPage: boolean;
  // Is there a next page?
  hasNextPage: boolean;
  // Actions
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

/**
 * Hook for handling pagination with performance optimization
 * 
 * @param items Array of items to paginate
 * @param initialPageSize Initial number of items per page (default: 10)
 * @param initialPage Initial page to show (default: 1)
 * @returns Pagination state and actions
 */
export function usePagination<T>(
  items: T[],
  initialPageSize: number = 10,
  initialPage: number = 1
): PaginationState<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Calculate total pages
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil(items.length / pageSize)),
  [items.length, pageSize]);
  
  // Ensure current page is within valid range when items or page size changes
  const validCurrentPage = useMemo(() => 
    Math.min(Math.max(1, currentPage), totalPages),
  [currentPage, totalPages]);
  
  // Update current page if needed
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }
  
  // Calculate current page items
  const currentPageItems = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, items.length);
    return items.slice(startIndex, endIndex);
  }, [items, validCurrentPage, pageSize]);
  
  // Navigation functions
  const nextPage = useCallback(() => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(validCurrentPage + 1);
    }
  }, [validCurrentPage, totalPages]);
  
  const previousPage = useCallback(() => {
    if (validCurrentPage > 1) {
      setCurrentPage(validCurrentPage - 1);
    }
  }, [validCurrentPage]);
  
  const goToPage = useCallback((page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(targetPage);
  }, [totalPages]);
  
  const updatePageSize = useCallback((size: number) => {
    const newSize = Math.max(1, size);
    setPageSize(newSize);
    // Reset to first page when changing page size to avoid confusion
    setCurrentPage(1);
  }, []);
  
  return {
    allItems: items,
    currentPageItems,
    currentPage: validCurrentPage,
    totalPages,
    totalItems: items.length,
    pageSize,
    hasPreviousPage: validCurrentPage > 1,
    hasNextPage: validCurrentPage < totalPages,
    nextPage,
    previousPage,
    goToPage,
    setPageSize: updatePageSize
  };
}

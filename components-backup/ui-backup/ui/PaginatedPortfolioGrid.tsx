/**
 * PaginatedPortfolioGrid
 * 
 * A reusable component for displaying paginated portfolio company data
 * with consistent loading, error, and empty states
 */
import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import { PortfolioCompany } from '../../services/airtable/airtable';
import PortfolioCard from './PortfolioCard';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface PaginatedPortfolioGridProps {
  companies: PortfolioCompany[];
  isLoading: boolean;
  error: Error | null;
  pageSize?: number;
  className?: string;
  emptyMessage?: React.ReactNode;
}

/**
 * A grid of portfolio companies with pagination controls
 */
const PaginatedPortfolioGrid: React.FC<PaginatedPortfolioGridProps> = ({
  companies,
  isLoading,
  error,
  pageSize = 9,
  className = '',
  emptyMessage = 'No companies match the current filters.'
}) => {
  // Use our custom pagination hook
  const pagination = usePagination(companies, pageSize);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(pageSize).fill(0).map((_, index) => (
            <div key={index} className="bg-card/70 backdrop-blur-sm rounded-lg p-6 border border-border/20">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading portfolio data</AlertTitle>
          <AlertDescription>
            {error.message || 'An unexpected error occurred. Please try refreshing the page.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Show empty state
  if (companies.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <Alert>
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            {emptyMessage}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Render paginated companies
  return (
    <div className={`w-full space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagination.currentPageItems.map((company) => (
          <PortfolioCard 
            key={company.id} 
            company={company}
            variant="default"
            showModal={true} 
          />
        ))}
      </div>
      
      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.currentPage - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
            {pagination.totalItems} companies
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={pagination.previousPage}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={pagination.nextPage}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedPortfolioGrid;

/**
 * PortfolioSection
 * 
 * Main component for displaying the portfolio companies section
 * Uses the refactored data hooks and display components
 */
import React, { useState } from 'react';
import { usePortfolioCompanies } from '../../hooks/useAirtableData';
import { usePortfolioStats } from '../../hooks/usePortfolioStats';
// No need to import PortfolioCompany - using inline type to avoid dependencies
import { 
  ChartPie, 
  CircleDollarSign, 
  Building2, 
  TrendingUp,
  ArrowUpRight,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import PortfolioCard from '../ui/PortfolioCard';
import { Card } from '../ui/card';

// Simplified components to replace removed ones
const StatisticDisplay = ({ title, value, icon, isLoading, changeText, trend }: any) => (
  <Card className="p-4 flex flex-col space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {icon && <span className="text-muted-foreground">{icon}</span>}
    </div>
    <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-24" /> : value}</div>
    {changeText && (
      <div className={`text-xs flex items-center ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
        {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : null}
        {changeText}
      </div>
    )}
  </Card>
);

const ClientOnly = ({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted ? <>{children}</> : <>{fallback}</> || null;
};

const DataFetchingErrorHandler = ({ error, retry, title, description, showDetails }: any) => (
  <Alert variant="destructive" className="my-4">
    <AlertTitle>{title || 'Error loading data'}</AlertTitle>
    <AlertDescription className="space-y-2">
      <p>{description || 'There was a problem loading the data.'}</p>
      {showDetails && error && <p className="text-sm opacity-80">{error.message}</p>}
      {retry && (
        <Button variant="outline" size="sm" onClick={retry} className="mt-2">
          <RefreshCw className="mr-2 h-3 w-3" />
          Try again
        </Button>
      )}
    </AlertDescription>
  </Alert>
);

const PortfolioFilterBar = ({ filterOptions, filterValues, onFilterChange, onResetFilters }: any) => (
  <div className="flex flex-wrap gap-3 mb-4 p-4 bg-muted/40 rounded-lg">
    {Object.entries(filterOptions).map(([key, options]: [string, any]) => (
      <div key={key} className="flex items-center gap-2">
        <span className="text-sm font-medium capitalize">{key}:</span>
        <select
          value={filterValues[key] || ''}
          onChange={(e) => onFilterChange(key, e.target.value)}
          className="text-sm bg-background border rounded px-2 py-1"
        >
          <option value="">All</option>
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    ))}
    <Button variant="ghost" size="sm" onClick={onResetFilters} className="ml-auto">
      <RefreshCw className="mr-2 h-3 w-3" />
      Reset filters
    </Button>
  </div>
);

const PaginatedPortfolioGrid = ({ companies, isLoading, error, pageSize, emptyMessage }: any) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(companies.length / pageSize);
  const paginatedCompanies = companies.slice((page - 1) * pageSize, page * pageSize);
  
  if (companies.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {emptyMessage || 'No companies found'}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCompanies.map((company: any) => (
          <PortfolioCard key={company.id} company={company} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(pageNum)}
              className="w-8 h-8 p-0"
            >
              {pageNum}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

interface PortfolioSectionProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Complete portfolio section with statistics, filters, and company cards
 */
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ className = "" }) => {
  // Get portfolio data using our custom hook with error handling
  const { 
    data: companies = [], 
    isLoading: isLoadingData,
    error: portfolioError,
    retry: retryPortfolioFetch
  } = usePortfolioCompanies();
  
  // Portfolio statistics
  const {
    summaryData,
    industryChartData,
    stageChartData,
    isLoading: isLoadingStats,
    hasError: hasStatsError
  } = usePortfolioStats();
  
  // Setup filtering
  const [filterValues, setFilterValues] = useState({
    sector: '',
    stage: '',
    announced: '',
  });
  
  // Generate filter options from companies data
  const filterOptions = {
    sector: [...new Set((companies || []).map(c => c.sector).filter(Boolean))].sort() as string[],
    stage: [...new Set((companies || []).map(c => c.stage).filter(Boolean))].sort() as string[],
    announced: ['Yes', 'No']
  };
  
  // Filter companies based on selected values
  const filteredCompanies = (companies || []).filter(company => {
    if (filterValues.sector && company.sector !== filterValues.sector) return false;
    if (filterValues.stage && company.stage !== filterValues.stage) return false;
    if (filterValues.announced) {
      const announcedFilter = filterValues.announced === 'Yes';
      if (company.announced !== announcedFilter) return false;
    }
    return true;
  });
  
  // Update a single filter
  const updateFilter = (filter: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilterValues({
      sector: '',
      stage: '',
      announced: ''
    });
  };
  
  // State for expanded filter panel
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle company click
  const handleCompanyClick = (company: any) => {
    if (company.website) {
      window.open(company.website, '_blank');
    }
  };
  
  return (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
      <h1 className="text-3xl font-bold mb-8">Portfolio Companies</h1>
      
      {/* Statistics section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Fund Overview</h2>
        
        <ClientOnly fallback={<div className="h-32 bg-muted animate-pulse rounded-lg"></div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryData && (
              <>
                <StatisticDisplay
                  title="Companies"
                  value={summaryData.totalCompanies.formatted}
                  icon={<Building2 />}
                  isLoading={isLoadingStats}
                  changeText={summaryData.totalCompanies.changeFormatted}
                  trend="up"
                />
                
                <StatisticDisplay
                  title="Total Invested"
                  value={summaryData.totalInvestments.formatted}
                  icon={<CircleDollarSign />}
                  isLoading={isLoadingStats}
                  changeText={summaryData.totalInvestments.changeFormatted}
                  trend="up"
                />
                
                <StatisticDisplay
                  title="Avg. Investment"
                  value={summaryData.averageInvestment.formatted}
                  icon={<TrendingUp />}
                  isLoading={isLoadingStats}
                />
                
                <StatisticDisplay
                  title="Median Valuation"
                  value={summaryData.medianValuation.formatted}
                  icon={<ChartPie />}
                  isLoading={isLoadingStats}
                />
              </>
            )}
          </div>
        </ClientOnly>
      </div>
      
      {/* Filter bar */}
      <div className="mb-6">
        <ClientOnly fallback={<div className="h-16 bg-muted animate-pulse rounded-lg"></div>}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button 
                variant={showFilters ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            
            {showFilters && (
              <PortfolioFilterBar
                filterOptions={filterOptions}
                filterValues={filterValues}
                onFilterChange={updateFilter}
                onResetFilters={resetFilters}
              />
            )}
          </div>
        </ClientOnly>
      </div>
      
      {/* Error state for statistics */}
      {hasStatsError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error loading portfolio statistics</AlertTitle>
          <AlertDescription>
            We encountered an error calculating portfolio statistics. Some information may be incomplete.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Portfolio companies with pagination */}
      <ClientOnly fallback={<div className="h-60 bg-muted animate-pulse rounded-lg"></div>}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Company' : 'Companies'}
              {Object.values(filterValues).some(v => !!v) && ' (Filtered)'}
            </h2>
            
            {Object.values(filterValues).some(v => !!v) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear filters
              </Button>
            )}
          </div>
          
          {/* Handle loading, error, and success states */}
          {isLoadingData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden border border-border">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {portfolioError && (
            <DataFetchingErrorHandler
              error={portfolioError}
              retry={retryPortfolioFetch}
              title="Unable to load portfolio companies"
              description="There was an error fetching the portfolio data. Please try again."
              showDetails={true}
            />
          )}
          
          {!isLoadingData && !portfolioError && (
            <PaginatedPortfolioGrid 
              companies={filteredCompanies} 
              isLoading={false}
              error={null}
              pageSize={9}
              emptyMessage={
                <>
                  No companies match your current filters. Try adjusting your filters or{' '}
                  <Button 
                    variant="link" 
                    className="px-1 py-0 h-auto" 
                    onClick={resetFilters}
                  >
                    reset all filters
                  </Button>.
                </>
              }
            />
          )}
          
          {/* "View All" button if filtered */}
          {Object.values(filterValues).some(v => !!v) && (companies || []).length > 0 && (
            <div className="flex justify-center mt-6">
              <Button onClick={resetFilters} variant="outline">
                View All Companies <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </ClientOnly>
    </div>
  );
};

export default PortfolioSection;

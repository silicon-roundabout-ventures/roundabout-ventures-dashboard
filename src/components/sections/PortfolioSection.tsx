/**
 * PortfolioSection
 * 
 * Main component for displaying the portfolio companies section
 * Uses the refactored data hooks and display components
 */
import React, { useState } from 'react';
import { useAirtableData } from '../../services/airtable/AirtableProvider';
import { usePortfolioStats } from '../../hooks/usePortfolioStats';
import StatisticDisplay from '../data-display/StatisticDisplay';
import PortfolioFilterBar from '../data-display/PortfolioFilterBar';
import PaginatedPortfolioGrid from '../data-display/PaginatedPortfolioGrid';
import ClientOnly from '../common/ClientOnly';
import { PortfolioCompany } from '../../services/airtable/airtable';
import { 
  ChartPie, 
  CircleDollarSign, 
  Building2, 
  TrendingUp,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';

interface PortfolioSectionProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Complete portfolio section with statistics, filters, and company cards
 */
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ className = "" }) => {
  // Get portfolio data from the AirtableProvider
  const { 
    portfolioCompanies: companies, 
    statistics, 
    isLoading: isLoadingData,
    hasError,
    errorMessage
  } = useAirtableData();
  
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
    sector: [...new Set(companies.map(c => c.sector))].sort(),
    stage: [...new Set(companies.map(c => c.stage))].sort(),
    announced: ['Yes', 'No']
  };
  
  // Filter companies based on selected values
  const filteredCompanies = companies.filter(company => {
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
  const handleCompanyClick = (company: PortfolioCompany) => {
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
          
          {/* Paginated portfolio grid */}
          <PaginatedPortfolioGrid 
            companies={filteredCompanies} 
            isLoading={isLoadingData}
            error={hasError ? new Error(errorMessage || 'Failed to load portfolio data') : null}
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
          
          {/* "View All" button if filtered */}
          {Object.values(filterValues).some(v => !!v) && companies.length > 0 && (
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

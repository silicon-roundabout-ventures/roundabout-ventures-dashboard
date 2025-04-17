/**
 * usePortfolioData hook
 * 
 * Custom hook for accessing and filtering portfolio company data
 * Provides a standardized interface for components to interact with portfolio data
 */
import { useMemo, useState, useCallback } from 'react';
import { useAirtableData } from '../services/airtable/AirtableProvider';
import { PortfolioCompany } from '../services/airtable/airtable';

// Filter options interface
export interface PortfolioFilterOptions {
  sector?: string; // Changed from industry to sector to match our schema
  stage?: string;
  fund?: string;
  searchTerm?: string;
  announcedOnly?: boolean;
}

/**
 * Hook for accessing and filtering portfolio data
 */
export function usePortfolioData() {
  const { portfolioCompanies, isLoading, hasError, errorMessage } = useAirtableData();
  
  // Local state for filtering
  const [filterOptions, setFilterOptions] = useState<PortfolioFilterOptions>({
    sector: undefined, // Changed from industry to sector
    stage: undefined,
    fund: undefined,
    searchTerm: '',
    announcedOnly: false,
  });
  
  // Get unique values for filter dropdowns
  const filterValues = useMemo(() => {
    const sectors = new Set<string>();
    const stages = new Set<string>();
    const funds = new Set<string>();
    
    portfolioCompanies.forEach(company => {
      // Add sectors
      if (company.sector && company.sector.trim()) {
        sectors.add(company.sector.trim());
      }
      
      // Add stages
      if (company.stage && company.stage.trim()) {
        stages.add(company.stage.trim());
      }
      
      // Add funds
      if (company.fund && typeof company.fund === 'string' && company.fund.trim()) {
        funds.add(company.fund.trim());
      }
    });
    
    return {
      sectors: Array.from(sectors).sort(),
      stages: Array.from(stages).sort(),
      funds: Array.from(funds).sort(),
    };
  }, [portfolioCompanies]);
  
  // Filter companies based on current filter options
  const filteredCompanies = useMemo(() => {
    if (!portfolioCompanies.length) return [];
    
    return portfolioCompanies.filter(company => {
      // Filter by sector (previously industry)
      if (filterOptions.sector && 
          (!company.sector || 
           !company.sector.toLowerCase().includes(filterOptions.sector.toLowerCase()))
      ) {
        return false;
      }
      
      // Filter by stage
      if (filterOptions.stage && 
          (!company.stage || 
           !company.stage.toLowerCase().includes(filterOptions.stage.toLowerCase()))
      ) {
        return false;
      }
      
      // Filter by fund
      if (filterOptions.fund && 
          (!company.fund || 
           (typeof company.fund === 'string' && 
            !company.fund.toLowerCase().includes(filterOptions.fund.toLowerCase())))
      ) {
        return false;
      }
      
      // Filter by announced status
      if (filterOptions.announcedOnly && !company.announced) {
        return false;
      }
      
      // Filter by search term - search in name, description, and industry
      if (filterOptions.searchTerm) {
        const searchTerm = filterOptions.searchTerm.toLowerCase();
        const nameMatch = company.name.toLowerCase().includes(searchTerm);
        const descMatch = company.description.toLowerCase().includes(searchTerm);
        const industryMatch = company.industry?.some(ind => 
          ind.toLowerCase().includes(searchTerm)
        );
        
        if (!nameMatch && !descMatch && !industryMatch) {
          return false;
        }
      }
      
      return true;
    });
  }, [portfolioCompanies, filterOptions]);
  
  // Update filter options
  const updateFilter = useCallback((newOptions: Partial<PortfolioFilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...newOptions,
    }));
  }, []);
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilterOptions({
      sector: undefined, // Changed from industry to sector
      stage: undefined,
      fund: undefined,
      searchTerm: '',
      announcedOnly: false,
    });
  }, []);
  
  return {
    // Data
    companies: filteredCompanies,
    allCompanies: portfolioCompanies,
    
    // Filter state
    filterOptions,
    filterValues,
    
    // Filter actions
    updateFilter,
    resetFilters,
    
    // Status
    isLoading,
    hasError,
    errorMessage,
  };
}

/**
 * PortfolioFilterBar Component
 * 
 * A reusable component for filtering portfolio companies 
 * Provides industry, stage, fund filters and text search
 */
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
// Define our own filter options type instead of importing
export interface PortfolioFilterOptions {
  sector?: string;
  stage?: string;
  announced?: string;
  searchTerm?: string;
}

interface PortfolioFilterBarProps {
  /** Current filter options */
  filterValues: {
    sector: string;
    stage: string;
    announced: string;
  };
  /** Available filter values */
  filterOptions: {
    sector: string[];
    stage: string[];
    announced: string[];
  };
  /** Callback when a filter changes */
  onFilterChange: (filter: string, value: string) => void;
  /** Callback to reset all filters */
  onResetFilters: () => void;
  /** Show industry filter */
  showIndustryFilter?: boolean;
  /** Show stage filter */
  showStageFilter?: boolean;
  /** Show fund filter */
  showFundFilter?: boolean;
  /** Show announced only toggle */
  showAnnouncedToggle?: boolean;
  /** Show search input */
  showSearch?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * PortfolioFilterBar component for filtering portfolio companies
 */
export const PortfolioFilterBar: React.FC<PortfolioFilterBarProps> = ({
  filterOptions,
  filterValues,
  onFilterChange,
  onResetFilters,
  showIndustryFilter = true,
  showStageFilter = true,
  showFundFilter = true,
  showAnnouncedToggle = true,
  showSearch = true,
  className = "",
}) => {
  // Count active filters
  const activeFilterCount = Object.values(filterValues).filter(val => !!val).length;
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search bar - temporarily disabled since we don't have search in our refactored code yet */}
      {false && showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search companies..."
            className="pl-10"
            value=""
            onChange={(e) => console.log('Search not implemented yet')}
          />
        </div>
      )}
      
      {/* Filter controls */}
      <div className="flex flex-wrap gap-3">
        {/* Sector filter (was Industry) */}
        {showIndustryFilter && filterOptions.sector.length > 0 && (
          <Select
            value={filterValues.sector || ''}
            onValueChange={(value) => onFilterChange('sector', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sectors</SelectItem>
              {filterOptions.sector.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {/* Stage filter */}
        {showStageFilter && filterOptions.stage.length > 0 && (
          <Select
            value={filterValues.stage || ''}
            onValueChange={(value) => onFilterChange('stage', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Stages</SelectItem>
              {filterOptions.stage.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {/* Announced filter */}
        {showFundFilter && filterOptions.announced.length > 0 && (
          <Select
            value={filterValues.announced || ''}
            onValueChange={(value) => onFilterChange('announced', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Announcement Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Companies</SelectItem>
              {filterOptions.announced.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'Yes' ? 'Announced' : 'Stealth'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {/* Reset filters button - only show if filters are active */}
        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            <X className="h-4 w-4 mr-1" />
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default PortfolioFilterBar;

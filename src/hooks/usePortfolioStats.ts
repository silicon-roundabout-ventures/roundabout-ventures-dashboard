/**
 * usePortfolioStats hook
 * 
 * Custom hook for accessing portfolio statistics
 * Provides analysis and visualization-ready data transformations
 */
import { useMemo } from 'react';
import { usePortfolioCompanies } from './useAirtableData';
import { FundStatistics } from '../services/airtable';

// Chart data type for visualization components
export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

/**
 * Hook for accessing and processing portfolio statistics
 */
export function usePortfolioStats() {
  const { data: portfolioCompanies, isLoading, error } = usePortfolioCompanies();
  const hasError = !!error;
  
  // Calculate statistics from portfolio data
  const statistics = useMemo(() => {
    if (!portfolioCompanies || portfolioCompanies.length === 0) {
      return {
        totalCompanies: 0,
        totalInvestments: 0,
        averageInvestment: 0,
        medianValuation: 0,
        investmentsLast12Months: 0,
        companiesLast12Months: 0,
        industrySplit: {},
        stageSplit: {}
      } as FundStatistics;
    }
    
    // Create industry/sector distribution
    const industrySplit: Record<string, number> = {};
    const stageSplit: Record<string, number> = {};
    
    // Calculate totals
    let totalInvestments = 0;
    
    portfolioCompanies.forEach(company => {
      // Add to industry split
      if (company.sector) {
        industrySplit[company.sector] = (industrySplit[company.sector] || 0) + 1;
      }
      
      // Add to stage split
      if (company.stage) {
        stageSplit[company.stage] = (stageSplit[company.stage] || 0) + 1;
      }
      
      // Add to total investments
      if (company.totalInvested) {
        totalInvestments += company.totalInvested;
      }
    });
    
    return {
      totalCompanies: portfolioCompanies.length,
      totalInvestments,
      averageInvestment: totalInvestments / portfolioCompanies.length,
      medianValuation: 0, // Calculate proper median if needed
      investmentsLast12Months: 0, // Calculate based on dates if needed
      companiesLast12Months: 0, // Calculate based on dates if needed
      industrySplit,
      stageSplit
    } as FundStatistics;
  }, [portfolioCompanies]);
  
  // Format data for industry distribution chart
  const industryChartData = useMemo((): ChartData => {
    // Handle case where statistics is not available yet
    if (!statistics) {
      return { labels: [], values: [], colors: [] };
    }
    
    const industryData = statistics.industrySplit || {};
    const entries = Object.entries(industryData);
    
    // Sort by count (descending)
    entries.sort((a, b) => b[1] - a[1]);
    
    // Default color palette - Tailwind colors
    const defaultColors = [
      '#3b82f6', // blue-500
      '#10b981', // emerald-500
      '#6366f1', // indigo-500
      '#f59e0b', // amber-500
      '#ef4444', // red-500
      '#8b5cf6', // violet-500
      '#ec4899', // pink-500
      '#0ea5e9', // sky-500
      '#14b8a6', // teal-500
      '#f97316', // orange-500
      '#84cc16', // lime-500
      '#a3e635', // lime-400
    ];
    
    return {
      labels: entries.map(([label]) => label),
      values: entries.map(([, value]) => value),
      colors: defaultColors.slice(0, entries.length)
    };
  }, [statistics.industrySplit]);
  
  // Format data for stage distribution chart
  const stageChartData = useMemo((): ChartData => {
    // Handle case where statistics is not available yet
    if (!statistics) {
      return { labels: [], values: [], colors: [] };
    }
    
    const stageData = statistics.stageSplit || {};
    const entries = Object.entries(stageData);
    
    // Sort by investment stage (pre-seed, seed, series A, etc.)
    const stageOrder = {
      'Pre-Seed': 0,
      'Seed': 1,
      'Series A': 2,
      'Series B': 3,
      'Series C': 4,
      'Series D': 5,
      'Growth': 6,
      'Exit': 7
    };
    
    entries.sort((a, b) => {
      const stageA = a[0];
      const stageB = b[0];
      
      const orderA = stageOrder[stageA as keyof typeof stageOrder] ?? 999;
      const orderB = stageOrder[stageB as keyof typeof stageOrder] ?? 999;
      
      return orderA - orderB;
    });
    
    // Stage-specific colors
    const stageColors: Record<string, string> = {
      'Pre-Seed': '#0ea5e9', // sky-500
      'Seed': '#10b981',     // emerald-500
      'Series A': '#6366f1', // indigo-500
      'Series B': '#8b5cf6', // violet-500
      'Series C': '#ec4899', // pink-500
      'Series D': '#f59e0b', // amber-500
      'Growth': '#f97316',   // orange-500
      'Exit': '#84cc16',     // lime-500
    };
    
    return {
      labels: entries.map(([label]) => label),
      values: entries.map(([, value]) => value),
      colors: entries.map(([stage]) => stageColors[stage] || '#3b82f6')
    };
  }, [statistics.stageSplit]);
  
  // Format summary data for quick stats
  const summaryData = useMemo(() => {
    return {
      totalInvestments: {
        value: statistics.totalInvestments,
        formatted: `£${(statistics.totalInvestments / 1000000).toFixed(1)}M`,
        change: statistics.investmentsLast12Months,
        changeFormatted: `£${(statistics.investmentsLast12Months / 1000000).toFixed(1)}M in last 12m`
      },
      totalCompanies: {
        value: statistics.totalCompanies,
        formatted: statistics.totalCompanies.toString(),
        change: statistics.companiesLast12Months,
        changeFormatted: `+${statistics.companiesLast12Months} in last 12m`
      },
      averageInvestment: {
        value: statistics.averageInvestment,
        formatted: `£${(statistics.averageInvestment / 1000).toFixed(0)}k`
      },
      medianValuation: {
        value: statistics.medianValuation,
        formatted: `£${(statistics.medianValuation / 1000000).toFixed(1)}M`
      }
    };
  }, [statistics]);
  
  return {
    // Raw statistics
    statistics,
    
    // Processed data for charts
    industryChartData,
    stageChartData,
    
    // Summary data for stats cards
    summaryData,
    
    // Status
    isLoading,
    hasError
  };
}

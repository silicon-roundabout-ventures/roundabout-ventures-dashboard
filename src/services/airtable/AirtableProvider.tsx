/**
 * AirtableProvider
 * 
 * Centralized data provider for Airtable data
 * Wraps data fetching, transformation, and state management
 * in a React Context for consistent access throughout the app.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { toast } from 'sonner';

import {
  PortfolioCompany,
  FundStatistics,
  transformAirtableToPortfolioCompany,
  calculateFundStatistics,
  MOCK_PORTFOLIO_DATA,
  MOCK_FUND_STATISTICS
} from './airtable';

// ========================================================================
// CONTEXT DEFINITION
// ========================================================================

/**
 * Context data structure
 */
interface AirtableContextType {
  portfolioCompanies: PortfolioCompany[];
  statistics: FundStatistics;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

/**
 * Default values when no data is available
 */
const defaultContextValue: AirtableContextType = {
  portfolioCompanies: [],
  statistics: MOCK_FUND_STATISTICS,
  isLoading: true,
  hasError: false
};

// Create the context
const AirtableContext = createContext<AirtableContextType>(defaultContextValue);

// Props for the provider component
interface AirtableProviderProps {
  children: ReactNode;
}

// ========================================================================
// PROVIDER COMPONENT
// ========================================================================

/**
 * AirtableProvider component
 * 
 * Wraps the application with Airtable data context
 */
export const AirtableProvider: React.FC<AirtableProviderProps> = ({ children }) => {
  // Define GraphQL query for both Airtable and mock data
  const data = useStaticQuery(graphql`
    query AirtablePortfolioQuery {
      # Query real Airtable data
      allAirtable(filter: {table: {eq: "Startups"}}) {
        nodes {
          id
          data {
            Name
            Deal_Name
            Notes
            One_Line_Summary
            Sector
            Stage
            Announced
            Close_Date
            Company
            Fund
            Total_Invested
            Entry_Valuation
            Logo {
              localFiles {
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 200, placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
      
      # Query mock data as fallback
      allMockPortfolioData {
        nodes {
          id
          data {
            Name
            Deal_Name
            Notes
            One_Line_Summary
            Sector
            Stage
            Announced
            Close_Date
            Company
            Fund
            Total_Invested
            Entry_Valuation
          }
        }
      }
    }
  `);

  // Component state
  const [portfolioCompanies, setPortfolioCompanies] = useState<PortfolioCompany[]>([]);
  const [fundStatistics, setFundStatistics] = useState<FundStatistics>(MOCK_FUND_STATISTICS);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // Process data when it becomes available
  useEffect(() => {
    try {
      // Determine whether to use real or mock data
      const airtableNodes = data?.allAirtable?.nodes || [];
      const mockNodes = data?.allMockPortfolioData?.nodes || [];
      
      // Use Airtable data if available, otherwise fallback to mock data
      const sourceNodes = airtableNodes.length > 0 ? airtableNodes : mockNodes;
      
      if (sourceNodes.length === 0) {
        console.warn('No data available from Airtable or mock source, using fallback data');
        setPortfolioCompanies(MOCK_PORTFOLIO_DATA);
        setFundStatistics(MOCK_FUND_STATISTICS);
        return;
      }

      // Transform GraphQL data to our portfolio company format
      const transformedData = sourceNodes.map((node: { id: string; data: Record<string, any> }) => 
        transformAirtableToPortfolioCompany({ id: node.id, data: node.data })
      );

      // Set the portfolio data
      setPortfolioCompanies(transformedData);
      
      // Calculate and set statistics
      const stats = calculateFundStatistics(transformedData);
      setFundStatistics(stats);
      
      setHasError(false);
      setErrorMessage(undefined);
      
      console.log(`Successfully loaded ${transformedData.length} portfolio companies`);
    } catch (error) {
      console.error('Error processing Airtable data:', error);
      
      // Set error state
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error processing data');
      
      // Use mock data as fallback
      setPortfolioCompanies(MOCK_PORTFOLIO_DATA);
      setFundStatistics(MOCK_FUND_STATISTICS);
      
      // Show user-friendly error
      toast.error('Failed to load portfolio data. Using mock data instead.');
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  // Memoize context value to prevent unnecessary renders
  const contextValue = useMemo(() => ({
    portfolioCompanies,
    statistics: fundStatistics,
    isLoading,
    hasError,
    errorMessage
  }), [portfolioCompanies, fundStatistics, isLoading, hasError, errorMessage]);

  return (
    <AirtableContext.Provider value={contextValue}>
      {children}
    </AirtableContext.Provider>
  );
};

// ========================================================================
// CUSTOM HOOKS
// ========================================================================

/**
 * Custom hook to access Airtable data from any component
 * @returns The Airtable context data
 */
export const useAirtableData = (): AirtableContextType => {
  const context = useContext(AirtableContext);
  
  if (context === undefined) {
    throw new Error('useAirtableData must be used within an AirtableProvider');
  }
  
  return context;
};

/**
 * Hook to access only portfolio companies
 * @returns Array of portfolio companies
 */
export const usePortfolioCompanies = (): PortfolioCompany[] => {
  const { portfolioCompanies } = useAirtableData();
  return portfolioCompanies;
};

/**
 * Hook to access only fund statistics
 * @returns Fund statistics object
 */
export const useFundStatistics = (): FundStatistics => {
  const { statistics } = useAirtableData();
  return statistics;
};

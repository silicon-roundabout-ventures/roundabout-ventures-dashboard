/**
 * Airtable Integration Module
 * 
 * This module provides a centralized interface for all Airtable-related functionality:
 * - Type definitions
 * - Schema constants
 * - Data transformation
 * - GraphQL fragments
 * - Mock data
 * 
 * @module airtable
 */

// ========================================================================
// TYPE DEFINITIONS
// ========================================================================

/**
 * Represents a portfolio company with all relevant data
 */
export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  oneLiner?: string;
  logo?: string; // Optional string
  logoUrl: string | null; // Must be string | null, never undefined
  website?: string;
  industry?: string[];
  sector?: string;
  stage?: string;
  investmentDate: string | null; // String or null, never undefined
  announced: boolean; // Always required
  fund?: string;
  totalInvested?: number;
  entryValuation?: number;
}

/**
 * Represents aggregate statistics about the fund's portfolio
 */
export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  medianValuation: number;
  investmentsLast12Months: number;
  companiesLast12Months: number;
  industrySplit: Record<string, number>;
  stageSplit: Record<string, number>;
}

/**
 * Represents an Airtable record from GraphQL
 */
export interface AirtableRecord {
  id: string;
  data: Record<string, any>;
}

/**
 * Format for Airtable Logo data
 */
interface AirtableLogo {
  localFiles?: {
    publicURL?: string;
    childImageSharp?: {
      gatsbyImageData?: any;
    }
  }[];
}

// ========================================================================
// SCHEMA CONSTANTS
// ========================================================================

/**
 * Field names used in Airtable
 */
export const AIRTABLE_FIELDS = {
  NAME: 'Name',
  DEAL_NAME: 'Deal_Name',
  NOTES: 'Notes',
  ONE_LINE_SUMMARY: 'One_Line_Summary',
  SECTOR: 'Sector',
  STAGE: 'Stage',
  ANNOUNCED: 'Announced',
  CLOSE_DATE: 'Close_Date',
  WEBSITE: 'Company',
  FUND: 'Fund',
  TOTAL_INVESTED: 'Total_Invested',
  ENTRY_VALUATION: 'Entry_Valuation',
  LOGO: 'Logo'
};

/**
 * GraphQL fragment for Airtable records
 */
export const AIRTABLE_FRAGMENT = `
  fragment AirtableFields on Airtable {
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
`;

// ========================================================================
// MOCK DATA
// ========================================================================

/**
 * Mock portfolio data for development and testing
 */
export const MOCK_PORTFOLIO_DATA: PortfolioCompany[] = [
  {
    id: '1',
    name: 'TechFusion AI',
    description: 'AI-powered data analytics platform for enterprise.',
    oneLiner: 'AI data analytics for enterprise',
    logo: 'https://placehold.co/200x200?text=TF',
    logoUrl: 'https://placehold.co/200x200?text=TF',
    website: 'https://example.com',
    industry: ['Artificial Intelligence', 'Enterprise Software'],
    sector: 'Artificial Intelligence',
    stage: 'Series A',
    investmentDate: '2022-11-12', // String, not null
    announced: true,
    fund: 'Fund I',
    totalInvested: 500000,
    entryValuation: 8000000
  },
  {
    id: '2',
    name: 'Quantum Computing Labs',
    description: 'Cutting-edge quantum computing research.',
    oneLiner: 'Next-gen quantum computing',
    logo: 'https://placehold.co/200x200?text=QC',
    logoUrl: 'https://placehold.co/200x200?text=QC',
    website: 'https://example.net',
    industry: ['Quantum Computing', 'Deep Tech'],
    sector: 'Quantum Computing',
    stage: 'Pre-Seed',
    investmentDate: '2023-01-05', // String, not null
    announced: false,
    fund: 'Fund II',
    totalInvested: 100000,
    entryValuation: 1000000
  },
  {
    id: '3',
    name: 'DataMetrics',
    description: 'Big data analytics for financial institutions.',
    oneLiner: 'Financial analytics platform',
    logo: 'https://placehold.co/200x200?text=DM',
    logoUrl: 'https://placehold.co/200x200?text=DM',
    website: 'https://example.org',
    industry: ['FinTech', 'Data Analytics'],
    sector: 'FinTech',
    stage: 'Seed',
    investmentDate: '2022-09-20', // String, not null
    announced: true,
    fund: 'Fund I',
    totalInvested: 250000,
    entryValuation: 3000000
  },
  {
    id: '4',
    name: 'Stealth FinTech Company',
    description: 'A stealth company in the FinTech sector.',
    logo: undefined,
    logoUrl: null,
    website: '',
    industry: ['FinTech'],
    sector: 'FinTech',
    stage: 'Pre-seed',
    investmentDate: '2023-09-05',
    announced: false,
    fund: 'Fund I',
    totalInvested: 250000,
    entryValuation: 3000000
  },
  {
    id: '5',
    name: 'Stealth DeepTech Company',
    description: 'A stealth company in the DeepTech sector.',
    logo: undefined,
    logoUrl: null,
    website: '',
    industry: ['DeepTech', 'Manufacturing'],
    sector: 'DeepTech',
    stage: 'Seed',
    investmentDate: '2023-10-30',
    announced: false,
    fund: 'Fund I',
    totalInvested: 600000,
    entryValuation: 10000000
  }
];

/**
 * Mock fund statistics
 */
export const MOCK_FUND_STATISTICS: FundStatistics = {
  totalInvestments: 2100000, // $2.1M
  totalCompanies: 5,
  averageInvestment: 420000, // $420K
  medianValuation: 7000000,  // $7M median valuation
  investmentsLast12Months: 1700000, // $1.7M invested in last 12 months
  companiesLast12Months: 4, // 4 new companies in last 12 months
  industrySplit: {
    'Artificial Intelligence': 40,
    'Enterprise Software': 20,
    'CleanTech': 20,
    'IoT': 10,
    'HealthTech': 20,
    'FinTech': 20,
    'DeepTech': 10,
    'Manufacturing': 10
  },
  stageSplit: {
    'Pre-seed': 20,
    'Seed': 60,
    'Series A': 20
  }
};

// ========================================================================
// DATA TRANSFORMATION FUNCTIONS
// ========================================================================

/**
 * Transforms an Airtable record into a standardized PortfolioCompany object
 * @param record The Airtable record from GraphQL query
 * @returns A standardized PortfolioCompany object
 */
export function transformAirtableToPortfolioCompany(record: AirtableRecord): PortfolioCompany {
  try {
    // Defensive check for required fields
    if (!record || !record.data) {
      throw new Error('Invalid Airtable record: missing data');
    }
    
    const data = record.data;
    
    // Get company name - prioritize Deal_Name, fallback to constructing from other fields
    const nameArray = Array.isArray(data.Name) ? data.Name : [];
    const companyArray = Array.isArray(data.Company) ? data.Company : [];
    
    const companyName = data.Deal_Name || 
                       (companyArray.length > 0 ? String(companyArray[0] || '').split('.')[0] : null) || 
                       (nameArray.length > 0 ? String(nameArray[0] || '') : null) ||
                       'Unnamed Company';
    
    // Get logo if available
    const logoFile = data.Logo ? (data.Logo as AirtableLogo).localFiles?.[0] : undefined;
    const logoUrl = logoFile 
      ? (logoFile.publicURL || 
         (logoFile.childImageSharp?.gatsbyImageData 
           ? logoFile.childImageSharp.gatsbyImageData 
           : null))
      : null;
    
    // Format website from Company field (domain)
    let website = '';
    if (companyArray.length > 0) {
      const domain = String(companyArray[0] || '').trim();
      if (domain && !domain.startsWith('http')) {
        website = `https://${domain}`;
      } else {
        website = domain;
      }
    }
    
    // Handle stealth company privacy protection
    const isAnnounced = data.Announced === 'Yes';
    const description = String(data.One_Line_Summary || data.Notes || 'No description available');
    const sector = String(data.Sector || 'Unspecified');
    const stage = String(data.Stage || 'Unspecified');
    
    // Parse and format investment date
    let investmentDate = null;
    if (data.Close_Date) {
      try {
        // Attempt to parse and format the date
        const date = new Date(String(data.Close_Date));
        if (!isNaN(date.getTime())) {
          investmentDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        }
      } catch (error) {
        console.warn(`Failed to parse date for ${companyName}:`, error);
      }
    }
    
    // Determine industry array from sector string
    const industryArray = sector ? [sector] : ['Unspecified'];
    
    // Create standardized company object with privacy protections
    return {
      id: record.id,
      name: isAnnounced ? companyName : `Stealth ${sector} Company`,
      description: isAnnounced ? description : `A stealth company in the ${sector} sector`,
      oneLiner: isAnnounced ? String(data.One_Line_Summary || '') : undefined,
      sector,
      industry: industryArray,
      stage,
      announced: isAnnounced,
      investmentDate,
      website: isAnnounced ? website : '',
      logoUrl: isAnnounced ? (logoUrl || null) : null, // Guarantee string | null
      logo: isAnnounced ? logoUrl : undefined, // Optional string | undefined
      // Ensure numeric values are properly parsed
      totalInvested: typeof data.Total_Invested === 'number' ? data.Total_Invested : 
                    data.Total_Invested ? Number(data.Total_Invested) : undefined,
      entryValuation: typeof data.Entry_Valuation === 'number' ? data.Entry_Valuation : 
                     data.Entry_Valuation ? Number(data.Entry_Valuation) : undefined,
      fund: typeof data.Fund === 'string' ? data.Fund : undefined
    };
  } catch (error) {
    console.error('Error transforming Airtable record:', error, 
      record ? `ID: ${record.id}` : 'Record was undefined');
    
    // Return fallback default object on error
    return {
      id: record?.id || 'error-id',
      name: 'Error: Could not load company',
      description: 'There was an error loading this company data',
      sector: 'Unknown',
      industry: ['Unknown'],
      stage: 'Unknown',
      announced: false,
      investmentDate: null, // Must be null not undefined
      website: '',
      logoUrl: null, // Must be null per interface
      logo: undefined, // Optional property
      // Ensure these optional properties remain undefined, not null
      totalInvested: undefined,
      entryValuation: undefined,
      fund: undefined
    };
  }
}

/**
 * Calculates fund statistics from a list of portfolio companies
 * @param companies List of portfolio companies
 * @returns Fund statistics
 */
export function calculateFundStatistics(companies: PortfolioCompany[]): FundStatistics {
  // Default return if no companies
  if (!companies || companies.length === 0) {
    return MOCK_FUND_STATISTICS;
  }

  try {
    const totalCompanies = companies.length;
    
    // Calculate total investments
    const totalInvestments = companies.reduce((sum, company) => 
      sum + (company.totalInvested || 0), 0);
    
    // Calculate average investment
    const averageInvestment = totalCompanies > 0 
      ? totalInvestments / totalCompanies 
      : 0;
    
    // Calculate median valuation
    const sortedValuations = companies
      .map(c => c.entryValuation || 0)
      .sort((a, b) => a - b);
    
    const medianValuation = sortedValuations.length > 0
      ? sortedValuations[Math.floor(sortedValuations.length / 2)]
      : 0;
    
    // Calculate investments in last 12 months
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);
    
    const recentCompanies = companies.filter(company => {
      if (!company.investmentDate) return false;
      const investDate = new Date(company.investmentDate);
      return investDate >= lastYear;
    });
    
    const investmentsLast12Months = recentCompanies.reduce((sum, company) => 
      sum + (company.totalInvested || 0), 0);
    
    const companiesLast12Months = recentCompanies.length;
    
    // Calculate industry distribution
    const industrySplit: Record<string, number> = {};
    companies.forEach(company => {
      if (company.industry && company.industry.length > 0) {
        company.industry.forEach(ind => {
          industrySplit[ind] = (industrySplit[ind] || 0) + 1;
        });
      }
    });
    
    // Convert counts to percentages
    Object.keys(industrySplit).forEach(key => {
      industrySplit[key] = Math.round((industrySplit[key] / totalCompanies) * 100);
    });
    
    // Calculate stage distribution
    const stageSplit: Record<string, number> = {};
    companies.forEach(company => {
      if (company.stage) {
        stageSplit[company.stage] = (stageSplit[company.stage] || 0) + 1;
      }
    });
    
    // Convert counts to percentages
    Object.keys(stageSplit).forEach(key => {
      stageSplit[key] = Math.round((stageSplit[key] / totalCompanies) * 100);
    });
    
    return {
      totalInvestments,
      totalCompanies,
      averageInvestment,
      medianValuation,
      investmentsLast12Months,
      companiesLast12Months,
      industrySplit,
      stageSplit
    };
  } catch (error) {
    console.error('Error calculating fund statistics:', error);
    return MOCK_FUND_STATISTICS;
  }
}

// ========================================================================
// DATA FETCHING FUNCTIONS
// ========================================================================

/**
 * Fetches portfolio companies from Airtable
 * Uses a combination of GraphQL data (if available) and API calls
 * with fallback mechanisms
 * 
 * @returns Promise resolving to an array of PortfolioCompany objects
 */
export async function fetchPortfolioCompanies(): Promise<PortfolioCompany[]> {
  try {
    // In a real Gatsby app, this would fetch from the GraphQL layer
    // For client-side, we would use the Airtable API directly
    
    // This is a placeholder approach for development that supports both SSG and CSR
    if (typeof window !== 'undefined') {
      // Client-side (CSR): Try to get from window.__PORTFOLIO_DATA__ if it exists (SSG data)
      // or fetch directly from API as fallback
      const windowWithData = window as Window & {
        __PORTFOLIO_DATA__?: PortfolioCompany[]
      };
      
      if (windowWithData.__PORTFOLIO_DATA__) {
        return windowWithData.__PORTFOLIO_DATA__;
      }
      
      // Fallback to mock data or API call if not in window
      // In a real app, this would use authenticated Airtable API calls
      return getMockPortfolioData();
    } else {
      // Server-side (SSG): This would use Gatsby's data layer
      // For this implementation, return mock data
      return getMockPortfolioData();
    }
  } catch (error) {
    console.error('Error fetching portfolio companies:', error);
    throw new Error('Failed to fetch portfolio companies');
  }
}

/**
 * Generate mock portfolio data for testing and development
 * @returns Array of mock portfolio companies
 */
function getMockPortfolioData(): PortfolioCompany[] {
  return [
    {
      id: 'rec1',
      name: 'Quantum AI',
      description: 'Quantum computing-powered AI platform for analyzing large datasets.',
      oneLiner: 'Quantum AI for big data',
      logoUrl: 'https://placehold.co/100x100?text=QAI',
      website: 'https://example.com/quantum',
      industry: ['AI', 'Quantum Computing'],
      sector: 'Deep Tech',
      stage: 'Seed',
      investmentDate: '2023-06-15',
      announced: true,
      fund: 'Fund I',
      totalInvested: 500000,
      entryValuation: 5000000
    },
    {
      id: 'rec2',
      name: 'BioMimetic Systems',
      description: 'Robotics platform inspired by biological systems for improved mobility and adaptability.',
      oneLiner: 'Nature-inspired robotics',
      logoUrl: 'https://placehold.co/100x100?text=BMS',
      website: 'https://example.com/biomimetic',
      industry: ['Robotics', 'Biomimetics'],
      sector: 'Robotics',
      stage: 'Pre-seed',
      investmentDate: '2023-03-10',
      announced: true,
      fund: 'Fund I',
      totalInvested: 250000,
      entryValuation: 2500000
    },
    {
      id: 'rec3',
      name: 'Stealth Cybersecurity',
      description: 'Next-generation endpoint security using machine learning.',
      logoUrl: null,
      sector: 'Cybersecurity',
      stage: 'Seed',
      investmentDate: '2023-08-01',
      announced: false,
      fund: 'Fund I',
      totalInvested: 750000,
      entryValuation: 7500000
    },
    {
      id: 'rec4',
      name: 'DataMesh',
      description: 'Decentralized data infrastructure for secure sharing of sensitive information.',
      oneLiner: 'Secure data sharing infrastructure',
      logoUrl: 'https://placehold.co/100x100?text=DM',
      website: 'https://example.com/datamesh',
      industry: ['Data Infrastructure', 'Privacy'],
      sector: 'Data',
      stage: 'Series A',
      investmentDate: '2022-11-15',
      announced: true,
      fund: 'Fund I',
      totalInvested: 1000000,
      entryValuation: 15000000
    },
    {
      id: 'rec5',
      name: 'Stealth Materials',
      description: 'Advanced materials company developing sustainable alternatives.',
      logoUrl: null,
      sector: 'Materials',
      stage: 'Pre-seed',
      investmentDate: '2023-09-20',
      announced: false,
      fund: 'Fund I',
      totalInvested: 200000,
      entryValuation: 1500000
    }
  ];
}

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================

/**
 * Format a currency value to a readable string
 * @param value The numeric value to format
 * @param currency The currency symbol to use (default: £)
 * @returns Formatted currency string
 */
export function formatCurrency(value?: number, currency: string = '£'): string {
  if (value === undefined || value === null) return `${currency}0`;
  
  try {
    // Handle different magnitude formats
    if (value >= 1000000) {
      return `${currency}${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${currency}${(value / 1000).toFixed(1)}K`;
    } else {
      return `${currency}${value.toFixed(0)}`;
    }
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency}0`;
  }
}

/**
 * Safely extract a date string from various input formats
 * @param dateInput The date input (string, Date object, etc)
 * @param fallback Optional fallback value if parsing fails
 * @returns A formatted date string or the fallback value
 */
export function formatDate(dateInput?: string | Date | null, fallback: string = 'N/A'): string {
  if (!dateInput) return fallback;
  
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    // Check if date is valid
    if (isNaN(date.getTime())) return fallback;
    
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn('Error formatting date:', error);
    return fallback;
  }
}

/**
 * Generate a placeholder logo URL with the first letter of a name
 * @param name Company name
 * @returns URL for a placeholder logo
 */
export function generatePlaceholderLogo(name: string): string {
  const firstLetter = name.charAt(0).toUpperCase();
  return `https://placehold.co/200x200?text=${firstLetter}`;
}

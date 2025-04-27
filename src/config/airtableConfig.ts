import { graphql } from 'gatsby';
import Airtable from 'airtable';

// Environment & connection
export const AIRTABLE_API_KEY = process.env.GATSBY_AIRTABLE_API_KEY;
export const AIRTABLE_BASE_ID = process.env.GATSBY_AIRTABLE_BASE_ID;

// Check if Airtable is configured
export const isAirtableConfigured = () => 
  !!AIRTABLE_API_KEY && !!AIRTABLE_BASE_ID;

// Base instance (only create if configured)
export const getAirtableBase = () => {
  if (!isAirtableConfigured()) return null;
  return new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!);
};

// Table names (single source of truth)
export const TABLES = {
  PORTFOLIO: 'Portfolio Companies',
  FUNDS: 'Funds',
  INVESTMENTS: 'Investments',
} as const;

// Field mappings (single source of truth)
export const FIELDS = {
  PORTFOLIO: {
    ID: 'id',
    NAME: 'Deal_Name',
    DESCRIPTION: 'Summary',
    ONE_LINER: 'One_Line_Summary',
    LOGO: 'Logo',
    PHOTO: 'Photo',
    WEBSITE: 'Company',
    INDUSTRY: 'Sector',
    STAGE: 'Stage',
    INVESTMENT_DATE: 'Close_Date',
    ANNOUNCED: 'Announced',
    FUND: 'Fund_Numeral',
    DEAL_VALUE: 'Deal_Value',
    TOTAL_INVESTED: 'Total_Invested',
    ENTRY_VALUATION: 'Entry_Valuation',
  },
  FUNDS: {
    // Add fund fields here
  },
  INVESTMENTS: {
    // Add investment fields here
  },
} as const;

// Airtable record type definitions
export interface AirtableRecord<T> {
  id: string;
  fields: T;
}

// Portfolio raw fields from Airtable
export interface PortfolioFields {
  [FIELDS.PORTFOLIO.NAME]: string;
  [FIELDS.PORTFOLIO.DESCRIPTION]?: string;
  [FIELDS.PORTFOLIO.ONE_LINER]?: string;
  [FIELDS.PORTFOLIO.LOGO]?: { url: string }[];
  [FIELDS.PORTFOLIO.PHOTO]?: { url: string }[];
  [FIELDS.PORTFOLIO.WEBSITE]?: string;
  [FIELDS.PORTFOLIO.INDUSTRY]?: string[];
  [FIELDS.PORTFOLIO.STAGE]?: string;
  [FIELDS.PORTFOLIO.INVESTMENT_DATE]?: string;
  [FIELDS.PORTFOLIO.ANNOUNCED]?: boolean;
  [FIELDS.PORTFOLIO.FUND]?: string | number;
  [FIELDS.PORTFOLIO.DEAL_VALUE]?: number;
  [FIELDS.PORTFOLIO.TOTAL_INVESTED]?: number;
  [FIELDS.PORTFOLIO.ENTRY_VALUATION]?: number | string;
}

// Normalized application types
export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  oneLiner?: string;
  logo: string;
  photo?: string;
  website: string;
  industry: string[];
  stage: string;
  investmentDate: string;
  announced: boolean;
  fund?: string | number;
  dealValue?: number;
  totalInvested?: number;
  entryValuation?: number | string;
}

export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  medianValuation: number;
  investmentsLast12Months: number;
  companiesLast12Months: number;
}

// GraphQL fragments - using static strings for Gatsby compatibility
export const portfolioFragment = graphql`
  fragment PortfolioCompanyFields on Airtable {
    id
    table
    recordId
    data {
      Deal_Name
      Summary
      One_Line_Summary
      Company
      domain__from_Company_
      Sector
      Stage
      Close_Date
      Announced
      Fund_numeral
      Deal_Value
      Total_Invested
      Entry_Valuation
      Logo {
        localFiles {
          publicURL
        }
      }
      Photo {
        localFiles {
          publicURL
        }
      }
    }
  }
`;

export const fundsFragment = graphql`
  fragment FundFields on Airtable {
    id
    data {
      Name
      # Add additional fund fields here as needed
    }
  }
`;

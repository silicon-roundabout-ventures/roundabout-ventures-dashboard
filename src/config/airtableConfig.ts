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
  PORTFOLIO: 'Startups',
  FUNDS: 'SRV_Funds'
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
    WEBSITE: 'domain__from_Company_',
    COMPANY: 'Company',
    INDUSTRY: 'Sector',
    STAGE: 'Stage',
    INVESTMENT_DATE: 'Close_Date',
    ANNOUNCED: 'Announced',
    FUND: 'Fund_numeral',
    DEAL_VALUE: 'Deal_Value',
    TOTAL_INVESTED: 'Total_Invested',
    ENTRY_VALUATION: 'Entry_Valuation',
    TECHNOLOGY_TYPE: 'Technology_Type',
    MAIN_HEADQUARTER: 'Main_Headquarter',
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

// Portfolio raw fields from Airtable (note that lookup fields in airtable are served as arrays if you allow multiple linked records)
export interface PortfolioFields {
  [FIELDS.PORTFOLIO.NAME]: string;
  [FIELDS.PORTFOLIO.DESCRIPTION]?: string;
  [FIELDS.PORTFOLIO.ONE_LINER]?: string;
  [FIELDS.PORTFOLIO.LOGO]?: { url: string }[];
  [FIELDS.PORTFOLIO.PHOTO]?: { url: string }[];
  [FIELDS.PORTFOLIO.WEBSITE]?: string | string[];
  [FIELDS.PORTFOLIO.COMPANY]?: string;
  [FIELDS.PORTFOLIO.INDUSTRY]?: string[];
  [FIELDS.PORTFOLIO.STAGE]?: string;
  [FIELDS.PORTFOLIO.INVESTMENT_DATE]?: string;
  [FIELDS.PORTFOLIO.ANNOUNCED]?: boolean;
  [FIELDS.PORTFOLIO.FUND]?: string | number | (string | number)[];
  [FIELDS.PORTFOLIO.DEAL_VALUE]?: number;
  [FIELDS.PORTFOLIO.TOTAL_INVESTED]?: number;
  [FIELDS.PORTFOLIO.ENTRY_VALUATION]?: number | string;
  [FIELDS.PORTFOLIO.TECHNOLOGY_TYPE]?: string;
  [FIELDS.PORTFOLIO.MAIN_HEADQUARTER]?: string;
}

// Normalized application types (to map airtable raw data into an object for use in this website's components)
export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  oneLiner?: string;
  logo: string;
  photo?: string;
  website: string;
  technologyType?: string;
  headquarter?: string;
  industry: string[];
  stage: string;
  investmentDate: string;
  announced: boolean;
  fund?: string | number | (string | number)[];
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

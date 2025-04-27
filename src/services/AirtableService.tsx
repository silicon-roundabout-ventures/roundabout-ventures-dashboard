import { graphql, useStaticQuery } from 'gatsby';
import { toast } from "sonner";
import { LRUCache } from 'lru-cache';
import { 
  getAirtableBase, 
  isAirtableConfigured,
  TABLES, 
  FIELDS,
  PortfolioFields,
  PortfolioCompany,
  FundStatistics,
  AirtableRecord,
  portfolioFragment
} from '../config/airtableConfig';
const { getMockPortfolioCompanies, getMockFundStatistics } = require('../mocks/mockPortfolioData');

// Cache instance
const cache = new LRUCache<string, any>({
  max: 50,
  ttl: 1000 * 60 * 5, // 5 minutes
});


// Normalization functions
// Properly type the record to include data property from GraphQL queries
export interface AirtableGraphQLRecord extends AirtableRecord<PortfolioFields> {
  data?: {
    Deal_Name?: string;
    Summary?: string;
    One_Line_Summary?: string;
    Logo?: { 
      localFiles?: {
        publicURL?: string;
      }[];
    };
    Photo?: { 
      localFiles?: {
        publicURL?: string;
      }[];
    };
    Company?: string;
    Sector?: string[];
    Stage?: string;
    Close_Date?: string;
    Announced?: string | boolean;
    Fund_numeral?: string | number;
    Deal_Value?: number;
    Total_Invested?: number;
    Entry_Valuation?: number | string;
  };
}

export const normalizePortfolioCompany = (record: AirtableGraphQLRecord): PortfolioCompany => {
  const fields = record.fields || {};
  const data = record.data; // GraphQL returns a data field with nested fields
  
  // For static GraphQL queries
  if (data) {
    return {
      id: record.id,
      name: data.Deal_Name || '',
      description: data.Summary || '',
      oneLiner: data.One_Line_Summary || undefined,
      logo: data.Logo?.localFiles?.[0]?.publicURL || '',
      photo: data.Photo?.localFiles?.[0]?.publicURL || undefined,
      website: data.Company || '',
      industry: data.Sector || [],
      stage: data.Stage || '',
      investmentDate: data.Close_Date || '',
      announced: data.Announced === true || data.Announced === 'Yes',
      fund: data.Fund_numeral || undefined,
      dealValue: data.Deal_Value || undefined,
      totalInvested: data.Total_Invested || undefined,
      entryValuation: data.Entry_Valuation || undefined,
    };
  }
  
  // For direct Airtable API calls
  return {
    id: record.id,
    name: fields[FIELDS.PORTFOLIO.NAME] || '',
    description: fields[FIELDS.PORTFOLIO.DESCRIPTION] || '',
    oneLiner: fields[FIELDS.PORTFOLIO.ONE_LINER] || undefined,
    logo: fields[FIELDS.PORTFOLIO.LOGO]?.[0]?.url || '',
    photo: fields[FIELDS.PORTFOLIO.PHOTO]?.[0]?.url || undefined,
    website: fields[FIELDS.PORTFOLIO.WEBSITE] || '',
    industry: fields[FIELDS.PORTFOLIO.INDUSTRY] || [],
    stage: fields[FIELDS.PORTFOLIO.STAGE] || '',
    investmentDate: fields[FIELDS.PORTFOLIO.INVESTMENT_DATE] || '',
    announced: fields[FIELDS.PORTFOLIO.ANNOUNCED] || false,
    fund: fields[FIELDS.PORTFOLIO.FUND] || undefined,
    dealValue: fields[FIELDS.PORTFOLIO.DEAL_VALUE] || undefined,
    totalInvested: fields[FIELDS.PORTFOLIO.TOTAL_INVESTED] || undefined,
    entryValuation: fields[FIELDS.PORTFOLIO.ENTRY_VALUATION] || undefined,
  };
};

// Gatsby static query hooks
export const usePortfolioCompanies = (): PortfolioCompany[] => {
  const data = useStaticQuery(graphql`
    query PortfolioCompaniesQuery {
      allAirtable(filter: {table: {eq: "Startups"}}) {
        nodes {
          ...PortfolioCompanyFields
        }
      }
    }
  `);

  const nodes = data?.allAirtable?.nodes || [];
  
  if (nodes.length === 0) {
    console.warn('No portfolio companies found in GraphQL data, using mock data');
    return getMockPortfolioCompanies();
  }
  
  return nodes.map(normalizePortfolioCompany);
};

export const useFundStatistics = (): FundStatistics => {
  // In a full implementation, this would query fund data from GraphQL
  // For now, return mock data
  return getMockFundStatistics();
};

// Service methods for runtime data access
export class AirtableService {
  // Get all portfolio companies (with caching)
  static async getPortfolioCompanies(): Promise<PortfolioCompany[]> {
    const cacheKey = 'portfolio-companies';
    
    // Try cache first
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as PortfolioCompany[];
    }
    
    // Check if Airtable is configured
    if (!isAirtableConfigured()) {
      console.warn('Airtable not configured, using mock data');
      return getMockPortfolioCompanies();
    }
    
    try {
      const base = getAirtableBase();
      if (!base) {
        throw new Error('Airtable base not initialized');
      }
      
      const records = await base(TABLES.PORTFOLIO)
        .select({
          fields: Object.values(FIELDS.PORTFOLIO),
        })
        .all();
      
      const companies = records.map(record => normalizePortfolioCompany(record as any));
      
      // Update cache
      cache.set(cacheKey, companies);
      
      return companies;
    } catch (error) {
      console.error('Failed to fetch portfolio companies:', error);
      toast.error('Failed to load portfolio data');
      
      // Fallback to mock data
      return getMockPortfolioCompanies();
    }
  }
  
  // Get fund statistics (with caching)
  static async getFundStatistics(): Promise<FundStatistics> {
    const cacheKey = 'fund-statistics';
    
    // Try cache first
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as FundStatistics;
    }
    
    // Check if Airtable is configured
    if (!isAirtableConfigured()) {
      console.warn('Airtable not configured, using mock data');
      return getMockFundStatistics();
    }
    
    try {
      // You would implement the actual Airtable fetch here
      // For now, returning mock data
      const stats = getMockFundStatistics();
      
      // Update cache
      cache.set(cacheKey, stats);
      
      return stats;
    } catch (error) {
      console.error('Failed to fetch fund statistics:', error);
      toast.error('Failed to load fund statistics');
      
      // Fallback to mock data
      return getMockFundStatistics();
    }
  }
  
  // Invalidate caches when needed
  static clearCache(): void {
    cache.clear();
  }
}

export default AirtableService;

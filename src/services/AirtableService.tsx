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
  AirtableRecord
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
    Logo?: { localFiles?: { publicURL?: string }[] };
    Photo?: { localFiles?: { publicURL?: string }[] };
    domain__from_Company_?: string | string[];
    Company?: string;
    Sector?: string[];
    Stage?: string;
    Close_Date?: string;
    Announced?: string | boolean;
    Fund_numeral?: string | number | (string | number)[];
    Deal_Value?: number;
    Total_Invested?: number;
    Entry_Valuation?: number | string;
    Technology_Type?: string;
    Main_Headquarter?: string;
    Details?: string;
  };
}

export const normalizePortfolioCompany = (record: AirtableGraphQLRecord): PortfolioCompany => {
  const fields = record.fields || {};
  const data = record.data; // GraphQL returns a data field with nested fields
  
  // For static GraphQL queries
  if (data) {
    const isAnnounced = data.Announced === true || data.Announced === 'Yes';
    if (!isAnnounced) {
      // Stealth mode: strip sensitive data
      return {
        id: record.id,
        name: '🔒 Stealth',
        description: data.Details || '',
        details: undefined,
        oneLiner: undefined,
        logo: '',
        photo: undefined,
        website: '',
        technologyType: undefined,
        headquarter: undefined,
        industry: data.Sector || [],
        stage: data.Stage || '',
        investmentDate: data.Close_Date || '',
        announced: false,
        fund: undefined,
        dealValue: undefined,
        totalInvested: undefined,
        entryValuation: undefined,
      };
    }
    // Announced companies: full public data
    return {
      id: record.id,
      name: data.Deal_Name || '',
      description: data.Summary || '',
      details: data.Details || undefined,
      oneLiner: data.One_Line_Summary || undefined,
      logo: data.Logo?.localFiles?.[0]?.publicURL || '',
      photo: data.Photo?.localFiles?.[0]?.publicURL || undefined,
      website: (() => {
        const rawValue = Array.isArray(data.domain__from_Company_)
          ? data.domain__from_Company_[0]
          : data.domain__from_Company_;
        if (!rawValue || typeof rawValue !== 'string') return '';
        return /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;
      })(),
      technologyType: data.Technology_Type || undefined,
      headquarter: data.Main_Headquarter || undefined,
      industry: data.Sector || [],
      stage: data.Stage || '',
      investmentDate: data.Close_Date || '',
      announced: true,
      fund: data.Fund_numeral || undefined,
      dealValue: data.Deal_Value || undefined,
      totalInvested: data.Total_Invested || undefined,
      entryValuation: data.Entry_Valuation || undefined,
    };
  }
  
  // For direct Airtable API calls
  return {
    id: record.id,
    // Hide all sensitive fields in API mode for stealth if not announced
    name: fields[FIELDS.PORTFOLIO.ANNOUNCED] ? fields[FIELDS.PORTFOLIO.NAME] || '' : '🔒 Stealth',
    description: fields[FIELDS.PORTFOLIO.ANNOUNCED] ? fields[FIELDS.PORTFOLIO.DESCRIPTION] || '' : fields[FIELDS.PORTFOLIO.DETAILS] || '',
    oneLiner: fields[FIELDS.PORTFOLIO.ONE_LINER] || undefined,
    logo: fields[FIELDS.PORTFOLIO.LOGO]?.[0]?.url || '',
    photo: fields[FIELDS.PORTFOLIO.PHOTO]?.[0]?.url || undefined,
    website: fields[FIELDS.PORTFOLIO.ANNOUNCED]
      ? (() => {
          const rawValue = Array.isArray(fields[FIELDS.PORTFOLIO.WEBSITE])
            ? fields[FIELDS.PORTFOLIO.WEBSITE]?.[0]
            : fields[FIELDS.PORTFOLIO.WEBSITE];
          if (!rawValue || typeof rawValue !== 'string') return '';
          return /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;
        })()
      : '',
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

// Gatsby static query hook
export function usePortfolioCompanies(): PortfolioCompany[] {
  const data = useStaticQuery<{ allAirtable: { nodes: AirtableGraphQLRecord[] } }>(graphql`
    query PortfolioPageQuery {
      allAirtable(filter: { table: { eq: "Startups" } }) {
        nodes {
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
            Technology_Type
            Main_Headquarter
            Details
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
      }
    }
  `);
  const nodes = data.allAirtable.nodes;
  if (!nodes || nodes.length === 0) {
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

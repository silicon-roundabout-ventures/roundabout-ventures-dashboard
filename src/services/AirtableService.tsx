import { useStaticQuery, graphql } from 'gatsby';
import { toast } from "sonner";
import { LRUCache } from 'lru-cache';
const cache = new LRUCache<string, any>({
  max: 50,
  ttl: 1000 * 60 * 5,
});
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

/*
* AirtableService.tsx
* 
* This file contains the AirtableService class which is used to fetch data from Airtable.
* It uses the Airtable API to fetch data from Airtable and returns it as a Promise.
* If you want to edit or add a field to fetch, make sure you update both the query and type here and the respective fields in airtableConfig.ts
* 
*/

// Fetch portfolio companies via GraphQL at build time
export function usePortfolioCompanies(): PortfolioCompany[] {
  const data = useStaticQuery<{ allAirtable: { nodes: AirtableGraphQLRecord[] } }>(graphql`
    query PortfolioCompaniesQuery {
      allAirtable(filter: { table: { eq: "Startups" } }) {
        nodes {
          id
          data {
            Deal_Name
            Summary
            One_Line_Summary
            domain__from_Company_
            Logo { localFiles { publicURL } }
            Photo { localFiles { publicURL } }
            Sector
            Stage
            Close_Date
            Announced
            Fund_numeral
            Deal_Value
            Total_Invested
            GBP_Final_Ticket_Invested
            Entry_Valuation
            GBP_Initial_Round_Pre_Money_Valuation
            Technology_Type
            Main_Headquarter
            Latest_Follow_on_Round
            Current_Status
          }
        }
      }
    }
  `);
  return data.allAirtable.nodes.map(normalizePortfolioCompany);
};

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
    GBP_Final_Ticket_Invested?: number;
    Entry_Valuation?: number | string;
    GBP_Initial_Round_Pre_Money_Valuation?: number;
    Technology_Type?: string;
    Main_Headquarter?: string;
    Latest_Follow_on_Round?: string;
    Current_Status?: string;
  };
}

export function normalizePortfolioCompany(record: AirtableGraphQLRecord): PortfolioCompany {
  const fields = record.fields as Record<string, any> || {};
  const data = record.data || {};
  // Pick from data or fallback to API fields
  const pick = (dataVal: any, fieldKey: string): any =>
    dataVal !== undefined ? dataVal : fields[fieldKey];
  // Normalize website
  const rawDomain = pick(data.domain__from_Company_, FIELDS.PORTFOLIO.WEBSITE);
  const domain = Array.isArray(rawDomain) ? rawDomain[0] : rawDomain;
  const website = domain && typeof domain === 'string'
    ? (/^https?:\/\//i.test(domain) ? domain : `https://${domain}`)
    : '';
  // Announced flag
  const rawAnnounced = pick(data.Announced, FIELDS.PORTFOLIO.ANNOUNCED);
  const toBoolAnnounced = (val: boolean | string) =>
    typeof val === 'boolean' ? val : (typeof val === 'string' && val.toLowerCase() === 'yes');
  // Build base company
  const base: PortfolioCompany = {
    id: record.id,
    name: pick(data.Deal_Name, FIELDS.PORTFOLIO.NAME) || '',
    description: pick(data.Summary, FIELDS.PORTFOLIO.DESCRIPTION) || '',
    oneLiner: pick(data.One_Line_Summary, FIELDS.PORTFOLIO.ONE_LINER),
    logo: pick(data.Logo?.localFiles?.[0]?.publicURL, FIELDS.PORTFOLIO.LOGO) || '',
    photo: pick(data.Photo?.localFiles?.[0]?.publicURL, FIELDS.PORTFOLIO.PHOTO),
    website,
    technologyType: pick(data.Technology_Type, FIELDS.PORTFOLIO.TECHNOLOGY_TYPE),
    headquarter: pick(data.Main_Headquarter, FIELDS.PORTFOLIO.MAIN_HEADQUARTER),
    industry: pick(data.Sector, FIELDS.PORTFOLIO.INDUSTRY) || [],
    stage: pick(data.Stage, FIELDS.PORTFOLIO.STAGE) || '',
    investmentDate: pick(data.Close_Date, FIELDS.PORTFOLIO.INVESTMENT_DATE) || '',
    announced: toBoolAnnounced(rawAnnounced),
    fund: pick(data.Fund_numeral, FIELDS.PORTFOLIO.FUND),
    dealValue: pick(data.Deal_Value, FIELDS.PORTFOLIO.DEAL_VALUE),
    gbpFinalTicketInvested: pick(data.GBP_Final_Ticket_Invested, FIELDS.PORTFOLIO.GBP_FINAL_TICKET_INVESTED),
    gbpInitialRoundPreMoneyValuation: pick(data.GBP_Initial_Round_Pre_Money_Valuation, FIELDS.PORTFOLIO.GBP_INITIAL_ROUND_PRE_MONEY_VALUATION),
    totalInvested: pick(data.Total_Invested, FIELDS.PORTFOLIO.TOTAL_INVESTED),
    entryValuation: pick(data.Entry_Valuation, FIELDS.PORTFOLIO.ENTRY_VALUATION),
    latestFollowOnRound: pick(data.Latest_Follow_on_Round, FIELDS.PORTFOLIO.LATEST_FOLLOW_ON_ROUND),
    currentStatus: pick(data.Current_Status, FIELDS.PORTFOLIO.CURRENT_STATUS),
  };
  // Stealth sanitization
  if (!base.announced) {
    return {
      ...base,
      name: '🔒 Stealth',
      description: 'Details to be announced soon...',
      logo: '',
      photo: undefined,
      website: '',
    };
  }
  return base;
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

// Build-time helpers
export async function fetchAllRawCompanies(): Promise<PortfolioCompany[]> {
  return AirtableService.getPortfolioCompanies();
}

export function computeStats(
  companies: PortfolioCompany[]
): FundStatistics {
  const filtered = companies.filter(c => c.announced);
  let totalInvestment = 0;
  let investmentsCount = 0;
  filtered.forEach(c => {
    if (c.gbpFinalTicketInvested) {
      totalInvestment += c.gbpFinalTicketInvested;
      investmentsCount++;
    }
  });
  if (investmentsCount === 0 && filtered.length > 0) {
    totalInvestment = filtered.length * 500000;
  }

  const averageInvestment =
    investmentsCount > 0
      ? totalInvestment / investmentsCount
      : filtered.length > 0
      ? totalInvestment / filtered.length
      : 0;

  const vals: number[] = [];
  filtered.forEach(c => {
    const v = c.gbpInitialRoundPreMoneyValuation;
    if (v !== undefined) {
      if (typeof v === 'number') vals.push(v);
      else {
        const m = v.match(/\d+(\.\d+)?/);
        if (m) {
          let num = parseFloat(m[0]);
          if (v.includes('M')) num *= 1000000;
          else if (v.includes('K')) num *= 1000;
          vals.push(num);
        }
      }
    }
  });

  let medianValuation = 0;
  if (vals.length) {
    vals.sort((a, b) => a - b);
    const mid = Math.floor(vals.length / 2);
    medianValuation =
      vals.length % 2 === 0
        ? (vals[mid - 1] + vals[mid]) / 2
        : vals[mid];
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  let investmentsLast12Months = 0;
  let companiesLast12Months = 0;
  filtered.forEach(c => {
    if (c.investmentDate) {
      const d = new Date(c.investmentDate);
      if (d >= oneYearAgo) {
        companiesLast12Months++;
        investmentsLast12Months += c.totalInvested ?? 500000;
      }
    }
  });

  return {
    totalInvestments: totalInvestment,
    totalCompanies: filtered.length,
    averageInvestment,
    medianValuation,
    investmentsLast12Months,
    companiesLast12Months,
  };
}

export default AirtableService;

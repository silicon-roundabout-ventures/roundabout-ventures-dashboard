
import { toast } from "sonner";
import Airtable from 'airtable';
import env, { isAirtableConfigured } from '@/hooks/env';

// Types for our portfolio companies
export interface PortfolioCompany {
  id: string;
  name: string;          // Deal Name in Airtable
  description: string;   // Notes in Airtable
  oneLiner?: string;     // One Line Summary or One Liner in Airtable
  logo: string;          // Will need to be constructed from other fields
  photo?: string;        // Company Photo in Airtable (larger image for modals)
  website: string;       // domain from Company in Airtable
  industry: string[];    // Sector in Airtable
  stage: string;         // Stage in Airtable
  investmentDate: string; // Close Date in Airtable
  announced: boolean;     // Announced in Airtable
  fund?: string | number; // Numeral (from fund) in Airtable
  dealValue?: number;     // Deal Value in Airtable (optional)
  netMoic?: number;       // NET MOIC in Airtable (optional)
  totalInvested?: number; // Total Invested in Airtable (optional)
  entryValuation?: number | string; // Entry Valuation in Airtable (optional)
}

// Types for our fund statistics
export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  medianValuation: number;           // Median valuation of portfolio companies
  investmentsLast12Months: number;   // Total investment in the last 12 months
  companiesLast12Months: number;     // Number of new companies in the last 12 months
  industrySplit: Record<string, number>;
  stageSplit: Record<string, number>;
}

// Fallback mock data in case Airtable API is not available
const mockPortfolioData: PortfolioCompany[] = [
  {
    id: '1',
    name: 'TechFusion',
    description: 'AI-powered data analytics platform for enterprise',
    logo: 'https://placehold.co/200x200?text=TF',
    website: 'https://example.com',
    industry: ['Artificial Intelligence', 'Enterprise Software'],
    stage: 'Series A',
    investmentDate: '2023-06-15',
    announced: true
  },
  {
    id: '2',
    name: 'GreenEnergy',
    description: 'Renewable energy solutions for residential buildings',
    logo: 'https://placehold.co/200x200?text=GE',
    website: 'https://example.com',
    industry: ['CleanTech', 'IoT'],
    stage: 'Seed',
    investmentDate: '2023-08-22',
    announced: true
  },
  {
    id: '3',
    name: 'HealthAI',
    description: 'AI diagnostics for healthcare providers',
    logo: 'https://placehold.co/200x200?text=HA',
    website: 'https://example.com',
    industry: ['HealthTech', 'Artificial Intelligence'],
    stage: 'Seed',
    investmentDate: '2023-04-10',
    announced: true
  },
  {
    id: '4',
    name: 'Stealth FinTech',
    description: 'Information about this company is currently not available.',
    logo: 'https://placehold.co/200x200?text=SF',
    website: '',
    industry: ['FinTech'],
    stage: 'Pre-seed',
    investmentDate: '2023-09-05',
    announced: false
  },
  {
    id: '5',
    name: 'Stealth DeepTech',
    description: 'Information about this company is currently not available.',
    logo: 'https://placehold.co/200x200?text=SD',
    website: '',
    industry: ['DeepTech', 'Manufacturing'],
    stage: 'Seed',
    investmentDate: '2023-10-30',
    announced: false
  }
];

const mockFundStatistics: FundStatistics = {
  totalInvestments: 5200000, // $5.2M
  totalCompanies: 5,
  averageInvestment: 1040000, // $1.04M
  medianValuation: 8500000,  // $8.5M median valuation
  investmentsLast12Months: 2100000, // $2.1M invested in last 12 months
  companiesLast12Months: 2, // 2 new companies in last 12 months
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

class AirtableService {
  private base: any;
  private isInitialized: boolean = false;

  constructor() {
    this.initAirtable();
  }

  private initAirtable() {
    try {
      console.log('Attempting to initialize Airtable with:');
      // Log only boolean status of configuration, not actual values
      console.log('API Key configured:', !!env.AIRTABLE_API_KEY);
      console.log('Base ID configured:', !!env.AIRTABLE_BASE_ID);
      console.log('isAirtableConfigured() returns:', isAirtableConfigured());
      
      if (isAirtableConfigured()) {
        Airtable.configure({
          apiKey: env.AIRTABLE_API_KEY as string
        });
        this.base = Airtable.base(env.AIRTABLE_BASE_ID as string);
        this.isInitialized = true;
        console.log('Airtable service initialized successfully');
      } else {
        console.warn('Airtable API key or Base ID not found in environment variables');
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('Failed to initialize Airtable:', error);
      this.isInitialized = false;
    }
  }

  // Fetch portfolio companies from Airtable
  async getPortfolioCompanies(): Promise<PortfolioCompany[]> {
    try {
      // If Airtable is not initialized, return mock data
      if (!this.isInitialized) {
        console.warn('Using mock portfolio data - Airtable not initialized');
        return mockPortfolioData;
      }
      
      console.log('Fetching data from Airtable...');
      console.log('Using configured Airtable credentials');
      
      // Use a more secure approach to check for tables without direct API calls
      // that expose credentials in logs or network requests
      if (env.IS_DEVELOPMENT) {
        try {
          // Try to access the table through the SDK instead of direct API call
          const tableCheck = await this.base('Startups').select({maxRecords: 1}).all();
          console.log('Successfully connected to Startups table');
        } catch (tableError: any) {
          console.warn('Error accessing Startups table:', tableError?.message || 'Unknown error');
        }
      }

      // Use the Startups table with Portfolio view as confirmed
      const tableName = 'Startups';
      console.log(`Querying '${tableName}' table with 'Portfolio' view...`);
      
      const records = await this.base(tableName)
        .select({
          view: 'Portfolio',
          // No filter needed as the view already contains the right records
        })
        .all();
      
      console.log(`Successfully retrieved ${records.length} records from '${tableName}' table`);
      
      // If we have at least one record, log its fields to help debug
      if (records.length > 0) {
        console.log('Sample record fields:', Object.keys(records[0].fields));
      }

      // First, let's log all available fields from the first record to help debug
      if (records.length > 0) {
        console.log('All available fields in first record:', Object.keys(records[0].fields));
        // Log field names but not values to avoid leaking sensitive data
      console.log('First record available fields:', Object.keys(records[0].fields));
      }

      // First, determine which companies are announced vs stealth
      // We'll use this info to filter sensitive data appropriately
      const companies: PortfolioCompany[] = records.map((record: any) => {
        const fields = record.fields;
        console.log(`Processing record ${record.id} with fields:`, Object.keys(fields));
        
        // SECURITY ENHANCEMENT: Determine announced status first
        // This controls what data we expose to the client
        const isAnnounced = 
          fields['Announced'] === 'Yes' || 
          fields['Announced'] === true || 
          fields['Public'] === 'Yes' || 
          fields['Public'] === true || 
          (fields['Status'] && fields['Status'].includes('Public'));
        
        // Extract sectors/industry data - same for both announced and stealth companies
        // UPDATED: Per client request, use actual sectors for all companies
        let sectors: string[] = [];
        if (fields['Sector'] && Array.isArray(fields['Sector'])) {
          sectors = fields['Sector'];
        } else if (fields['Industry'] && Array.isArray(fields['Industry'])) {
          sectors = fields['Industry'];
        } else if (fields['Category'] && Array.isArray(fields['Category'])) {
          sectors = fields['Category'];
        } else if (typeof fields['Sector'] === 'string') {
          // Handle case where sector might be a comma-separated string
          sectors = fields['Sector'].split(',').map(s => s.trim());
        } else {
          // Fallback to a default sector if none found
          sectors = ['Technology'];
        }

        // We've already determined the announced status above

        // Try different field names for company name
        const rawCompanyName = 
          fields['Deal Name'] || 
          fields['Company Name'] || 
          fields['Name'] || 
          'Unnamed Company';

        // SECURITY ENHANCEMENT: For stealth companies, never expose the real name
        // Instead use a display-safe alternative or a generic stealth identifier
        const companyName = isAnnounced ? rawCompanyName : 
                          (fields['Display Name'] || 
                           fields['SHARING: Display Name'] || 
                           fields['Public Name'] || 
                           `Stealth Company (${sectors[0]})`);
        
        // SECURITY ENHANCEMENT: Log stealth status without revealing sensitive details
        if (!isAnnounced) {
          console.log(`Processing stealth company in ${sectors.join('/')} sector`);
        }

        // SECURITY ENHANCEMENT: For stealth companies, don't include website to prevent identification
        let website = '';
        if (isAnnounced) {
          // Only include website for public/announced companies
          if (fields['Website']) {
            website = fields['Website'].startsWith('http') ? fields['Website'] : `https://${fields['Website']}`;
          } else if (fields['URL']) {
            website = fields['URL'].startsWith('http') ? fields['URL'] : `https://${fields['URL']}`;
          } else if (fields['domain (from Company)'] && Array.isArray(fields['domain (from Company)'])) {
            website = `https://${fields['domain (from Company)'][0]}`;
          } else if (fields['Company URL']) {
            website = fields['Company URL'].startsWith('http') ? fields['Company URL'] : `https://${fields['Company URL']}`;
          }
        } 
        // For stealth companies, website remains empty

        // UPDATED: Per client request, use actual dates for all companies
        // Actual dates don't reveal company identity if name/logo are protected
        const closeDate = 
          fields['Close Date'] || 
          fields['Investment Date'] || 
          fields['Deal Date'] || 
          '';
        
        // Extract the one liner - SIMPLIFYING: Using One Line Summary as the primary field
        let oneLiner = '';
        
        if (isAnnounced) {
          // Try to find the One Line Summary field first
          if (fields['One Line Summary'] && typeof fields['One Line Summary'] === 'string') {
            oneLiner = fields['One Line Summary'];
            console.log(`Using One Line Summary for ${companyName}: "${oneLiner}"`);
          } 
          // Fallback options if One Line Summary doesn't exist
          else if (fields['One Liner'] && typeof fields['One Liner'] === 'string') {
            oneLiner = fields['One Liner'];
            console.log(`Using One Liner fallback: "${oneLiner}"`);
          }
          else if (fields['Tagline'] && typeof fields['Tagline'] === 'string') {
            oneLiner = fields['Tagline'];
            console.log(`Using Tagline fallback: "${oneLiner}"`);
          }
          // Last resort - use a short version of description
          else if (fields['Summary'] && typeof fields['Summary'] === 'string') {
            oneLiner = fields['Summary'].substring(0, 100) + (fields['Summary'].length > 100 ? '...' : '');
            console.log(`Using truncated Summary: "${oneLiner}"`);
          }
          else if (fields['Description'] && typeof fields['Description'] === 'string') {
            oneLiner = fields['Description'].substring(0, 100) + (fields['Description'].length > 100 ? '...' : '');
            console.log(`Using truncated Description: "${oneLiner}"`);
          }
          else {
            oneLiner = 'No description available';
            console.log(`No description available for ${companyName}`);
          }
        } 
        // For stealth companies
        else {
          oneLiner = fields['Public One Liner'] || 
                   fields['SHARING: One Liner'] || 
                   `Stealth ${sectors[0]} company`;
          console.log(`Using stealth one liner for ${companyName}: "${oneLiner}"`);
        }

        // SECURITY ENHANCEMENT: For stealth companies, use a sanitized/public description
        let description = '';
        if (isAnnounced) {
          // Full description for announced companies - prioritize Summary as requested
          if (typeof fields['Summary'] === 'string' && fields['Summary'].trim() !== '') {
            description = fields['Summary'];
            console.log(`Using Summary field for description`);
          } else {
            description = fields['Description'] || 
                          fields['Notes'] || 
                          fields['GP Portfolio Notes'] || 
                          'Information about this company is currently not available.';
            console.log(`Using fallback field for description`);
          }
        } else {
          // For stealth companies, use only approved public descriptions
          description = fields['Public Description'] || 
                        fields['SHARING: Description'] || 
                        fields['External Description'] ||
                        `A stealth company developing innovative solutions in the ${sectors[0]} space.`;
          console.log(`Using stealth description`);
        }

        // SECURITY ENHANCEMENT: For stealth companies, don't use actual logo to prevent identification
        let logo = '';
        let photo = '';
        
        if (isAnnounced) {
          // Use actual logo only for announced companies
          if (fields['Logo'] && fields['Logo'][0] && fields['Logo'][0].url) {
            logo = fields['Logo'][0].url;
          } else if (fields['Company Logo'] && fields['Company Logo'][0] && fields['Company Logo'][0].url) {
            logo = fields['Company Logo'][0].url;
          } else {
            // Create a placeholder with company initials for announced companies
            const initials = companyName.split(' ')
              .map((word: string) => word.charAt(0))
              .join('')
              .toUpperCase();
            logo = `https://placehold.co/200x200?text=${initials}`;
          }
          
          // Extract photo for modal (larger image)
          if (fields['Photo'] && fields['Photo'][0] && fields['Photo'][0].url) {
            photo = fields['Photo'][0].url;
          } else if (fields['Company Photo'] && fields['Company Photo'][0] && fields['Company Photo'][0].url) {
            photo = fields['Company Photo'][0].url;
          } else if (fields['Featured Image'] && fields['Featured Image'][0] && fields['Featured Image'][0].url) {
            photo = fields['Featured Image'][0].url;
          } else {
            // If no photo is available, use the logo as photo
            photo = logo;
          }
        } else {
          // For stealth companies, use a generic placeholder or sector icon
          // Don't use actual company initials to prevent identification
          logo = `https://placehold.co/200x200?text=S`; // S for Stealth
          photo = logo; // Same for photo
        }

        // Get stage information, trying different possible field names
        const stage = 
          fields['Stage'] || 
          fields['Investment Stage'] || 
          fields['Round'] || 
          'Seed';

        // Extract the fund information
        let fund = null;
        if (fields['Numeral (from fund)']) {
          // Get the raw fund value
          const rawFund = fields['Numeral (from fund)'];
          
          // Clean up the fund value - if it contains "Fund" text, extract just the number
          if (typeof rawFund === 'string') {
            // Remove 'Fund' text and extract just the numeric part
            const cleanedStr = rawFund.replace(/fund/i, '').trim();
            const match = cleanedStr.match(/\d+/);
            fund = match ? match[0] : cleanedStr;
          } else {
            // For non-string values (like numbers), use as is
            fund = rawFund;
          }
          
          console.log(`Fund for ${companyName}: ${fund} (raw: ${rawFund})`);
        }
        
        // UPDATED: Per client request, include financial metrics for all companies
        // Financial data without company identification doesn't reveal identity
        const company = {
          id: record.id,
          name: companyName, // Still using display name / stealth name for non-announced
          description: description, // Still using sanitized description
          oneLiner: oneLiner, // New one liner field for cards
          logo: logo, // Still using generic logo for stealth
          photo: photo, // New photo field for modals
          website: isAnnounced ? website : '', // Still no website for stealth companies
          industry: sectors, // Now using actual sectors for all
          stage: stage, // Using actual stage information
          investmentDate: closeDate, // Using actual dates
          announced: isAnnounced,
          fund: fund, // New field for fund information
          // UPDATED: Include financial data for all companies
          dealValue: fields['Deal Value'] || fields['Investment Amount'],
          netMoic: fields['NET MOIC'] || fields['MOIC'],
          totalInvested: fields['Total Invested'] || fields['Investment Size'],
          entryValuation: fields['Entry Valuation'] || fields['Pre-money Valuation'] || fields['Company Valuation']
        };
        
        console.log(`Processed company: ${company.name}, announced: ${company.announced}, industry: ${company.industry.join(', ')}`);
        console.log(`  One liner: ${company.oneLiner}`);
        console.log(`  Description start: ${company.description?.substring(0, 50)}...`);
        return company;
      });

      return companies;
    } catch (error) {
      console.error('Error fetching portfolio companies:', error);
      
      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Check for common Airtable API errors
      if (error instanceof Error && error.message.includes('401')) {
        console.error('Authentication error - check your Airtable API key');
        toast.error('Authentication failed. Check your Airtable API key.');
      } else if (error instanceof Error && error.message.includes('404')) {
        console.error('Base or table not found - check your Base ID and table names');
        toast.error('Airtable base or table not found. Check your configuration.');
      } else {
        toast.error('Failed to load portfolio data');
      }
      
      return mockPortfolioData; // Fallback to mock data
    }
  }

  // Calculate and fetch fund statistics based on portfolio data
  async getFundStatistics(): Promise<FundStatistics> {
    try {
      // If Airtable is not initialized, return mock data
      if (!this.isInitialized) {
        console.warn('Using mock fund statistics - Airtable not initialized');
        return mockFundStatistics;
      }

      console.log('Calculating fund statistics from Airtable data...');
      
      // Fetch all portfolio companies first
      const companies = await this.getPortfolioCompanies();
      console.log(`Found ${companies.length} companies for statistics calculation`);
      
      // Calculate statistics based on the portfolio data
      let totalInvestments = 0;
      const industrySplit: Record<string, number> = {};
      const stageSplit: Record<string, number> = {};
      
      companies.forEach((company: PortfolioCompany) => {
        // Sum up investments using different possible field names
        // Convert any string values to numbers if needed
        let investmentAmount = 0;
        if (company.totalInvested) {
          // Handle both number and string formats with proper type safety
          if (typeof company.totalInvested === 'number') {
            investmentAmount = company.totalInvested;
          } else if (typeof company.totalInvested === 'string') {
            // Remove currency symbols and commas, then parse
            const cleanedValue = (company.totalInvested as string).replace(/[£$€,]/g, '');
            investmentAmount = parseFloat(cleanedValue) || 0;
          }
          
          // Log in development only, without specific amounts
          if (env.IS_DEVELOPMENT) {
            console.log(`Processing investment data for ${company.name}`);
          }
          totalInvestments += investmentAmount;
        } else if (company.dealValue) {
          // Try dealValue as fallback with proper type safety
          if (typeof company.dealValue === 'number') {
            investmentAmount = company.dealValue;
          } else if (typeof company.dealValue === 'string') {
            const cleanedValue = (company.dealValue as string).replace(/[£$€,]/g, '');
            investmentAmount = parseFloat(cleanedValue) || 0;
          }
          
          // Log in development only, without specific amounts
          if (env.IS_DEVELOPMENT) {
            console.log(`Processing deal value for ${company.name}`);
          }
          totalInvestments += investmentAmount;
        }
        
        // Count industries - ensure we don't double count
        if (Array.isArray(company.industry) && company.industry.length > 0) {
          company.industry.forEach(industry => {
            // Skip empty industry values
            if (industry && industry.trim()) {
              industrySplit[industry] = (industrySplit[industry] || 0) + 1;
            }
          });
        }
        
        // Count stages - normalize stage names for consistency
        if (company.stage) {
          const normalizedStage = company.stage.trim();
          if (normalizedStage) {
            stageSplit[normalizedStage] = (stageSplit[normalizedStage] || 0) + 1;
          }
        }
      });
      
      // Calculate average investment
      const averageInvestment = companies.length > 0 ? 
                               totalInvestments / companies.length : 0;
      
      // Calculate median valuation
      const valuations: number[] = [];
      
      // Try to extract valuations from each company
      companies.forEach((company: PortfolioCompany) => {
        // Try to get valuation from company data
        let companyValuation = 0;
        
        // First, check if we have an Entry Valuation field
        if (company.entryValuation) {
          if (typeof company.entryValuation === 'number') {
            companyValuation = company.entryValuation;
          } else if (typeof company.entryValuation === 'string') {
            // Clean string value of currency symbols and commas
            const cleanedValue = (company.entryValuation as string).replace(/[£$€,]/g, '');
            companyValuation = parseFloat(cleanedValue) || 0;
          }
        }
        // If no Entry Valuation, fall back to estimating from deal value
        else if (company.dealValue && typeof company.dealValue === 'number') {
          // Multiply deal value by typical multiple based on stage to estimate valuation
          const stageMultipliers: Record<string, number> = {
            'Pre-seed': 5,
            'Seed': 4,
            'Series A': 3,
            'Series B': 2.5,
            'Series C': 2,
            'Growth': 1.5
          };
          
          const multiplier = company.stage && stageMultipliers[company.stage] ? 
                            stageMultipliers[company.stage] : 4; // Default to Seed multiple
          
          companyValuation = company.dealValue * multiplier;
        }
        
        // If we have a valid valuation estimate, add it to our array
        if (companyValuation > 0) {
          valuations.push(companyValuation);
        }
      });
      
      // Calculate the median valuation
      let medianValuation = 0;
      if (valuations.length > 0) {
        // Sort valuations to find median
        valuations.sort((a: number, b: number) => a - b);
        const mid = Math.floor(valuations.length / 2);
        medianValuation = valuations.length % 2 === 0
          ? (valuations[mid - 1] + valuations[mid]) / 2
          : valuations[mid];
      }
      
      // Calculate investments and companies in the last 12 months
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
      let investmentsLast12Months = 0;
      let companiesLast12Months = 0;
      
      companies.forEach((company: PortfolioCompany) => {
        // Check if the investment date is within the last 12 months
        if (company.investmentDate) {
          const investmentDate = new Date(company.investmentDate);
          if (!isNaN(investmentDate.getTime()) && investmentDate >= twelveMonthsAgo) {
            companiesLast12Months++;
            
            // Add to investments in last 12 months
            let amount = 0;
            if (typeof company.totalInvested === 'number') {
              amount = company.totalInvested;
            } else if (company.dealValue && typeof company.dealValue === 'number') {
              amount = company.dealValue;
            }
            
            investmentsLast12Months += amount;
          }
        }
      });
      
      // Create the final statistics object with all calculated values
      const statistics: FundStatistics = {
        totalInvestments,
        totalCompanies: companies.length,
        averageInvestment,
        medianValuation,
        investmentsLast12Months,
        companiesLast12Months,
        industrySplit,
        stageSplit
      };
      
      console.log('Fund Statistics calculated:', {
        totalInvestments,
        totalCompanies: companies.length,
        averageInvestment,
        medianValuation,
        investmentsLast12Months,
        companiesLast12Months,
        industrySplit: Object.keys(industrySplit),
        stageSplit: Object.keys(stageSplit)
      });
      
      return statistics;
    } catch (error) {
      console.error('Error calculating fund statistics:', error);
      toast.error('Failed to load fund statistics');
      return mockFundStatistics; // Fallback to mock data
    }
  }

  // Submit application form to Airtable
  async submitApplication(formData: Record<string, any>): Promise<boolean> {
    try {
      // If Airtable is not initialized, simulate success for demo
      if (!this.isInitialized) {
        console.warn('Using simulated form submission - Airtable not initialized');
        return new Promise(resolve => {
          setTimeout(() => resolve(true), 1000);
        });
      }

      // Map form data to Airtable fields
      const airtableData = {
        'Name': formData.name,
        'Email': formData.email,
        'Company': formData.company,
        'Message': formData.message,
        'Date Submitted': new Date().toISOString()
      };

      // Submit to Airtable 'Applications' table
      await this.base('Applications').create(airtableData);
      
      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
      return false;
    }
  }
}

export default new AirtableService();

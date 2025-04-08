
import { toast } from "sonner";

// Types for our portfolio companies
export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  industry: string[];
  stage: string;
  investmentDate: string;
  announced: boolean;
}

// Types for our fund statistics
export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  industrySplit: Record<string, number>;
  stageSplit: Record<string, number>;
}

// Mock data for demo purposes - this would be replaced with actual Airtable API calls
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
    name: '',
    description: '',
    logo: '',
    website: '',
    industry: ['FinTech'],
    stage: 'Pre-seed',
    investmentDate: '2023-09-05',
    announced: false
  },
  {
    id: '5',
    name: '',
    description: '',
    logo: '',
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
  // Fetch portfolio companies
  async getPortfolioCompanies(): Promise<PortfolioCompany[]> {
    try {
      // In a real implementation, this would be an API call to Airtable
      // For now, we'll return mock data with a simulated delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPortfolioData);
        }, 800);
      });
    } catch (error) {
      console.error('Error fetching portfolio companies:', error);
      toast.error('Failed to load portfolio data');
      return [];
    }
  }

  // Fetch fund statistics
  async getFundStatistics(): Promise<FundStatistics> {
    try {
      // In a real implementation, this would be an API call to Airtable
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockFundStatistics);
        }, 600);
      });
    } catch (error) {
      console.error('Error fetching fund statistics:', error);
      toast.error('Failed to load fund statistics');
      return {
        totalInvestments: 0,
        totalCompanies: 0,
        averageInvestment: 0,
        industrySplit: {},
        stageSplit: {}
      };
    }
  }

  // Submit application form
  async submitApplication(formData: Record<string, any>): Promise<boolean> {
    try {
      // In a real implementation, this would post to Airtable API
      console.log('Form submission data:', formData);
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate for demo
            resolve(true);
          } else {
            throw new Error('Simulated API error');
          }
        }, 1000);
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
      return false;
    }
  }
}

export default new AirtableService();

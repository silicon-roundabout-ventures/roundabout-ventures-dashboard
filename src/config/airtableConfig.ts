import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  oneLiner?: string;
  logo: string;
  logoImageData?: IGatsbyImageData;
  photo?: string;
  photoImageData?: IGatsbyImageData;
  website: string;
  technology: string;
  hq: string;
  sectors: string[];
  stage: string;
  investmentDate: string;
  announced: boolean;
  fund?: string | number;
  currentStatus?: string;
  latestFollowOnRound?: string;
}

export interface VCInvestor {
  id: string;
  name: string;
  type: string;
  stage: string[];
  industryTags: string[];
  targetGeography: string[];
  chequeSize: string[];
  companyCountry: string[];
  website: string;
  domain: string;
  notes: string;
}

export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  medianValuation: number;
  investmentsLast12Months: number;
  companiesLast12Months: number;
}

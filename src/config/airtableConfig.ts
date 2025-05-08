export interface PortfolioCompany {
  id: string;
  name: string;
  description: string;
  oneLiner?: string;
  logo: string;
  photo?: string;
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

export interface FundStatistics {
  totalInvestments: number;
  totalCompanies: number;
  averageInvestment: number;
  medianValuation: number;
  investmentsLast12Months: number;
  companiesLast12Months: number;
}

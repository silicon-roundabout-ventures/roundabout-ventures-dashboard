import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { ArrowRight } from 'lucide-react';
// Import types from centralized config
import { PortfolioCompany, FundStatistics } from '../config/airtableConfig';
// Import hooks from centralized service
import { usePortfolioCompanies } from '../services/AirtableService';
import PortfolioCard from '@/components/widgets/PortfolioCard';
import StatisticCard from '@/components/widgets/StatisticCard';
import ChartComponent from '@/components/widgets/ChartComponent';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import Layout from '@/components/layouts/Layout'; 
import { Button } from '@/components/parts/button';
import ClientOnly from '@/components/layouts/ClientOnly';

/**
 * Calculate statistics based on portfolio companies
 */
const calculateStatistics = (portfolioCompanies: PortfolioCompany[]): FundStatistics => {
  if (!portfolioCompanies || portfolioCompanies.length === 0) {
    return {
      totalInvestments: 0,
      totalCompanies: 0,
      averageInvestment: 0,
      medianValuation: 0,
      investmentsLast12Months: 0,
      companiesLast12Months: 0
    };
  }

  // Calculate total investments (use actual totalInvested data if available)
  let totalInvestment = 0;
  let investmentsCount = 0;
  
  portfolioCompanies.forEach(company => {
    if (company.totalInvested) {
      totalInvestment += company.totalInvested;
      investmentsCount++;
    }
  });
  
  // If we don't have real investment data, use approximations
  if (investmentsCount === 0) {
    totalInvestment = portfolioCompanies.length * 500000; // Approximation based on average seed ticket
  }
  
  // Calculate average investment
  const averageInvestment = investmentsCount > 0 ? 
    totalInvestment / investmentsCount : 
    totalInvestment / portfolioCompanies.length;
  
  // Get sorted array of valuations for median calculation
  const valuations: number[] = [];
  portfolioCompanies.forEach(company => {
    if (company.entryValuation) {
      // Handle both number and string formats like "£5M"
      if (typeof company.entryValuation === 'number') {
        valuations.push(company.entryValuation);
      } else {
        // Extract numeric portion and convert to number
        const matches = company.entryValuation.match(/\d+(\.\d+)?/);
        if (matches) {
          let value = parseFloat(matches[0]);
          // Check if the string contains M (millions)
          if (company.entryValuation.includes('M')) {
            value *= 1000000;
          } else if (company.entryValuation.includes('K')) {
            value *= 1000;
          }
          valuations.push(value);
        }
      }
    }
  });
  
  // Calculate median valuation
  let medianValuation = 0;
  if (valuations.length > 0) {
    valuations.sort((a, b) => a - b);
    const mid = Math.floor(valuations.length / 2);
    medianValuation = valuations.length % 2 === 0 ? 
      (valuations[mid - 1] + valuations[mid]) / 2 : 
      valuations[mid];
  } else {
    // Approximation if no real data
    medianValuation = 5000000; // Typical early-stage valuation
  }
  
  // Calculate investments in last 12 months
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  let investmentsLast12Months = 0;
  let companiesLast12Months = 0;
  
  portfolioCompanies.forEach(company => {
    if (company.investmentDate) {
      const investmentDate = new Date(company.investmentDate);
      if (investmentDate >= oneYearAgo) {
        companiesLast12Months++;
        if (company.totalInvested) {
          investmentsLast12Months += company.totalInvested;
        } else {
          // Approximation
          investmentsLast12Months += 500000;
        }
      }
    }
  });
  
  // Calculate industry split - only include announced companies for accuracy
  const industryCount: Record<string, number> = {};
  portfolioCompanies.forEach(company => {
    // Only count announced companies in statistics for accuracy
    if (company.industry && company.industry.length > 0 && company.announced) {
      company.industry.forEach(industry => {
        // Group similar industries
        let normalizedIndustry = industry.trim();
        // Simple normalization - you can enhance this further
        if (normalizedIndustry.includes('AI') || normalizedIndustry.includes('Intelligence')) {
          normalizedIndustry = 'Artificial Intelligence';
        } else if (normalizedIndustry.includes('Fin')) {
          normalizedIndustry = 'FinTech';
        }
        
        industryCount[normalizedIndustry] = (industryCount[normalizedIndustry] || 0) + 1;
      });
    }
  });
  
  // Convert to percentages
  const industrySplit: Record<string, number> = {};
  const totalIndustries = Object.values(industryCount).reduce((sum, count) => sum + count, 0);
  Object.entries(industryCount).forEach(([industry, count]) => {
    industrySplit[industry] = Math.round((count / totalIndustries) * 100);
  });
  
  // Calculate stage split - again only for announced companies
  const stageCount: Record<string, number> = {};
  portfolioCompanies.forEach(company => {
    if (company.stage && company.announced) {
      // Normalize stage names
      let normalizedStage = company.stage.trim();
      if (normalizedStage.toLowerCase().includes('pre')) {
        normalizedStage = 'Pre-seed';
      } else if (normalizedStage.toLowerCase().includes('seed')) {
        normalizedStage = 'Seed';
      } else if (normalizedStage.toLowerCase().includes('series a')) {
        normalizedStage = 'Series A';
      }
      
      stageCount[normalizedStage] = (stageCount[normalizedStage] || 0) + 1;
    }
  });
  
  // Convert to percentages
  const stageSplit: Record<string, number> = {};
  const totalStages = Object.values(stageCount).reduce((sum, count) => sum + count, 0);
  Object.entries(stageCount).forEach(([stage, count]) => {
    stageSplit[stage] = Math.round((count / totalStages) * 100);
  });
  
  // Always ensure we have these fallback values if no data is available
  const fallbackIndustrySplit = {
    'Artificial Intelligence': 40,
    'Enterprise Software': 20,
    'CleanTech': 20,
    'FinTech': 20
  };
  
  const fallbackStageSplit = {
    'Pre-seed': 20,
    'Seed': 60,
    'Series A': 20
  };
  
  // Return statistics with better handling of empty data
  // Return only the fields defined in FundStatistics interface
  return {
    totalInvestments: totalInvestment,
    totalCompanies: portfolioCompanies.length,
    averageInvestment,
    medianValuation,
    investmentsLast12Months,
    companiesLast12Months
    // Note: industrySplit and stageSplit are now calculated on-demand in chart preparation functions
  };
};

/**
 * Props for the Portfolio page component
 */
interface PortfolioProps {
  location: { pathname: string };
}

/**
 * Portfolio page component
 */
const Portfolio = ({ location }: PortfolioProps) => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get data using centralized hooks from AirtableService
  const portfolioCompanies = usePortfolioCompanies();
  
  const [statistics, setStatistics] = useState<FundStatistics | null>(null);
  
  useEffect(() => {
    setStatistics(calculateStatistics(portfolioCompanies));
    setIsLoading(false);
  }, [portfolioCompanies]);

  /**
   * Prepare data for industry distribution chart
   */
  const prepareIndustryChartData = () => {
    // Calculate industry distribution on-the-fly
    const industrySplit: Record<string, number> = {};
    
    portfolioCompanies.forEach(company => {
      if (company.industry && company.industry.length > 0) {
        company.industry.forEach(industry => {
          industrySplit[industry] = (industrySplit[industry] || 0) + 1;
        });
      }
    });
    
    return Object.entries(industrySplit).map(([key, value]) => ({
      name: key,
      value: value
    }));
  };
  
  /**
   * Prepare data for stage distribution chart
   */
  const prepareStageChartData = () => {
    // Calculate stage distribution on-the-fly
    const stageSplit: Record<string, number> = {};
    
    portfolioCompanies.forEach(company => {
      if (company.stage) {
        stageSplit[company.stage] = (stageSplit[company.stage] || 0) + 1;
      }
    });
    
    return Object.entries(stageSplit).map(([key, value]) => ({
      name: key,
      value: value
    }));
  };

  /**
   * Prepare data for technology type distribution chart
   */
  const prepareTechTypeChartData = () => {
    const techCount: Record<string, number> = {};
    portfolioCompanies.forEach(company => {
      const type = company.technologyType || 'Unknown';
      techCount[type] = (techCount[type] || 0) + 1;
    });
    return Object.entries(techCount).map(([key, value]) => ({ name: key, value }));
  };

  /**
   * Prepare data for headquarter distribution chart
   */
  const prepareHeadquarterChartData = () => {
    const hqCount: Record<string, number> = {};
    portfolioCompanies.forEach(company => {
      const hq = company.headquarter || 'Unknown';
      hqCount[hq] = (hqCount[hq] || 0) + 1;
    });
    return Object.entries(hqCount).map(([key, value]) => ({ name: key, value }));
  };

  // Get unique funds for filter dropdown
  const funds = portfolioCompanies
    .filter(company => company.fund !== undefined && company.fund !== null)
    .map(company => String(company.fund)) // Get fund as string
    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
    .sort(); // Sort funds
  
  // Get unique industries for filter dropdown
  const industries = Array.from(
    new Set(portfolioCompanies.flatMap(company => company.industry))
  );
  
  // Filter companies based on selected filter
  const filteredCompanies = portfolioCompanies.filter(company => {
    if (filter === 'all') return true;
    if (filter === 'announced') return company.announced;
    if (filter === 'stealth') return !company.announced;
    
    // Check if the filter is a fund (format: "fund:X")
    if (filter.startsWith('fund:')) {
      const fundNumber = filter.split(':')[1];
      return company.fund !== undefined && company.fund !== null && 
             String(company.fund) === fundNumber;
    }
    
    // Otherwise filter by industry
    return company.industry.includes(filter);
  });

  return (
    <Layout title="Portfolio - Roundabout Ventures" location={location}>
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />
        
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Our Portfolio/&gt;</h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Don't trust our PR words, see for yourself what we invest in:
            </p>
          </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse-slow text-srv-teal">Loading dashboard data...</div>
          </div>
        ) : (
          <>
            {/* Statistics Row */}
            <ClientOnly fallback={<div className="h-24 bg-muted animate-pulse rounded-lg"></div>}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatisticCard
                  title="Total Investments"
                  value={statistics?.totalInvestments ? `£${(statistics.totalInvestments / 1000000).toFixed(1)}M` : '£0M'}
                  icon={<span className="text-srv-teal text-xl">💸</span>}
                  change={statistics?.investmentsLast12Months ? `£${(statistics.investmentsLast12Months / 1000000).toFixed(1)}M in last 12m` : 'No data for last 12m'}
                  trend="neutral"
                />
                <StatisticCard
                  title="Portfolio Companies"
                  value={statistics?.totalCompanies || 0}
                  icon={<span className="text-srv-teal text-xl">🏢</span>}
                  change={statistics?.companiesLast12Months ? `+${statistics.companiesLast12Months} in last 12m` : 'No new companies'}
                  trend={statistics?.companiesLast12Months && statistics.companiesLast12Months > 0 ? 'up' : 'neutral'}
                />
                <StatisticCard
                  title="Average Investment"
                  value={statistics?.averageInvestment ? `£${(statistics.averageInvestment / 1000).toFixed(0)}k` : '£0k'}
                  icon={<span className="text-srv-teal text-xl">📊</span>}
                />
                <StatisticCard
                  title="Median Valuation"
                  value={statistics?.medianValuation ? `£${(statistics.medianValuation / 1000000).toFixed(1)}M` : '£0M'}
                  icon={<span className="text-srv-teal text-xl">📈</span>}
                />
              </div>
            </ClientOnly>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <ChartComponent 
                title="Investment by Industry" 
                data={prepareIndustryChartData()} 
              />
              <ChartComponent 
                title="Investment by Stage" 
                data={prepareStageChartData()} 
                colors={['#00A0A0', '#1A85B9', '#0F4C81']}
              />
              <ChartComponent
                title="Technology Type Distribution"
                data={prepareTechTypeChartData()}
                chartType="pie"
              />
              <ChartComponent
                title="Headquarter Location"
                data={prepareHeadquarterChartData()}
                chartType="bar"
              />
            </div>
            
            {/* Portfolio Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center"><span className="mr-2">🏢</span>Portfolio Companies</h2>
                
                {/* Filter Dropdown & Dropdown display*/}
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none bg-black/40 text-white border-2 border-white/20 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-srv-teal/60 focus:ring-0 hover:border-white/30 transition-colors cursor-pointer"
                  >
                    <option value="all">🔍 All Companies</option>
                    <option value="announced">🚀 Announced Only</option>
                    <option value="stealth">🔒 Stealth Only</option>
                    
                    {funds.length > 0 && (
                      <optgroup label="By Fund">
                        {funds.map((fund) => (
                          <option key={`fund-${fund}`} value={`fund:${fund}`}>
                            {fund}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    
                    <optgroup label="By Industry">
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              
              {/* Portfolio Cards Grid */}
              <ClientOnly fallback={<div className="h-60 bg-muted animate-pulse rounded-lg"></div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <PortfolioCard key={company.id} company={company} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-srv-gray">No companies found matching the selected filter.</p>
                    </div>
                  )}
                </div>
              </ClientOnly>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-16 mb-10">
                <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
                  <Link to="/apply">
                    Apply For Funding <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
                  <Link to="/forinvestors">
                    LP Enquiries <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default Portfolio;

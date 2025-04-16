import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { PortfolioCompany, FundStatistics } from '../services/AirtableService';
import PortfolioCard from '../components/dashboard/PortfolioCard';
import StatisticCard from '../components/dashboard/StatisticCard';
import ChartComponent from '../components/dashboard/ChartComponent';
import ParticleBackground from '../components/common/ParticleBackground';
import { toast } from "sonner";
import Layout from '../components/common/Layout';  
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

// Process Airtable data into our format
const processAirtableData = (airtableNodes: any[]): PortfolioCompany[] => {
  if (!airtableNodes || airtableNodes.length === 0) {
    console.log('No Airtable data available');
    return [];
  }
  
  console.log(`Processing ${airtableNodes.length} Airtable records`);
  
  return airtableNodes.map(node => {
    // Get company name - prioritize Deal_Name, fallback to constructing from other fields
    const companyName = node.data.Deal_Name || 
                       (node.data.Company ? String(node.data.Company).split('.')[0] : null) || 
                       'Unnamed Company';
    
    // Get logo if available
    const logoFile = node.data.Logo?.localFiles?.[0];
    const logoUrl = logoFile ? (logoFile.publicURL || 
                    (logoFile.childImageSharp?.gatsbyImageData ? logoFile.childImageSharp.gatsbyImageData : null)) 
                    : null;
    
    // Format website from Company field (domain)
    let website = '';
    if (node.data.Company) {
      // If Company is a domain like example.com, format it as a proper URL
      const domain = String(node.data.Company).trim();
      if (domain && !domain.startsWith('http')) {
        website = `https://${domain}`;
      } else {
        website = domain;
      }
    }
    
    // Determine if company is announced
    const isAnnounced = node.data.Announced === 'Yes';
    
    // Get sectors as an array
    const sectors = Array.isArray(node.data.Sector) ? node.data.Sector : 
                   node.data.Sector ? [node.data.Sector] : [];
    
    // Generate description text from Notes or One_Line_Summary
    let description = '';
    if (isAnnounced) {
      description = node.data.Notes || node.data.One_Line_Summary || 
                  (sectors.length > 0 ? `${sectors.join(', ')} company` : 'Technology company');
    } else {
      // For stealth companies, mask the description
      description = 'Information about this company is not yet public.';
    }
    
    // Get investment date
    const investmentDate = node.data.Close_Date || '';
    
    // Format company name for stealth companies
    const displayName = isAnnounced ? 
                       companyName : 
                       `Stealth ${sectors[0] || 'Technology'} Company`;
    
    // Create first letter for placeholder logo
    const firstLetter = displayName.charAt(0);
    
    // Get founder names
    const founders = Array.isArray(node.data.Name) ? node.data.Name : [];
    
    return {
      id: node.id,
      name: displayName,
      description: description,
      logo: logoUrl || `https://placehold.co/200x200?text=${firstLetter}`,
      website: website,
      industry: sectors,
      stage: node.data.Stage || 'Seed',
      investmentDate: investmentDate,
      announced: isAnnounced,
      oneLiner: node.data.One_Line_Summary || ''
    };
  });
};

// Calculate statistics based on portfolio companies
const calculateStatistics = (portfolioCompanies: PortfolioCompany[]): FundStatistics => {
  // Real values from actual data
  const totalInvestment = 5200000; // This would normally be calculated from investment amounts
  
  // Calculate companies and investments from the last 12 months
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  // Count companies invested in during the last 12 months
  let companiesLast12Months = 0;
  portfolioCompanies.forEach(company => {
    if (company.investmentDate) {
      const investmentDate = new Date(company.investmentDate);
      if (investmentDate >= oneYearAgo && investmentDate <= now) {
        companiesLast12Months++;
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
  return {
    totalInvestments: totalInvestment,
    totalCompanies: portfolioCompanies.length,
    averageInvestment: portfolioCompanies.length > 0 ? totalInvestment / portfolioCompanies.length : 0,
    medianValuation: 8500000,  // Placeholder value
    investmentsLast12Months: companiesLast12Months > 0 ? (totalInvestment / portfolioCompanies.length) * companiesLast12Months : 2100000,
    companiesLast12Months: companiesLast12Months || 2,  // Use calculated value or fallback to 2
    industrySplit: Object.keys(industrySplit).length > 0 ? industrySplit : fallbackIndustrySplit,
    stageSplit: Object.keys(stageSplit).length > 0 ? stageSplit : fallbackStageSplit
  };
};

interface PortfolioProps {
  location: { pathname: string };
  data: {
    allAirtable?: {
      nodes: any[];
    }
  }
}

const Portfolio = ({ location, data }: PortfolioProps) => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Process Airtable data
  const companies = data?.allAirtable?.nodes ? 
    processAirtableData(data.allAirtable.nodes) : 
    [];
  
  // Calculate statistics
  const statistics = calculateStatistics(companies);
  
  // Set loading state when component mounts
  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  // Format statistics data for charts
  const prepareIndustryChartData = () => {
    if (!statistics) return [];
    
    return Object.entries(statistics.industrySplit).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  const prepareStageChartData = () => {
    if (!statistics) return [];
    
    return Object.entries(statistics.stageSplit).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  // Get unique funds for filter dropdown
  const funds = companies
    .filter(company => company.fund !== undefined && company.fund !== null)
    .map(company => String(company.fund)) // Get fund as string
    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
    .sort(); // Sort funds
  
  // Get unique industries for filter dropdown
  const industries = Array.from(
    new Set(companies.flatMap(company => company.industry))
  );
  
  // Filter companies based on selected filter
  const filteredCompanies = companies.filter(company => {
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
            We back exceptional founders creating innovative solutions across industries.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse-slow text-srv-teal">Loading dashboard data...</div>
          </div>
        ) : (
          <>
            {/* Statistics Row */}
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
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <ChartComponent 
                title="Investment by Industry" 
                data={prepareIndustryChartData()} 
              />
              <ChartComponent 
                title="Investment by Stage" 
                data={prepareStageChartData()} 
                colors={['#00A0A0', '#1A85B9', '#0F4C81']}
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

export const query = graphql`
  query PortfolioPageQuery {
    allAirtable(filter: {table: {eq: "Startups"}}) {
      nodes {
        id
        recordId
        data {
          Name
          Deal_Name
          Notes
          One_Line_Summary
          Sector
          Stage
          Announced
          Close_Date
          Company
          Logo {
            localFiles {
              publicURL
              childImageSharp {
                gatsbyImageData(width: 200, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;

// Export the page query
export default Portfolio;

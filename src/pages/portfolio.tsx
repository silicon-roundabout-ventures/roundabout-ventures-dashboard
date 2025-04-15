
import React, { useState, useEffect } from 'react';
import AirtableService, { PortfolioCompany, FundStatistics } from '../services/AirtableService';
import PortfolioCard from '../components/dashboard/PortfolioCard';
import StatisticCard from '../components/dashboard/StatisticCard';
import ChartComponent from '../components/dashboard/ChartComponent';
import ParticleBackground from '../components/common/ParticleBackground';
import { toast } from "sonner";
import Layout from '../components/common/Layout';

const PortfolioContent = () => {
  const [companies, setCompanies] = useState<PortfolioCompany[]>([]);
  const [statistics, setStatistics] = useState<FundStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [portfolioData, statsData] = await Promise.all([
          AirtableService.getPortfolioCompanies(),
          AirtableService.getFundStatistics()
        ]);
        
        setCompanies(portfolioData);
        setStatistics(statsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
  
  // Filter companies based on selected filter
  const filteredCompanies = companies.filter(company => {
    if (filter === 'all') return true;
    if (filter === 'announced') return company.announced;
    if (filter === 'stealth') return !company.announced;
    return company.industry.includes(filter);
  });
  
  // Get unique industries for filter dropdown
  const industries = Array.from(
    new Set(companies.flatMap(company => company.industry))
  );

  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Our Portfolio/&gt;</h1>
          <p className="text-srv-gray max-w-2xl mx-auto">
            We invest in exceptional founders building innovative solutions across various industries.
          </p>
        </div>
        
        {loading ? (
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
                icon={<span className="text-srv-teal text-xl">💰</span>}
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
                value={statistics?.averageInvestment ? `£${(statistics.averageInvestment / 1000000).toFixed(2)}M` : '£0M'}
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
                <h2 className="text-2xl font-bold text-white">Portfolio Companies</h2>
                
                {/* Filter Dropdown */}
                <div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-srv-blue/20 text-white border border-srv-blue/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-srv-teal"
                  >
                    <option value="all">All Companies</option>
                    <option value="announced">Announced Only</option>
                    <option value="stealth">Stealth Only</option>
                    <optgroup label="By Industry">
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              
              {/* Portfolio Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <Layout title="Portfolio - Roundabout Ventures">
      <PortfolioContent />
    </Layout>
  );
};

export default Portfolio;

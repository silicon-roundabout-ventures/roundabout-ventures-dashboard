import { useState, useMemo, useCallback } from 'react';
import Layout from '@/components/layouts/Layout';
import ClientOnly from '@/components/layouts/ClientOnly';
import { PortfolioCompany, FundStatistics } from '@/config/airtableConfig';
import SEO from '@/components/parts/SEO';
import { HeadFC } from 'gatsby';

//Data Components
import { groupByCount } from '@/utils/groupBy';

//UI Portfolio Components
import PortfolioCard from '@/components/widgets/PortfolioCard';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import StatisticsSection from '@/components/sections/StatisticsSection';
import ChartsSection from '@/components/sections/ChartsSection';

//CTA UI Components
import { Link } from 'gatsby';
import { FeatureCard } from '@/components/parts/FeatureCard';
import { GlassCard } from '@/components/parts/GlassCard';
import { Button } from '@/components/parts/button';
import { ArrowRight } from 'lucide-react';

interface FundMetadata {
  id: string;
  name: string;
  status: string;
}

interface PortfolioProps {
  pageContext: {
    companies: PortfolioCompany[];
    portfolioStats: FundStatistics;
    funds: FundMetadata[] | undefined;
    perFundStats: Record<string, FundStatistics> | undefined;
  };
  location: any;
}

const Portfolio = ({ pageContext, location }: PortfolioProps) => {

  // State for fund filtering (default to "All" for stats/charts)
  const [selectedFundId, setSelectedFundId] = useState<string>('all');
  // State for company list filtering (independent)
  const [filter, setFilter] = useState('all');

  const allCompanies = pageContext.companies ?? [];
  const aggregateStats = pageContext.portfolioStats;
  const funds = pageContext.funds ?? []; // Metadata: [{id, name, status}, ...]
  const perFundStats = pageContext.perFundStats ?? {};

  // Resolve current fund selection
  const isAllFunds = selectedFundId === 'all';
  const selectedFundMetadata = funds.find(f => f.id === selectedFundId);
  const selectedFundName = selectedFundMetadata?.name || 'All';
  const currentFundStatus = selectedFundMetadata?.status || '';

  // Filter companies based on SELECTED FUND (For Charts/Stats ONLY)
  // This is the "Universe" for the top section (Stats + Charts)
  const fundCompaniesForStats = useMemo(() => {
    if (isAllFunds) return allCompanies;
    return allCompanies.filter(c => c.fund === selectedFundName);
  }, [allCompanies, isAllFunds, selectedFundName]);

  const hasDataForStats = fundCompaniesForStats.length > 0;

  // Determine which stats to show
  const currentStats = isAllFunds ? aggregateStats : (perFundStats[selectedFundName] || {
    totalInvestments: 0,
    totalCompanies: 0,
    averageInvestment: 0,
    medianValuation: 0,
    investmentsLast12Months: 0,
    companiesLast12Months: 0
  });

  // Calculate charts based on FUND companies (Top Section)
  const sectorData = useMemo(() => groupByCount<string>(fundCompaniesForStats.flatMap(c => c.sectors), s => s), [fundCompaniesForStats]);
  const stageData = useMemo(() => groupByCount(fundCompaniesForStats, c => c.stage), [fundCompaniesForStats]);
  const techData = useMemo(() => groupByCount(fundCompaniesForStats, c => c.technology), [fundCompaniesForStats]);
  const hqData = useMemo(() => groupByCount(fundCompaniesForStats, c => c.hq), [fundCompaniesForStats]);

  // BOTTOM SECTION: Portfolio Companies List
  // This is independent of the top switcher as per user request
  // Derived from ALL companies, but we collect fund names for the filter dropdown
  const fundNamesForFilter = useMemo(() => funds.map(f => f.name), [funds]);
  const industries = useMemo(
    () => Array.from(new Set(allCompanies.flatMap(c => c.sectors ?? []))),
    [allCompanies]
  );

  // Filter for the list below
  const displayedCompanies = useMemo(() => {
    return allCompanies.filter(company => {
      if (filter === 'all') return true;
      if (filter === 'announced') return company.announced;
      if (filter === 'stealth') return !company.announced;
      if (filter.startsWith('fund:')) {
        const fundNameFromFilter = filter.split(':')[1];
        return company.fund !== undefined && company.fund !== null && String(company.fund) === fundNameFromFilter;
      }
      return company.sectors?.includes(filter);
    });
  }, [allCompanies, filter]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value), []);
  const handleFundChange = (id: string) => {
    setSelectedFundId(id);
    // Do NOT reset local filter; they are independent
  };

  /* Render the page */
  return (
    <Layout title="Portfolio Dashboard - Silicon Roundabout Ventures" location={location}>
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />
        <div className="container mx-auto px-4">

          {/* Title & Subtitle */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Portfolio Dashboard/&gt;</h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">Welcome to the public version of our portfolio dashboard, feeding directly from our database. Don't trust our PR words, see for yourself what we invest in:</p>

            {/* Fund Switcher */}
            {funds.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <button
                  onClick={() => handleFundChange('all')}
                  className={`px-6 py-2 rounded-full font-mono transition-all border ${isAllFunds
                    ? 'bg-srv-teal text-black border-srv-teal font-bold'
                    : 'bg-black/40 text-white border-white/20 hover:border-srv-teal/50'
                    }`}
                >
                  All Funds
                </button>
                {funds.map(fund => (
                  <button
                    key={fund.id}
                    onClick={() => handleFundChange(fund.id)}
                    className={`px-6 py-2 rounded-full font-mono transition-all border flex items-center gap-2 ${selectedFundId === fund.id
                      ? 'bg-srv-teal text-black border-srv-teal font-bold'
                      : 'bg-black/40 text-white border-white/20 hover:border-srv-teal/50'
                      }`}
                  >
                    {fund.name}
                    {fund.status && <span className={`text-xs px-2 py-0.5 rounded-sm ${selectedFundId === fund.id ? 'bg-black/20' : 'bg-white/20'}`}>{fund.status}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Statistics & Charts OR Placeholder */}
          <ClientOnly fallback={<div className="text-white/80 text-center py-6">Loading charts...</div>}>
            {hasDataForStats ? (
              <>
                <StatisticsSection statistics={currentStats} />
                <ChartsSection sectorData={sectorData} stageData={stageData} techData={techData} hqData={hqData} />
              </>
            ) : (
              <div className="max-w-4xl mx-auto my-16">
                <GlassCard className="p-12 text-center border-srv-pink/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-srv-pink via-srv-teal to-srv-yellow opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-6xl mb-6">🚀</span>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {currentFundStatus === 'Launching soon...' ? 'Launching Soon...' : 'No Data Available Yet'}
                    </h3>
                    <p className="text-xl text-white/80 max-w-2xl mb-8">
                      Thank you for your interest in Silicon Roundabout Ventures. This Fund doesn't have data to show yet.
                      If you like what we're doing and would like to stay updated, please get in touch:
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
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
                </GlassCard>
              </div>
            )}
          </ClientOnly>

          {/* Portfolio Section (ALWAYS VISIBLE) */}
          <div className="mb-8 mt-12">

            {/* Portfolio Filter Menu */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center"><span className="mr-2">🏢</span>Portfolio Companies</h2>
              <div className="relative">
                <select value={filter} onChange={handleFilterChange} className="appearance-none bg-black/40 text-white border-2 border-white/20 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-srv-teal/60 focus:ring-0 hover:border-white/30 transition-colors cursor-pointer">
                  <option value="all">🔍 All Companies</option>
                  <option value="announced">🚀 Announced Only</option>
                  <option value="stealth">🔒 Stealth Only</option>
                  {funds.length > 0 && (<optgroup label="By Fund">{funds.map((fund) => (<option key={`fund-${fund.id}`} value={`fund:${fund.name}`}>{fund.name}</option>))}</optgroup>)}
                  <optgroup label="By Industry">{industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}</optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Portfolio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedCompanies.length > 0 ? displayedCompanies.map((company) => (<PortfolioCard key={company.id} company={company} />)) : (<div className="col-span-full text-center py-12"><p className="text-srv-gray">No companies found matching the selected filter.</p></div>)}
            </div>
          </div>

          {/* Common Footer CTAs (Only if Stats visible, otherwise redundant with placeholder) */}
          {hasDataForStats && (
            <div className="flex flex-wrap gap-4 justify-center mt-16 mb-10">
              <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80"><Link to="/apply">Apply For Funding <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20"><Link to="/forinvestors">LP Enquiries <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          )}

          {/* Feedback CTA */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 font-mono text-center">&lt;Recommendations welcome!/&gt;</h3>
            <div className="grid grid-cols-1 text-srv-yellow md:grid-cols-1 lg:grid-cols-3 gap-6">
              <FeatureCard title={<><span className="text-srv-pink">Open Source</span></>} description="We welcome your feedback and recommendations for how we can improve our transparency and public page" />
              <GlassCard className="flex items-center justify-center p-10"><a href="https://github.com/silicon-roundabout-ventures/roundabout-ventures-dashboard" target="_blank"><Button className="bg-srv-yellow text-black hover:bg-srv-yellow/80">Contribute on GitHub</Button></a></GlassCard>
              <GlassCard className="flex items-center justify-center p-10"><div> ...or drop us an email or LinkedIn DM!</div></GlassCard>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export const Head: HeadFC = ({ location }) => (
  <SEO
    title="Portfolio Dashboard - Silicon Roundabout Ventures"
    description="Live portfolio dashboard of our Deep Tech investments"
    image="/images/previews/og-portfolio.png"
    pathname={location.pathname}
  />
)

export default Portfolio;

import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Layout from '@/components/layouts/Layout';
import { PortfolioCompany, FundStatistics } from '@/config/airtableConfig';

//Data Components
import { groupByCount } from '@/utils/groupBy';

//UI Portfolio Components
import PortfolioCard from '@/components/widgets/PortfolioCard';
import ParticleBackground from '@/components/layouts/ParticleBackground';

const StatisticsSection = lazy(() => import('@/components/sections/StatisticsSection'));
const ChartsSection = lazy(() => import('@/components/sections/ChartsSection'));

//CTA UI Components
import { Link } from 'gatsby';
import { FeatureCard } from '@/components/parts/FeatureCard';
import { GlassCard } from '@/components/parts/GlassCard';
import { Button } from '@/components/parts/button';
import { ArrowRight } from 'lucide-react';

interface PortfolioProps {
  pageContext: {
    companies: PortfolioCompany[];
    portfolioStats: FundStatistics;
  };
  location: any;
}

const Portfolio = ({ pageContext, location }: PortfolioProps) => {

  /* Turn pageContext company data into chart-friendly format and memoise it for optimisation */ 
  const [filter, setFilter] = useState('all');
  const companies = pageContext.companies ?? [];
  const statistics = pageContext.portfolioStats;

  const sectorData = useMemo(
    () => groupByCount<string>(companies.flatMap(c => c.sectors), s => s),
    [companies]
  );
  const stageData = useMemo(
    () => groupByCount(companies, c => c.stage),
    [companies]
  );
  const techData = useMemo(
    () => groupByCount(companies, c => c.technology),
    [companies]
  );
  const hqData = useMemo(
    () => groupByCount(companies, c => c.hq),
    [companies]
  );

  const funds = useMemo(() => companies
    .filter(company => company.fund !== undefined && company.fund !== null)
    .map(company => String(company.fund))
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort(), [companies]);
  const industries = useMemo(
    () => Array.from(new Set(companies.flatMap(c => c.sectors ?? []))),
    [companies]
  );

  //ready up company data for filtering
  const filteredCompanies = companies.filter(company => {
    if (filter === 'all') return true;
    if (filter === 'announced') return company.announced;
    if (filter === 'stealth') return !company.announced;
    if (filter.startsWith('fund:')) {
      const fundNumber = filter.split(':')[1];
      return company.fund !== undefined && company.fund !== null && String(company.fund) === fundNumber;
    }
    return company.sectors?.includes(filter);
  });

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value), []);

  /* Render the page */
  return (
    <Layout title="Portfolio - Silicon Roundabout Ventures" location={location}>
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />
        <div className="container mx-auto px-4">

          {/* Title & Subtitle */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Our Portfolio/&gt;</h1>
            <p className="text-white/90 max-w-2xl mx-auto">Don't trust our PR words, see for yourself what we invest in:</p>
          </div>

          {/* Statistics */}
          <Suspense fallback={<div className="text-white/80 text-center py-6">Loading charts...</div>}>
            <StatisticsSection statistics={statistics} />
            <ChartsSection sectorData={sectorData} stageData={stageData} techData={techData} hqData={hqData} />
          </Suspense>

          {/* Portfolio Section */}
          <div className="mb-8">

            {/* Portfolio Filter Menu */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center"><span className="mr-2">🏢</span>Portfolio Companies</h2>
              <div className="relative">
                <select value={filter} onChange={handleFilterChange} className="appearance-none bg-black/40 text-white border-2 border-white/20 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-srv-teal/60 focus:ring-0 hover:border-white/30 transition-colors cursor-pointer">
                  <option value="all">🔍 All Companies</option>
                  <option value="announced">🚀 Announced Only</option>
                  <option value="stealth">🔒 Stealth Only</option>
                  {funds.length > 0 && (<optgroup label="By Fund">{funds.map((fund) => (<option key={`fund-${fund}`} value={`fund:${fund}`}>{fund}</option>))}</optgroup>)}
                  <optgroup label="By Industry">{industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}</optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Portfolio Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCompanies.length > 0 ? filteredCompanies.map((company) => (<PortfolioCard key={company.id} company={company}/>)) : (<div className="col-span-full text-center py-12"><p className="text-srv-gray">No companies found matching the selected filter.</p></div>)}
              </div>           
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center mt-16 mb-10">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80"><Link to="/apply">Apply For Funding <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20"><Link to="/forinvestors">LP Enquiries <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
          </div>

          {/* Feedback CTA */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 font-mono text-center">&lt;Recommendations welcome!/&gt;</h3>
            <div className="grid grid-cols-1 text-srv-yellow md:grid-cols-1 lg:grid-cols-3 gap-6">
              <FeatureCard title={<><span className="text-srv-pink">Open Source</span></>} description="We welcome your feedback and recommendations for how we can improve our transparency and public page"/>
              <GlassCard className="flex items-center justify-center p-10"><a href="https://github.com/silicon-roundabout-ventures/roundabout-ventures-dashboard" target="_blank"><Button className="bg-srv-yellow text-black hover:bg-srv-yellow/80">Contribute on GitHub</Button></a></GlassCard>
              <GlassCard className="flex items-center justify-center p-10"><div> ...or drop us an email or LinkedIn DM!</div></GlassCard>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;

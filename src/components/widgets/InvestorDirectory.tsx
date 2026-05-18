import { useState, useMemo, useCallback } from 'react';
import type { VCInvestor } from '@/config/airtableConfig';
import InvestorCard from '@/components/widgets/InvestorCard';

interface InvestorDirectoryProps {
  investors: VCInvestor[];
  showContacts?: boolean;
  headerSlot?: React.ReactNode;
}

const InvestorDirectory = ({ investors, showContacts, headerSlot }: InvestorDirectoryProps) => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [geoFilter, setGeoFilter] = useState('all');

  const types = useMemo(
    () => Array.from(new Set(investors.map(i => i.type).filter(Boolean))).sort(),
    [investors]
  );
  const stages = useMemo(
    () => Array.from(new Set(investors.flatMap(i => i.stage))).sort(),
    [investors]
  );
  const industries = useMemo(
    () => Array.from(new Set(investors.flatMap(i => i.industryTags))).sort(),
    [investors]
  );
  const geographies = useMemo(
    () => Array.from(new Set(investors.flatMap(i => i.targetGeography))).sort(),
    [investors]
  );

  const displayed = useMemo(() => {
    return investors.filter(investor => {
      if (typeFilter !== 'all' && investor.type !== typeFilter) return false;
      if (stageFilter !== 'all' && !investor.stage.includes(stageFilter)) return false;
      if (industryFilter !== 'all' && !investor.industryTags.includes(industryFilter)) return false;
      if (geoFilter !== 'all' && !investor.targetGeography.includes(geoFilter)) return false;
      return true;
    });
  }, [investors, typeFilter, stageFilter, industryFilter, geoFilter]);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value), []);
  const handleStageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setStageFilter(e.target.value), []);
  const handleIndustryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setIndustryFilter(e.target.value), []);
  const handleGeoChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setGeoFilter(e.target.value), []);

  const selectClass = "appearance-none bg-black/40 text-white border-2 border-white/20 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:border-srv-teal/60 focus:ring-0 hover:border-white/30 transition-colors cursor-pointer";
  const selectWrapperClass = "relative";
  const chevron = (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </div>
  );

  return (
    <>
      {headerSlot}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-white/80 text-sm font-medium">Filter by:</span>

        <div className={selectWrapperClass}>
          <select value={typeFilter} onChange={handleTypeChange} className={selectClass}>
            <option value="all">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {chevron}
        </div>

        <div className={selectWrapperClass}>
          <select value={stageFilter} onChange={handleStageChange} className={selectClass}>
            <option value="all">All Stages</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {chevron}
        </div>

        <div className={selectWrapperClass}>
          <select value={industryFilter} onChange={handleIndustryChange} className={selectClass}>
            <option value="all">All Industries</option>
            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
          {chevron}
        </div>

        <div className={selectWrapperClass}>
          <select value={geoFilter} onChange={handleGeoChange} className={selectClass}>
            <option value="all">All Geographies</option>
            {geographies.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          {chevron}
        </div>

        <span className="text-white/60 text-sm ml-auto">
          {displayed.length} of {investors.length} investors
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {displayed.length > 0 ? (
          displayed.map(investor => (
            <InvestorCard key={investor.id} investor={investor} showContacts={showContacts} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-srv-gray">No investors found matching the selected filters.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InvestorDirectory;

import { useMemo } from 'react';
import { usePortfolioCompanies } from '../services/AirtableService';

type ChartData = { name: string; value: number }[];

export function usePortfolioChartData() {
  const companies = usePortfolioCompanies() || [];

  const industryData = useMemo<ChartData>(() => {
    const split: Record<string, number> = {};
    companies.forEach(c => {
      if (c.industry && c.industry.length) {
        c.industry.forEach(ind => {
          split[ind] = (split[ind] || 0) + 1;
        });
      }
    });
    return Object.entries(split).map(([name, value]) => ({ name, value }));
  }, [companies]);

  const stageData = useMemo<ChartData>(() => {
    const split: Record<string, number> = {};
    companies.forEach(c => {
      split[c.stage] = (split[c.stage] || 0) + 1;
    });
    return Object.entries(split).map(([name, value]) => ({ name, value }));
  }, [companies]);

  const techData = useMemo<ChartData>(() => {
    const count: Record<string, number> = {};
    companies.forEach(c => {
      const type = c.technologyType || 'Unknown';
      count[type] = (count[type] || 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  }, [companies]);

  const hqData = useMemo<ChartData>(() => {
    const count: Record<string, number> = {};
    companies.forEach(c => {
      const hq = c.headquarter || 'Unknown';
      count[hq] = (count[hq] || 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  }, [companies]);

  return { industryData, stageData, techData, hqData };
}

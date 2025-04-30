import React from 'react';
import ClientOnly from '@/components/layouts/ClientOnly';
import StatisticCard from '@/components/widgets/StatisticCard';
import { FundStatistics } from '../../config/airtableConfig';

interface StatisticsSectionProps {
  statistics: FundStatistics;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics }) => (
  <ClientOnly fallback={<div className="h-24 bg-muted animate-pulse rounded-lg"></div>}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatisticCard
        title="Total Investments"
        value={statistics.totalInvestments ? `£${(statistics.totalInvestments / 1000000).toFixed(1)}M` : '£0M'}
        icon={<span className="text-srv-teal text-xl">💸</span>}
        change={statistics.investmentsLast12Months ? `£${(statistics.investmentsLast12Months / 1000000).toFixed(1)}M in last 12m` : 'No data for last 12m'}
        trend="neutral"
      />
      <StatisticCard
        title="Portfolio Companies"
        value={statistics.totalCompanies}
        icon={<span className="text-srv-teal text-xl">🏢</span>}
        change={statistics.companiesLast12Months ? `+${statistics.companiesLast12Months} in last 12m` : 'No new companies'}
        trend={statistics.companiesLast12Months > 0 ? 'up' : 'neutral'}
      />
      <StatisticCard
        title="Average Investment"
        value={statistics.averageInvestment ? `£${(statistics.averageInvestment / 1000).toFixed(0)}k` : '£0k'}
        icon={<span className="text-srv-teal text-xl">📊</span>}
      />
      <StatisticCard
        title="Median Valuation"
        value={statistics.medianValuation ? `£${(statistics.medianValuation / 1000000).toFixed(1)}M` : '£0M'}
        icon={<span className="text-srv-teal text-xl">📈</span>}
      />
    </div>
  </ClientOnly>
);

export default StatisticsSection;

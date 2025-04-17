/**
 * DashboardOverview Component
 * 
 * A high-level overview section for the dashboard homepage
 * Displays key statistics and summary information
 */
import React from 'react';
import { Link } from 'gatsby';
import { usePortfolioStats } from '../../hooks/usePortfolioStats';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import StatisticDisplay from '../data-display/StatisticDisplay';
import ChartDisplay from '../data-display/ChartDisplay';
import PortfolioCompanyCard from '../data-display/PortfolioCompanyCard';
import { 
  CircleDollarSign, 
  Building2, 
  TrendingUp, 
  ChartPie,
  ArrowRight,
  Award,
  Calendar,
} from 'lucide-react';
import { Button } from '../ui/button';
import DataCard from '../data-display/DataCard';
import ClientOnly from '../common/ClientOnly';

interface DashboardOverviewProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Dashboard overview section for the homepage
 */
const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  className = "" 
}) => {
  // Get portfolio statistics
  const { 
    summaryData, 
    industryChartData, 
    stageChartData,
    isLoading: isLoadingStats
  } = usePortfolioStats();

  // Get portfolio company data
  const {
    allCompanies,
    isLoading: isLoadingCompanies,
    hasError,
    errorMessage,
  } = usePortfolioData();
  
  // Get most recent investments (up to 3)
  const recentInvestments = React.useMemo(() => {
    if (!allCompanies.length) return [];
    
    // Sort by date invested (most recent first)
    return [...allCompanies]
      .filter(company => !!company.dateInvested)
      .sort((a, b) => {
        const dateA = new Date(a.dateInvested || 0);
        const dateB = new Date(b.dateInvested || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);
  }, [allCompanies]);
  
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <Link to="/portfolio">
          <Button variant="ghost" size="sm" className="gap-1">
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {/* Statistics Cards */}
      <ClientOnly fallback={<div className="h-24 bg-muted animate-pulse rounded-lg"></div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticDisplay
            title="Total Investments"
            value={summaryData.totalInvestments.formatted}
            icon={<CircleDollarSign className="h-4 w-4" />}
            changeText={summaryData.totalInvestments.changeFormatted}
            isLoading={isLoadingStats}
            variant="outline"
          />
          
          <StatisticDisplay
            title="Portfolio Companies"
            value={summaryData.totalCompanies.formatted}
            icon={<Building2 className="h-4 w-4" />}
            changeText={summaryData.totalCompanies.changeFormatted}
            trend="up"
            isLoading={isLoadingStats}
            variant="outline"
          />
          
          <StatisticDisplay
            title="Average Investment"
            value={summaryData.averageInvestment.formatted}
            icon={<ChartPie className="h-4 w-4" />}
            isLoading={isLoadingStats}
            variant="outline"
          />
          
          <StatisticDisplay
            title="Median Valuation"
            value={summaryData.medianValuation.formatted}
            icon={<TrendingUp className="h-4 w-4" />}
            isLoading={isLoadingStats}
            variant="outline"
          />
        </div>
      </ClientOnly>
      
      {/* Charts and Recent Investments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Industry Distribution Chart */}
        <ChartDisplay
          type="pie"
          title="Industry Distribution"
          description="Portfolio companies by industry sector"
          data={industryChartData}
          isLoading={isLoadingStats}
          hasError={hasError}
          errorMessage={errorMessage}
          height={250}
        />
        
        {/* Stage Distribution Chart */}
        <ChartDisplay
          type="pie"
          title="Investment Stage"
          description="Portfolio companies by investment stage"
          data={stageChartData}
          isLoading={isLoadingStats}
          hasError={hasError}
          errorMessage={errorMessage}
          height={250}
        />
        
        {/* Recent Investments */}
        <DataCard 
          title="Recent Investments" 
          icon={<Calendar className="h-4 w-4" />}
          isLoading={isLoadingCompanies}
          hasError={hasError}
          errorMessage={errorMessage}
        >
          <div className="space-y-4">
            {recentInvestments.length > 0 ? (
              <div className="space-y-3">
                {recentInvestments.map(company => (
                  <div key={company.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="w-10 h-10 object-contain rounded-md"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/20">
                        <span className="text-sm font-bold">{company.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-grow">
                      <h4 className="font-medium">
                        {company.name}
                        {!company.announced && <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded">Stealth</span>}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(company.dateInvested || '').toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'short',
                        })}
                        {company.stage && ` · ${company.stage}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Award className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No recent investments to display</p>
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t">
            <Link to="/portfolio">
              <Button variant="ghost" size="sm" className="w-full gap-1 justify-center">
                View All Investments
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </DataCard>
      </div>
    </div>
  );
};

export default DashboardOverview;

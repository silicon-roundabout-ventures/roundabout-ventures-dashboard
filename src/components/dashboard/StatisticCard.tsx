
import React from 'react';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatisticCard: React.FC<StatisticCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend = 'neutral' 
}) => {
  return (
    <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white/90 font-medium text-sm mb-1 flex items-center">
            {title.includes('Total Investments') && '💰 '}
            {title.includes('Portfolio') && '💼 '}
            {title.includes('Average') && '📈 '}
            {title.includes('Median') && '📉 '}
            {title.includes('Return') && '⭐ '}
            {title.includes('Fund') && '🌐 '}
            {title}
          </h3>
          <p className="text-white text-2xl font-medium">{value}</p>
        </div>
        {icon && (
          <div className="border-2 border-white/20 p-2 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <div className="mt-4 flex items-center border-t-2 border-white/10 pt-3">
          <span 
            className={`text-xs font-medium mr-1 flex items-center ${
              trend === 'up' ? 'text-emerald-400' : 
              trend === 'down' ? 'text-pink-400' : 
              'text-white/80'
            }`}
          >
            {trend === 'up' && '📈 '}
            {trend === 'down' && '📉 '}
            {trend === 'neutral' && '⏰ '}
            {change}
          </span>
          {trend === 'up' && (
            <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-3 h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;

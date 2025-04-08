
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
    <div className="dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-srv-gray font-medium text-sm mb-1">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="bg-srv-teal/10 p-2 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          <span 
            className={`text-xs font-medium mr-1 ${
              trend === 'up' ? 'text-green-400' : 
              trend === 'down' ? 'text-red-400' : 
              'text-srv-gray'
            }`}
          >
            {change}
          </span>
          {trend === 'up' && (
            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;

/**
 * ChartDisplay Component
 * 
 * A standardized component for displaying different types of charts
 * Uses recharts for rendering charts with consistent styling
 */
import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartData } from '../../hooks/usePortfolioStats';
import DataCard from './DataCard';

// Types of supported charts
export type ChartType = 'pie' | 'bar' | 'line';

// Props for the ChartDisplay component
interface ChartDisplayProps {
  /** Type of chart to display */
  type: ChartType;
  /** Title of the chart */
  title: string;
  /** Description for the chart */
  description?: string;
  /** Data for the chart */
  data: ChartData;
  /** Whether the chart data is loading */
  isLoading?: boolean;
  /** Whether the chart encountered an error */
  hasError?: boolean;
  /** Error message if applicable */
  errorMessage?: string;
  /** Height of the chart in pixels */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Additional legend to display below chart */
  footer?: React.ReactNode;
}

/**
 * ChartDisplay component for visualizing data as different chart types
 */
const ChartDisplay: React.FC<ChartDisplayProps> = ({
  type = 'pie',
  title,
  description,
  data,
  isLoading = false,
  hasError = false,
  errorMessage,
  height = 300,
  className = "",
  footer,
}) => {
  // Format data for recharts
  const formattedData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));
  
  // Render appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={height / 3}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {formattedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={data.colors?.[index] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Count"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                {formattedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={data.colors?.[index] || '#3b82f6'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Unsupported chart type: {type}</p>
          </div>
        );
    }
  };
  
  return (
    <DataCard
      title={title}
      description={description}
      isLoading={isLoading}
      hasError={hasError}
      errorMessage={errorMessage}
      className={className}
      footer={footer}
    >
      <div className="px-2">
        {renderChart()}
      </div>
    </DataCard>
  );
};

export default ChartDisplay;

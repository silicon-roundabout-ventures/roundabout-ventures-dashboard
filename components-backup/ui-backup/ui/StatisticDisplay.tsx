/**
 * StatisticDisplay Component
 * 
 * A standardized component for displaying statistics with trend indicators
 * Used for portfolio statistics, fund performance metrics, etc.
 */
import React, { ReactNode } from 'react';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

// Variants for the statistics display using cva for type-safe variants
const statisticVariants = cva(
  "rounded-lg p-4 flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        outline: "border border-border bg-transparent",
        primary: "bg-primary/10 text-primary-foreground",
        muted: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "space-y-1",
        md: "space-y-2",
        lg: "space-y-3",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Trend directions for the statistics
export type TrendDirection = 'up' | 'down' | 'neutral';

// Props for the StatisticDisplay component
export interface StatisticDisplayProps extends VariantProps<typeof statisticVariants> {
  /** Main title/label for the statistic */
  title: string;
  /** The value to display (can be a string, number, or react node) */
  value: ReactNode;
  /** Optional secondary value or comparison text */
  secondaryValue?: ReactNode;
  /** Icon to display alongside the statistic */
  icon?: ReactNode;
  /** Trend direction - affects the indicator icon and color */
  trend?: TrendDirection;
  /** Change text (e.g., "+15% from last month") */
  changeText?: string;
  /** Additional CSS class name */
  className?: string;
  /** Whether the statistic is loading */
  isLoading?: boolean;
}

/**
 * StatisticDisplay component for showing numerical statistics with trends
 */
export const StatisticDisplay: React.FC<StatisticDisplayProps> = ({
  title,
  value,
  secondaryValue,
  icon,
  trend = 'neutral',
  changeText,
  variant,
  size,
  className = "",
  isLoading = false,
}) => {
  // Get the appropriate trend icon
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpCircle size={16} className="text-green-500" />;
      case 'down':
        return <ArrowDownCircle size={16} className="text-red-500" />;
      default:
        return <MinusCircle size={16} className="text-gray-400" />;
    }
  };
  
  // Get the trend text color
  const getTrendTextColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };
  
  // If loading, show skeleton UI
  if (isLoading) {
    return (
      <div className={`${statisticVariants({ variant, size })} ${className} animate-pulse`}>
        <div className="h-5 w-1/2 bg-muted-foreground/20 rounded mb-2"></div>
        <div className="h-8 w-2/3 bg-muted-foreground/20 rounded"></div>
        {(secondaryValue || changeText) && (
          <div className="h-4 w-1/3 bg-muted-foreground/20 rounded mt-1"></div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`${statisticVariants({ variant, size })} ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold">{value}</div>
        {secondaryValue && (
          <div className="text-sm text-muted-foreground mb-1">{secondaryValue}</div>
        )}
      </div>
      
      {changeText && (
        <div className="flex items-center gap-1 text-xs">
          {getTrendIcon()}
          <span className={getTrendTextColor()}>{changeText}</span>
        </div>
      )}
    </div>
  );
};

export default StatisticDisplay;

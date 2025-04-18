/**
 * DataCard Component
 * 
 * A simple wrapper around Card component for consistent styling of data cards
 */
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { cn } from '../../utils/utils';

interface DataCardProps {
  /** Card header content */
  header?: React.ReactNode;
  /** Title text (alternative to header) */
  title?: string;
  /** Icon to display next to title */
  icon?: React.ReactNode;
  /** Card main content */
  children: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Whether the card is clickable */
  clickable?: boolean;
  /** On click handler */
  onClick?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  hasError?: boolean;
  /** Error message */
  errorMessage?: string;
}

/**
 * Styled card component for data display
 */
const DataCard: React.FC<DataCardProps> = ({
  header,
  title,
  icon,
  children,
  footer,
  className = '',
  clickable = false,
  onClick,
  isLoading = false,
  hasError = false,
  errorMessage = 'An error occurred'
}) => {
  // Create header from title and icon if no header is provided
  const renderedHeader = header || (title && (
    <div className="flex items-center space-x-2">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  ));
  
  return (
    <Card 
      className={cn(
        className,
        clickable && 'cursor-pointer transition-all duration-200 hover:shadow-md'
      )}
      onClick={clickable && onClick ? onClick : undefined}
    >
      {renderedHeader && <CardHeader>{renderedHeader}</CardHeader>}
      <CardContent>
        {hasError ? (
          <div className="py-8 text-center text-destructive">
            {errorMessage}
          </div>
        ) : isLoading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          </div>
        ) : (
          children
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default DataCard;

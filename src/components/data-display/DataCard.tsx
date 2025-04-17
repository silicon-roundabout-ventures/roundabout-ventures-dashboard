/**
 * DataCard Component
 * 
 * A flexible card component for displaying various types of data
 * with consistent styling and error handling
 */
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { AlertCircle } from "lucide-react";

// Props for the DataCard component
interface DataCardProps {
  /** Card title */
  title?: string;
  /** Card description/subtitle */
  description?: string;
  /** Icon to display in the header (optional) */
  icon?: ReactNode;
  /** Main content of the card */
  children: ReactNode;
  /** Footer content (optional) */
  footer?: ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  hasError?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Additional CSS classes for the card */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** On click handler */
  onClick?: () => void;
}

/**
 * DataCard component for displaying content in a standardized card format
 */
export const DataCard: React.FC<DataCardProps> = ({
  title,
  description,
  icon,
  children,
  footer,
  isLoading = false,
  hasError = false,
  errorMessage,
  className = "",
  size = 'md',
  onClick
}) => {
  // Size class mappings
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };
  
  // Determine if card is clickable
  const isClickable = !!onClick;
  
  // Combine all classes
  const cardClasses = `
    bg-card rounded-lg shadow 
    ${sizeClasses[size]} 
    ${isClickable ? 'cursor-pointer transition-all hover:shadow-md hover:scale-[1.01]' : ''}
    ${className}
  `;
  
  // Loading state view
  if (isLoading) {
    return (
      <Card className={cardClasses}>
        {title && (
          <CardHeader className="pb-2">
            <Skeleton className="h-7 w-1/2 mb-2" />
            {description && <Skeleton className="h-5 w-3/4" />}
          </CardHeader>
        )}
        <CardContent className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-2/3" />
        </CardContent>
        {footer && (
          <CardFooter>
            <Skeleton className="h-5 w-1/3" />
          </CardFooter>
        )}
      </Card>
    );
  }
  
  // Error state view
  if (hasError) {
    return (
      <Card className={`${cardClasses} border-red-300`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={18} />
            <CardTitle className="text-lg text-red-500">{title || 'Error'}</CardTitle>
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            {errorMessage || 'An error occurred while loading this data.'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Normal state view
  return (
    <Card className={cardClasses} onClick={onClick}>
      {(title || description) && (
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DataCard;

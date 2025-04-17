/**
 * PortfolioCompanyCard Component
 * 
 * A standardized card for displaying portfolio company information
 * with consistent styling and proper handling of stealth companies
 */
import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import DataCard from './DataCard';
import { PortfolioCompany } from '../../services/airtable/airtable';

interface PortfolioCompanyCardProps {
  /** Company data to display */
  company: PortfolioCompany;
  /** Callback when the card is clicked */
  onClick?: (company: PortfolioCompany) => void;
  /** Whether to show full details or a summary */
  variant?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Show action buttons */
  showActions?: boolean;
}

/**
 * Standardized card component for displaying portfolio company information
 */
export const PortfolioCompanyCard: React.FC<PortfolioCompanyCardProps> = ({
  company,
  onClick,
  variant = 'default',
  className = '',
  showActions = true,
}) => {
  // Handle click on the card
  const handleClick = () => {
    if (onClick) {
      onClick(company);
    }
  };
  
  // Prevent propagation for action buttons
  const handleActionClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Determine the logo to display
  const logoElement = company.logo ? (
    <img 
      src={company.logo} 
      alt={`${company.name} logo`} 
      className="w-12 h-12 md:w-16 md:h-16 object-contain"
      loading="lazy"
    />
  ) : (
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-primary/20">
      <span className="text-xl font-bold">{company.name.charAt(0)}</span>
    </div>
  );
  
  // For stealth companies, show a badge
  const stealthBadge = !company.announced ? (
    <Badge variant="secondary" className="ml-2">Stealth</Badge>
  ) : null;
  
  // For compact variant
  if (variant === 'compact') {
    return (
      <DataCard
        className={`cursor-pointer hover:bg-card/80 transition-colors ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {logoElement}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-base truncate flex items-center">
              {company.name}
              {stealthBadge}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{company.stage}</p>
          </div>
        </div>
      </DataCard>
    );
  }
  
  // Default variant with more details
  return (
    <DataCard
      className={`h-full ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick ? handleClick : undefined}
    >
      <div className="flex flex-col h-full">
        {/* Logo and header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0">
            {logoElement}
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              {company.name}
              {stealthBadge}
            </h3>
            {company.industry && company.industry.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {company.industry.slice(0, 2).map((ind, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {ind}
                  </Badge>
                ))}
                {company.industry.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.industry.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Description */}
        {company.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {company.description}
          </p>
        )}
        
        {/* Stage and fund info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-auto">
          <div className="flex items-center">
            <span className="font-medium">Stage:</span>
            <span className="ml-1">{company.stage}</span>
          </div>
          {company.fund && (
            <div className="flex items-center">
              <span className="font-medium">Fund:</span>
              <span className="ml-1">{company.fund}</span>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        {showActions && (
          <div className="flex gap-2 mt-4">
            {company.website && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => handleActionClick(e, company.website)}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Website
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={(e) => handleActionClick(e)}
            >
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
        )}
      </div>
    </DataCard>
  );
};

export default PortfolioCompanyCard;

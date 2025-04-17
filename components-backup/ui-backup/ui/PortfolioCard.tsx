/**
 * PortfolioCard Component
 * 
 * A unified, flexible card for displaying portfolio company information
 * with consistent styling and proper handling of announced/stealth companies
 */
import React, { useState } from 'react';
import { ExternalLink, Info, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PortfolioCompany } from '../../services/airtable/airtable';
import DataCard from './DataCard';
import CompanyModal from '../common/CompanyModal';
import OptimizedImage from '../common/OptimizedImage';

interface PortfolioCardProps {
  /** Company data to display */
  company: PortfolioCompany;
  /** Callback when the card is clicked (overrides default modal behavior) */
  onClick?: (company: PortfolioCompany) => void;
  /** Whether to show full details or a summary */
  variant?: 'default' | 'compact' | 'dashboard';
  /** Additional CSS classes */
  className?: string;
  /** Show action buttons (website, etc.) */
  showActions?: boolean;
  /** Show modal on click (true by default) */
  showModal?: boolean;
}

/**
 * Unified card component for displaying portfolio company information
 * Combines functionality from multiple portfolio card implementations
 */
const PortfolioCard: React.FC<PortfolioCardProps> = ({
  company,
  onClick,
  variant = 'default',
  className = '',
  showActions = true,
  showModal = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle click on the card
  const handleCardClick = () => {
    if (onClick) {
      onClick(company);
    } else if (showModal) {
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Prevent propagation for action buttons
  const handleActionClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Generate company logo element
  const renderLogo = () => {
    if (company.logoUrl || company.logo) {
      return (
        <OptimizedImage
          image={company.logoUrl || company.logo || ''}
          alt={`${company.name} logo`}
          className={variant === 'compact' ? 'w-12 h-12' : 'w-full h-full'}
          objectFit="contain"
          loading="lazy"
        />
      );
    }
    
    // Fallback for no logo
    return variant === 'dashboard' ? (
      // Dashboard style placeholder
      <span className="text-primary-foreground font-semibold">{company.name.substring(0, 2)}</span>
    ) : (
      // Default placeholder
      <span className="text-xl font-bold">{company.name.charAt(0)}</span>
    );
  };

  // For stealth companies, show a badge
  const stealthBadge = !company.announced ? (
    <Badge variant="secondary" className="ml-2">Stealth</Badge>
  ) : null;
  
  // -- COMPACT VARIANT --
  if (variant === 'compact') {
    return (
      <>
        <DataCard
          className={`cursor-pointer hover:bg-card/80 transition-colors ${className}`}
          onClick={handleCardClick}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
              {renderLogo()}
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
        
        {showModal && (
          <CompanyModal
            company={company}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </>
    );
  }
  
  // -- DASHBOARD VARIANT --
  if (variant === 'dashboard') {
    // Special styling for stealth companies in dashboard view
    if (!company.announced) {
      return (
        <>
          <div 
            onClick={handleCardClick}
            className="border-2 border-white/20 rounded-lg p-3 sm:p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer relative group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
            aria-label={`View stealth company details in ${company.sector || 'Unknown'} sector`}
          >
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-lg"></div>
            <div className="flex flex-col items-center justify-center h-full relative z-10">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-3">
                <Lock className="h-7 w-7 text-white/70" />
              </div>
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-2">🔒 Stealth</p>
                <p className="text-white/80 text-sm">
                  {company.sector ? `${company.sector} Sector` : 'Undisclosed Sector'}
                </p>
                <p className="text-white/80 text-xs mt-4 font-mono">
                  🚀 {company.stage || 'Unknown Stage'}
                </p>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary text-xs">View details →</span>
            </div>
          </div>
          
          {showModal && (
            <CompanyModal
              company={company}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          )}
        </>
      );
    }

    return (
      <>
        <div 
          onClick={handleCardClick}
          className="border-2 border-white/20 rounded-lg p-3 sm:p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer relative group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
          aria-label={`View ${company.name || 'company'} details`}
        >
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-lg"></div>
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/90 rounded-md flex items-center justify-center mr-3 overflow-hidden border-2 border-white/20 shadow-sm">
                {renderLogo()}
              </div>
              <div>
                <h3 className="text-white font-medium">{company.name}</h3>
                <p className="text-white/80 text-xs font-mono">🚀 {company.stage || 'Unknown Stage'}</p>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4 flex-grow leading-relaxed">
              {company.oneLiner || 'No description available'}
            </p>
            
            <div className="mt-auto">
              {company.sector && (
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="border-2 border-primary/40 text-primary text-xs px-2 py-0.5 rounded-full bg-primary/10">
                    {company.sector}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t-2 border-white/10">
                <div className="flex items-center">
                  <span className="text-white/80 text-xs font-medium">
                    {company.investmentDate 
                      ? new Date(company.investmentDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })
                      : 'N/A'}
                  </span>
                  
                  {company.fund && (
                    <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                      {company.fund}
                    </span>
                  )}
                </div>
                
                <span className="text-primary text-xs">View details →</span>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <CompanyModal
            company={company}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </>
    );
  }
  
  // -- DEFAULT VARIANT --
  return (
    <>
      <DataCard
        className={`h-full ${onClick || showModal ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick || showModal ? handleCardClick : undefined}
      >
        <div className="flex flex-col h-full">
          {/* Logo and header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
              {renderLogo()}
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-base truncate flex items-center">
                {company.name}
                {stealthBadge}
              </h3>
              {company.stage && (
                <p className="text-sm text-muted-foreground truncate">{company.stage}</p>
              )}
            </div>
          </div>
          
          {/* Description */}
          {company.oneLiner && (
            <p className="text-sm text-muted-foreground mb-4">{company.oneLiner}</p>
          )}
          
          {/* Sector tag */}
          {company.sector && (
            <div className="flex flex-wrap gap-1 mt-auto mb-4">
              <Badge variant="outline" className="bg-primary/10">
                {company.sector}
              </Badge>
            </div>
          )}
          
          {/* Action buttons */}
          {showActions && company.website && (
            <div className="flex mt-auto pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={(e) => handleActionClick(e, company.website)}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Website
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs ml-auto"
                onClick={handleCardClick}
              >
                <Info className="mr-1 h-3 w-3" />
                Details
              </Button>
            </div>
          )}
        </div>
      </DataCard>
      
      {showModal && (
        <CompanyModal
          company={company}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default PortfolioCard;

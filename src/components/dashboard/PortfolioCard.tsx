
import React from 'react';
import { PortfolioCompany } from '../../services/AirtableService';

interface PortfolioCardProps {
  company: PortfolioCompany;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ company }) => {
  if (!company.announced) {
    return (
      <div className="border-2 border-white/20 rounded-lg p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:shadow-md">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white/90 text-sm font-medium mb-2">🔒 Stealth Mode</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {company.industry.map((tag, index) => (
                <span key={index} className="border border-white/20 text-white/90 text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white/80 text-xs mt-4 font-mono">🚀 {company.stage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-white/20 rounded-lg p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:shadow-md">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-white/90 rounded-md flex items-center justify-center mr-3 overflow-hidden border-2 border-white/20 shadow-sm">
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
            ) : (
              <span className="text-srv-dark font-semibold">{company.name.substring(0, 2)}</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{company.name}</h3>
            <p className="text-white/80 text-xs font-mono">🚀 {company.stage}</p>
          </div>
        </div>
        
        <p className="text-white/80 text-sm mb-5 flex-grow leading-relaxed">{company.description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {company.industry.map((tag, index) => (
              <span key={index} className="border-2 border-srv-teal/40 text-srv-teal text-xs px-2 py-0.5 rounded-full bg-srv-teal/10">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t-2 border-white/10">
            <span className="text-white/80 text-xs font-medium">
              {new Date(company.investmentDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </span>
            {company.website && (
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-srv-teal hover:text-srv-teal/80 text-sm transition-colors border-2 border-srv-teal/30 px-3 py-1 rounded-md hover:border-srv-teal/50"
              >
                🔗 Visit
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

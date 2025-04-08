
import React from 'react';
import { PortfolioCompany } from '../../services/AirtableService';

interface PortfolioCardProps {
  company: PortfolioCompany;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ company }) => {
  if (!company.announced) {
    return (
      <div className="dashboard-card stealth-mode rounded-lg shadow p-6 h-full">
        <div className="flex flex-col items-center justify-center h-full opacity-80">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white/70 text-sm mb-2">Coming Soon</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {company.industry.map((tag, index) => (
                <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4">{company.stage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 overflow-hidden">
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
            ) : (
              <span className="text-srv-blue font-bold">{company.name.substring(0, 2)}</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold">{company.name}</h3>
            <p className="text-srv-gray text-sm">{company.stage}</p>
          </div>
        </div>
        
        <p className="text-white/80 text-sm mb-4 flex-grow">{company.description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {company.industry.map((tag, index) => (
              <span key={index} className="bg-srv-teal/20 text-srv-teal text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-srv-gray text-xs">
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
                className="text-srv-teal hover:underline text-sm"
              >
                Website →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

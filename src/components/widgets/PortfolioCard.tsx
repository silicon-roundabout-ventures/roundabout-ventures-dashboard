import React, { useState, lazy, Suspense } from 'react';
import { PortfolioCompany } from '@/config/airtableConfig';
const CompanyModal = lazy(() => import('./CompanyModal'));
import { Card } from '@/components/parts/Card';
import Tag from '@/components/parts/Tag';
import ViewDetailsText from '@/components/parts/ViewDetailsText';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Lock } from 'lucide-react';

interface PortfolioCardProps {
  company: PortfolioCompany;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* Stealth company card */
  // NOTE: The stelath-ification of companies happens in gatsby-node.js
  // This logic is only to make the card displayed better designed
  if (!company.announced) {
    return (
      <>
        <button
          type="button"
          onClick={handleCardClick}
          aria-label={`View stealth company details in ${company.sectors?.join(', ') || 'Unknown'} industry`}
          className="p-0 m-0 bg-transparent w-full"
        >
          <Card
            className="border-2 border-white/20 rounded-lg p-3 sm:p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-srv-teal/30 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer relative group"
          >
            <div className="absolute inset-0 bg-srv-teal/0 group-hover:bg-srv-teal/5 transition-colors rounded-lg"></div>
            <div className="flex flex-col items-center justify-center h-full relative z-10">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-3">
                <Lock className="h-7 w-7 text-white/70" />
              </div>
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-2">🔒 Stealth</p>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-3 sm:mt-4">
                  {Array.isArray(company.sectors) ? company.sectors.map((tag, index) => (
                    <Tag key={index} className="border border-white/20 text-white/90">
                      {typeof tag === 'string' ? tag : 'Unknown'}
                    </Tag>
                  )) : <Tag className="text-white/70">Stealth</Tag>}
                </div>
                <p className="text-white/80 text-xs mt-4 font-mono">🚀 Backed at: {typeof company.stage === 'string' ? company.stage : 'Unknown Stage'}</p>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ViewDetailsText />
            </div>
          </Card>
        </button>
        
        {isModalOpen && (
          <Suspense fallback={null}>
            <CompanyModal
              company={company}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCardClick}
        aria-label={`View ${company.name || 'company'} details`}
        className="p-0 m-0 bg-transparent w-full"
      >
        <Card
          className="border-2 border-white/20 rounded-lg p-3 sm:p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-srv-teal/30 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer relative group"
        >
          <div className="absolute inset-0 bg-srv-teal/0 group-hover:bg-srv-teal/5 transition-colors rounded-lg"></div>
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/90 rounded-md flex items-center justify-center mr-3 overflow-hidden border-2 border-white/20 shadow-sm">
                {company.logoImageData ? (
                  <GatsbyImage
                    image={company.logoImageData}
                    alt={`${company.name} logo`}
                    imgClassName="object-contain object-center"
                  />
                ) : company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="block max-w-full max-h-full object-contain object-center"
                  />
                ) : (
                  <span className="text-srv-dark font-semibold">{company.name.substring(0, 2)}</span>
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{company.name}</h3>
                <p className="text-white/80 text-xs font-mono">🚀 Backed at: <span className="font-semibold">{typeof company.stage === 'string' ? company.stage : 'Unknown Stage'}</span></p>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4 flex-grow leading-relaxed">
              {typeof company.oneLiner === 'string' && company.oneLiner ? 
                company.oneLiner : 
                'No one-liner available'
              }
            </p>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1 mb-3">
                {Array.isArray(company.sectors) ? company.sectors.map((tag, index) => (
                  <Tag key={index} className="border-2 border-srv-teal/40 text-srv-teal bg-srv-teal/10">
                    {typeof tag === 'string' ? tag : 'Unknown'}
                  </Tag>
                )) : <Tag className="border-2 border-srv-teal/40 text-srv-teal bg-srv-teal/10">Tech</Tag>}
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t-2 border-white/10">
                <div className="flex items-center">
                  <span className="text-white/80 text-xs font-medium">
                    {company.investmentDate && typeof company.investmentDate === 'string' 
                      ? new Date(company.investmentDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })
                      : 'N/A'}
                  </span>
                  
                  {company.fund && (
                    <span className="ml-2 bg-srv-teal/20 text-srv-teal text-xs px-2 py-0.5 rounded-full">
                      {company.fund}
                    </span>
                  )}
                </div>
                
                <ViewDetailsText />
              </div>
            </div>
          </div>
        </Card>
      </button>

      {isModalOpen && (
        <Suspense fallback={null}>
          <CompanyModal
            company={company}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default PortfolioCard;

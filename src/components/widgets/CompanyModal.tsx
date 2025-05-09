import React from 'react';
import { PortfolioCompany } from '@/config/airtableConfig';
import Modal from '@/components/parts/Modal';
import { GatsbyImage } from 'gatsby-plugin-image';

interface CompanyModalProps {
  company: PortfolioCompany;
  isOpen: boolean;
  onClose: () => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({ 
  company, 
  isOpen, 
  onClose 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={company.name}
    >
      <div className="space-y-6">
        {/* Company Photo or Logo */}
        <div className="w-full aspect-video bg-black/30 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
          {company.photoImageData ? (
            <GatsbyImage image={company.photoImageData} alt={company.name} className="w-full h-full object-contain" />
          ) : company.photo ? (
            <img src={company.photo} alt={`${company.name}`} className="w-full h-full object-contain" />
          ) : company.logoImageData ? (
            <GatsbyImage image={company.logoImageData} alt={`${company.name}`} className="w-full h-full object-contain" />
          ) : company.logo ? (
            <img src={company.logo} alt={`${company.name}`} className="w-full h-full object-contain" />
          ) : (
            <div className="text-white/50 text-lg">Coming Soon...</div>
          )}
        </div>
        
        {/* Company Info */}
        <div className="space-y-4">
          {typeof company.oneLiner === 'string' && company.oneLiner && (
            <div className="text-srv-teal font-medium italic border-l-2 border-srv-teal/30 pl-3 py-1 mb-2">
              {company.oneLiner}
            </div>
          )}
          
          <div className="text-white/90 font-light leading-relaxed">
            <h4 className="text-white/80 text-sm uppercase tracking-wide mb-2 font-medium">About the Company</h4>
            {typeof company.description === 'string' ? company.description : 'No summary available for this company.'}
          </div>
          
          {/* Sector Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.isArray(company.sectors) ? 
              company.sectors.map((tag, index) => (
                <span 
                  key={index} 
                  className="border-2 border-srv-teal/40 text-srv-teal text-xs px-2 py-0.5 rounded-full bg-srv-teal/10"
                >
                  {typeof tag === 'string' ? tag : 'Unknown'}
                </span>
              ))
            : <span className="text-white/70">No sector data available</span>}
          </div>
          
          {/* Investment Info */}
          <div className="mt-4 border-t border-white/10 pt-4 flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-white/70">Investment Date:</span>
              <span className="text-white font-medium">
                {company.investmentDate && typeof company.investmentDate === 'string' 
                  ? new Date(company.investmentDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long'
                    })
                  : 'N/A'}
              </span>
            </div>

            {company.fund && (
              <div className="flex justify-between">
                <span className="text-white/70">Fund:</span>
                <span className="text-white font-medium">{company.fund}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-white/70">Current Status:</span>
              <span className="text-white font-medium">{typeof company.currentStatus === 'string' ? company.currentStatus : 'Unknown Status'}</span>
            </div>        
            
            <div className="flex justify-between">
              <span className="text-white/70">Backed at:</span>
              <span className="text-white font-medium">{typeof company.stage === 'string' ? company.stage : 'Unknown Stage'}</span>
            </div>   

            {company.latestFollowOnRound && (
              <div className="flex justify-between">
                <span className="text-white/70">Latest Follow-on Round:</span>
                <span className="text-white font-medium">{company.latestFollowOnRound}</span>
              </div>
            )}
          </div>
          
          {/* Visit Website Button */}
          {company.website && (
            <div className="mt-6 text-center">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-srv-teal hover:bg-srv-teal/90 text-black font-medium px-6 py-2 rounded-md transition-colors"
              >
                Visit Company Website
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CompanyModal;

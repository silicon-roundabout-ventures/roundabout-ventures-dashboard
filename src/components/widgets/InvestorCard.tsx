import React from 'react';
import { VCInvestor } from '@/config/airtableConfig';
import { Card } from '@/components/parts/Card';
import Tag from '@/components/parts/Tag';
import { ExternalLink, Globe, MapPin, DollarSign } from 'lucide-react';

interface InvestorCardProps {
  investor: VCInvestor;
}

const InvestorCard: React.FC<InvestorCardProps> = ({ investor }) => {
  const displayUrl = investor.domain || (investor.website ? investor.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');

  return (
    <Card className="border-2 border-white/20 rounded-lg p-4 h-full bg-black/30 backdrop-blur-sm transition-all duration-200 hover:border-srv-teal/30 hover:shadow-lg hover:translate-y-[-2px] relative group">
      <div className="absolute inset-0 bg-srv-teal/0 group-hover:bg-srv-teal/5 transition-colors rounded-lg"></div>
      <div className="flex flex-col h-full relative z-10">
        {/* Header: Name + Type */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-medium text-sm leading-tight flex-1 mr-2">{investor.name}</h3>
          {investor.type && (
            <Tag className="bg-srv-pink/20 text-srv-pink border border-srv-pink/40 whitespace-nowrap">
              {investor.type}
            </Tag>
          )}
        </div>

        {/* Notes */}
        {investor.notes && (
          <p className="text-white/70 text-xs mb-3 line-clamp-2 leading-relaxed">{investor.notes}</p>
        )}

        {/* Stage Tags */}
        {investor.stage.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {investor.stage.map((s, i) => (
              <Tag key={i} className="border border-srv-teal/40 text-srv-teal bg-srv-teal/10">{s}</Tag>
            ))}
          </div>
        )}

        {/* Industry Tags */}
        {investor.industryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {investor.industryTags.map((tag, i) => (
              <Tag key={i} className="border border-srv-yellow/40 text-srv-yellow bg-srv-yellow/10">{tag}</Tag>
            ))}
          </div>
        )}

        {/* Meta info */}
        <div className="mt-auto space-y-1.5 pt-2 border-t border-white/10">
          {investor.targetGeography.length > 0 && (
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{investor.targetGeography.join(', ')}</span>
            </div>
          )}

          {investor.chequeSize.length > 0 && (
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <DollarSign size={12} className="shrink-0" />
              <span className="truncate">{investor.chequeSize.join(', ')}</span>
            </div>
          )}

          {investor.companyCountry.length > 0 && (
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Globe size={12} className="shrink-0" />
              <span className="truncate">{investor.companyCountry.join(', ')}</span>
            </div>
          )}

          {investor.website && (
            <a
              href={investor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-srv-teal text-xs hover:text-srv-teal/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} className="shrink-0" />
              <span className="truncate">{displayUrl}</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InvestorCard;

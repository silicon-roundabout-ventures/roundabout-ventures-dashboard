import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 transition-all hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
};

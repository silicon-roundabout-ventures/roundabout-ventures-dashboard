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
    <div className={`bg-srv-darkAlt p-6 rounded-lg border border-srv-comment/30 transition-all hover:border-srv-blue/30 ${className}`}>
      {children}
    </div>
  );
};

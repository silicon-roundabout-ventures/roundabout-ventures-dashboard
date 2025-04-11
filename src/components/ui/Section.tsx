import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  background?: 'transparent' | 'dark' | 'glass';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  title,
  className = '',
  background = 'transparent'
}) => {
  const bgClass = 
    background === 'dark' ? 'bg-black/70 backdrop-blur-sm' : 
    background === 'glass' ? 'bg-black/30 backdrop-blur-sm' : '';
  
  return (
    <div className={`py-20 ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-white mb-10 font-mono">
              &lt;{title}/&gt;
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

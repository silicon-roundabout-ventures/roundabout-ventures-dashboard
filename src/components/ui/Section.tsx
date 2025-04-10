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
    <div className={`section-container ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="inner-container">
          {title && (
            <h2 className="heading-2">
              &lt;{title}/&gt;
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

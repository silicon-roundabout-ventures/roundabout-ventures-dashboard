import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  className?: string;
}

/**
 * Responsive grid component with configurable columns
 */
export function Grid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 }, 
  gap = 6,
  className = '' 
}: GridProps) {
  const { sm = 1, md, lg } = columns;
  
  const gridClass = `grid grid-cols-${sm}` + 
    (md ? ` md:grid-cols-${md}` : '') + 
    (lg ? ` lg:grid-cols-${lg}` : '') + 
    ` gap-${gap}`;
  
  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
}

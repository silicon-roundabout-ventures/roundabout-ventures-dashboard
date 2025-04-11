import React from 'react';

interface IconCircleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Circular icon container with consistent styling
 * Used for displaying emoji icons with a circular border
 */
export function IconCircle({ children, className = '' }: IconCircleProps) {
  return (
    <div className={`w-full md:w-auto rounded-full h-32 w-32 bg-srv-dark border border-white/20 flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

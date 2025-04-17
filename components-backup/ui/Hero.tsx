import React from 'react';
import { Container, InnerContainer } from './Container';

interface HeroProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

/**
 * Hero section component with centered content
 * Typically used at the top of a page
 */
export function Hero({ children, className = '', fullHeight = false }: HeroProps) {
  return (
    <div className={`container mx-auto px-4 relative z-10 ${className}`}>
      <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[90vh]' : 'py-20'} text-center`}>
        {children}
      </div>
    </div>
  );
}

/**
 * Hero heading component with consistent styling
 */
export function HeroHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
      {children}
    </h1>
  );
}

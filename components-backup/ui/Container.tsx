import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

/**
 * Container component with consistent padding and max-width
 * Creates either a standard contained width or a full-width fluid container
 */
export function Container({ children, className = '', fluid = false }: ContainerProps) {
  return (
    <div className={`mx-auto px-4 ${fluid ? 'w-full' : 'container'} ${className}`}>
      {children}
    </div>
  );
}

interface InnerContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Inner container to provide consistent max-width across sections
 */
export function InnerContainer({ children, className = '' }: InnerContainerProps) {
  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

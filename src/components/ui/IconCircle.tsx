import React from 'react';

interface IconCircleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  isImage?: boolean;
}

/**
 * Circular icon container with consistent styling
 * Used for displaying emoji icons or images with a circular border
 */
export function IconCircle({ children, className = '', size = 'md', isImage = false }: IconCircleProps) {
  // Size in pixels - either predefined or custom
  const sizeClasses = {
    sm: 'h-24 w-24', // 96px
    md: 'h-32 w-32', // 128px
    lg: 'h-40 w-40', // 160px
    xl: 'h-48 w-48', // 192px
  };
  
  // Determine size class
  const sizeClass = typeof size === 'string' ? sizeClasses[size] : `h-[${size}px] w-[${size}px]`;
  
  // Add special handling for image content
  const contentClass = isImage ? 'p-0' : 'p-2';
  
  return (
    <div 
      className={`rounded-full ${sizeClass} bg-srv-dark border border-white/20 flex items-center justify-center overflow-hidden ${contentClass} ${className}`}
      style={typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : {}}
    >
      {/* If it's an image content, wrap in a sizing container */}
      {isImage ? (
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      ) : children}
    </div>
  );
}

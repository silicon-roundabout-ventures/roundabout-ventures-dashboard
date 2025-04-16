import React from 'react';

interface ScrollChevronProps {
  /** ID of the element to scroll to */
  targetId: string;
  /** Optional additional class names */
  className?: string;
}

/**
 * Component that displays three animated downward chevrons for scrolling indication
 */
const ScrollChevrons: React.FC<ScrollChevronProps> = ({ targetId, className = '' }) => {
  // Function to scroll to target element
  const handleClick = () => {
    document.querySelector(`#${targetId}`)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex flex-col items-center space-y-0 text-white/60 hover:text-white/90 transition-colors ${className}`}
      aria-label="Scroll down"
    >
      {/* Chevron 1 - Animated with a slight delay */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-12 h-6 animate-pulse opacity-30 -mb-1"
        style={{ animationDuration: '1.5s' }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={4}
          d="M22 9l-10 7-10-7" 
        />
      </svg>
      
      {/* Chevron 2 - Animated with medium delay */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-12 h-6 animate-pulse opacity-60 -mb-1"
        style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={4}
          d="M22 9l-10 7-10-7" 
        />
      </svg>
      
      {/* Chevron 3 - Animated with longest delay (appears to be most lit up) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-12 h-6 animate-pulse opacity-100 -mb-1"
        style={{ animationDuration: '1.5s', animationDelay: '0.4s' }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={4}
          d="M22 9l-10 7-10-7" 
        />
      </svg>
    </button>
  );
};

export default ScrollChevrons;

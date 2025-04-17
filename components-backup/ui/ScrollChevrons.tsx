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
    const targetElement = document.querySelector(`#${targetId}`);
    if (targetElement) {
      // Implement smooth scrolling with a fallback for browsers that don't support it
      if ('scrollBehavior' in document.documentElement.style) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex flex-col items-center space-y-0 text-white/60 hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-srv-teal/50 ${className}`}
      aria-label={`Scroll to ${targetId.replace(/-/g, ' ')}`}
      title={`Scroll to ${targetId.replace(/-/g, ' ')}`}
    >
      {/* Chevron 1 - Animated with a slight delay */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-10 h-5 sm:w-12 sm:h-6 animate-pulse opacity-30 -mb-1"
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
        className="w-10 h-5 sm:w-12 sm:h-6 animate-pulse opacity-60 -mb-1"
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
        className="w-10 h-5 sm:w-12 sm:h-6 animate-pulse opacity-100 -mb-1"
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

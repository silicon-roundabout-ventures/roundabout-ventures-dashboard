import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface StyledTypeAnimationProps {
  /** Optional className for outer container */
  className?: string;
  /** Speed in milliseconds per character */
  speed?: number;
  /** Delay before animation starts in milliseconds */
  startDelay?: number;
}

/**
 * A styled typing animation component specifically for the homepage tagline
 * Uses react-type-animation but adds custom styling for colored text elements
 */
const StyledTypeAnimation: React.FC<StyledTypeAnimationProps> = ({
  className = '',
  speed = 35,
  startDelay = 800,
}) => {
  // Track whether we're running in the browser
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Only run the animation on the client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // If not in browser, render static version (for SSR)
  if (!isBrowser) {
    return (
      <div className={className}>
        <span>Investing(</span>
        <span className="text-srv-yellow">First</span>)
        {" "}<span className="text-srv-pink">in</span>{" "}
        &#123;{" "}Frontier_Technology.<span className="text-srv-yellow">Founders</span>{" "}&#125;
        {" "}<span className="text-srv-pink">building</span> the future Computing & Physical{" "}
        <span className="text-srv-yellow">Infrastructure</span>
      </div>
    );
  }

  // Create a sequence that types each part with proper styling
  return (
    <div className={className}>
      <TypeAnimation
        sequence={[
          startDelay,
          'Investing(',
          300,
          'Investing(First',
          300,
          'Investing(First)',
          300,
          'Investing(First) ',
          100,
          'Investing(First) i',
          100,
          'Investing(First) in',
          300,
          'Investing(First) in ',
          100,
          'Investing(First) in {',
          300,
          'Investing(First) in { ',
          100,
          'Investing(First) in { F',
          100,
          'Investing(First) in { Fr',
          100,
          'Investing(First) in { Fro',
          100,
          'Investing(First) in { Frontier_Technology.F',
          300,
          'Investing(First) in { Frontier_Technology.Founders',
          300,
          'Investing(First) in { Frontier_Technology.Founders }',
          300,
          'Investing(First) in { Frontier_Technology.Founders } ',
          100,
          'Investing(First) in { Frontier_Technology.Founders } b',
          100,
          'Investing(First) in { Frontier_Technology.Founders } bu',
          100,
          'Investing(First) in { Frontier_Technology.Founders } bui',
          100,
          'Investing(First) in { Frontier_Technology.Founders } buil',
          100,
          'Investing(First) in { Frontier_Technology.Founders } build',
          100,
          'Investing(First) in { Frontier_Technology.Founders } buildi',
          100,
          'Investing(First) in { Frontier_Technology.Founders } buildin',
          100,
          'Investing(First) in { Frontier_Technology.Founders } building',
          300,
          'Investing(First) in { Frontier_Technology.Founders } building the future Computing & Physical Infrastructure',
          // Hold final text indefinitely
          () => {
            // Use a callback function to signal when typing is complete
            console.log('Typing animation completed');
          },
        ]}
        wrapper="span"
        cursor={true}
        repeat={0}
        speed={{ type: 'keyStrokeDelayInMs', value: speed }}
      />

      {/* Overlay the typed text with our styled version, synchronized with the animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0">
        <span>Investing(</span>
        <span className="text-srv-yellow">First</span>)
        {" "}<span className="text-srv-pink">in</span>{" "}
        &#123;{" "}Frontier_Technology.<span className="text-srv-yellow">Founders</span>{" "}&#125;
        {" "}<span className="text-srv-pink">building</span> the future Computing & Physical{" "}
        <span className="text-srv-yellow">Infrastructure</span>
      </div>

      {/* Apply styling to the typed text */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Styled version of the final typed text */
        /* These styles will be applied after animation completes */
        span:has(span:nth-child(n+30)) span:nth-child(2) {
          color: var(--srv-yellow);
        }
        span:has(span:nth-child(n+30)) span:nth-child(5) {
          color: var(--srv-pink);
        }
        span:has(span:nth-child(n+30)) span:nth-child(15) {
          color: var(--srv-yellow);
        }
        span:has(span:nth-child(n+30)) span:nth-child(24) {
          color: var(--srv-pink);
        }
        span:has(span:nth-child(n+30)) span:nth-child(31) {
          color: var(--srv-yellow);
        }
      `}} />
    </div>
  );
};

export default StyledTypeAnimation;

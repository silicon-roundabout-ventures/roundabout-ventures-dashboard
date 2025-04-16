import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  /** Optional className for container */
  className?: string;
  /** Typing speed in milliseconds per character */
  speed?: number;
  /** Delay before animation starts in milliseconds */
  startDelay?: number;
  /** The content to be displayed */
  children: React.ReactNode;
}

/**
 * A component that simulates typewriter effect character by character
 * Works by initially hiding the text and then revealing one character at a time
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({
  className = '',
  speed = 40,
  startDelay = 800,
  children,
}) => {
  // Track whether we're in a browser environment
  const [isMounted, setIsMounted] = useState(false);
  // Track the number of characters typed
  const [charCount, setCharCount] = useState(0);
  // Ref to the text container to measure its content
  const textRef = useRef<HTMLDivElement>(null);
  // Total length of text to type
  const [totalLength, setTotalLength] = useState(0);
  // Whether typing has completed
  const [isComplete, setIsComplete] = useState(false);

  // Set up the typing animation after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    // Getting the text content length isn't trivial for React elements
    // This is a somewhat hacky solution to get the text content length
    if (textRef.current) {
      const textContent = textRef.current.innerText || '';
      setTotalLength(textContent.length);
    }

    // Reset character count on mount
    setCharCount(0);
    setIsComplete(false);

    // Start typing after the specified delay
    const startTimer = setTimeout(() => {
      let currentChar = 0;
      
      // Set up interval to type characters one by one
      const typingInterval = setInterval(() => {
        if (currentChar < totalLength) {
          currentChar++;
          setCharCount(currentChar);
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, speed);
      
      // Clean up interval on unmount
      return () => clearInterval(typingInterval);
    }, startDelay);
    
    // Clean up timeout on unmount
    return () => clearTimeout(startTimer);
  }, [speed, startDelay, totalLength]);

  if (!isMounted) {
    // During SSR or before mounting, show the full text
    return (
      <div className={className} ref={textRef}>
        {children}
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {/* Hidden text used to calculate total length */}
      <div 
        className="absolute opacity-0 pointer-events-none" 
        aria-hidden="true"
        ref={textRef}
      >
        {children}
      </div>
      
      {/* Visible text with typing effect */}
      <div className="relative">
        <span className="relative">
          {/* The actual content */}
          <span 
            className={`text-clip overflow-hidden inline-block`}
            style={{
              maxWidth: '100%',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              maskImage: `linear-gradient(to right, black ${charCount * 100 / Math.max(totalLength, 1)}%, transparent ${charCount * 100 / Math.max(totalLength, 1)}%)`,
              WebkitMaskImage: `linear-gradient(to right, black ${charCount * 100 / Math.max(totalLength, 1)}%, transparent ${charCount * 100 / Math.max(totalLength, 1)}%)`,
            }}
          >
            {children}
          </span>
          
          {/* Blinking cursor */}
          {!isComplete && (
            <span 
              className="inline-block h-[1.2em] w-[2px] bg-white/70 ml-[1px] animate-[blink_0.7s_infinite]"
              style={{ verticalAlign: 'text-bottom' }}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default TypewriterText;

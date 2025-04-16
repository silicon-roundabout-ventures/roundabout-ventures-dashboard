import React, { useEffect, useState, useRef } from 'react';

interface TypedTextProps {
  /** Text to be typed out (plain text version) */
  text: string;
  /** HTML content to be typed out (styled version) */
  htmlContent?: React.ReactNode;
  /** Speed of typing in milliseconds per character */
  speed?: number;
  /** Optional className for styling */
  className?: string;
  /** Whether to include the blinking cursor at the end */
  showCursor?: boolean;
  /** Start delay in milliseconds */
  startDelay?: number;
  /** Whether to run the animation again after completion */
  loop?: boolean;
  /** Delay between loops in milliseconds */
  loopDelay?: number;
}

/**
 * Component that animates text as if it's being typed
 * with a fallback to showing the full text if animations are disabled
 */
const TypedText: React.FC<TypedTextProps> = ({
  text,
  htmlContent,
  speed = 50,
  className = '',
  showCursor = true,
  startDelay = 0,
  loop = false,
  loopDelay = 2000,
}) => {
  // State to keep track of the current display length
  const [currentLength, setCurrentLength] = useState(0);
  // State to track whether animation is complete
  const [isComplete, setIsComplete] = useState(false);
  // State to keep track of whether typing has started
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  // State to keep track of whether typing animation is supported
  const [isAnimationSupported, setIsAnimationSupported] = useState(true);
  // Ref to track the animation frame
  const animationFrame = useRef<number | null>(null);
  // Ref to track if component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // Check if animation is supported (client-side rendering and requestAnimationFrame)
    const checkAnimationSupport = () => {
      try {
        return typeof window !== 'undefined' && 
               window.requestAnimationFrame !== undefined;
      } catch (e) {
        return false;
      }
    };

    setIsAnimationSupported(checkAnimationSupport());
    
    // Return full content if animation is not supported or not in a browser environment
    if (!isAnimationSupported) {
      setCurrentLength(text.length);
      setIsComplete(true);
      return;
    }

    // Initialize animation state
    if (!hasStartedTyping) {
      setCurrentLength(0);
      setHasStartedTyping(true);
    }

    let timeoutId: NodeJS.Timeout;

    // Function to animate the typing
    const animateTyping = () => {
      if (!isMounted.current) return;
      
      if (currentLength < text.length) {
        setCurrentLength(prevLength => prevLength + 1);
        timeoutId = setTimeout(animateTyping, speed);
      } else {
        setIsComplete(true);
        if (loop) {
          // If looping is enabled, reset after delay
          timeoutId = setTimeout(() => {
            setCurrentLength(0);
            setIsComplete(false);
            animateTyping();
          }, loopDelay);
        }
      }
    };

    // Start animation after delay
    timeoutId = setTimeout(animateTyping, startDelay);

    // Cleanup function
    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [text, speed, startDelay, loop, loopDelay, hasStartedTyping, isAnimationSupported]);

  // If animation is not supported or hasn't been triggered, show full content
  if (!isAnimationSupported) {
    return <span className={className}>{htmlContent || text}</span>;
  }

  // For the typed animation effect, we'll render the content with a clipping mask for animation
  const renderContent = () => {
    // Simple case: just plain text
    if (!htmlContent) {
      return text.substring(0, currentLength);
    }
    
    // Complex case: styled HTML content with typing animation
    return (
      <div className="relative">
        {/* Full content that will be revealed gradually */}
        <div 
          className="relative" 
          style={{
            clipPath: `inset(0 ${100 - (currentLength / text.length) * 100}% 0 0)`,
            transition: 'clip-path 10ms linear',
            display: 'inline-block'
          }}
        >
          {htmlContent}
        </div>
        
        {/* Invisible placeholder for layout */}
        <div className="opacity-0 absolute top-0 left-0 pointer-events-none">
          {htmlContent}
        </div>
      </div>
    );
  };

  return (
    <span className={className}>
      {renderContent()}
      {showCursor && !isComplete && (
        <span className="inline-block w-2 h-4 bg-white/70 ml-0.5 animate-[cursor-blink_1s_step-end_infinite]"></span>
      )}
    </span>
  );
};

export default TypedText;

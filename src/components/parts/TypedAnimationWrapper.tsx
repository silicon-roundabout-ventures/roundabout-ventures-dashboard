import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

// Extend the Typed type to include properties we know exist but TypeScript doesn't recognize
interface TypedWithEl extends Typed {
  el: HTMLElement;
}

interface TypedAnimationWrapperProps {
  strings: string[];
  typeSpeed?: number;
  startDelay?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  loopCount?: number;
  showCursor?: boolean;
  cursorChar?: string;
  smartBackspace?: boolean;
  className?: string;
}

/**
 * A wrapper component for Typed.js that provides a natural typing animation
 * with proper line wrapping behavior
 */
const TypedAnimationWrapper: React.FC<TypedAnimationWrapperProps> = ({
  strings,
  typeSpeed = 40,
  startDelay = 800,
  backSpeed = 50,
  backDelay = 1000,
  loop = false,
  loopCount = Infinity,
  showCursor = true,
  cursorChar = '|',
  smartBackspace = true,
  className = '',
}) => {
  // Create a reference to the element where the typing will occur
  const typedElement = useRef<HTMLSpanElement>(null);
  // Reference to the Typed instance for cleanup
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!typedElement.current) return;

    // Initialize Typed.js
    typed.current = new Typed(typedElement.current, {
      strings,
      typeSpeed,
      startDelay,
      backSpeed,
      backDelay,
      loop,
      loopCount,
      showCursor,
      cursorChar,
      smartBackspace,
      // Make sure to use CSS that allows line breaks only when needed
      onBegin: (self) => {
        // Cast to our extended type that includes el property
        const typedWithEl = self as TypedWithEl;
        if (typedWithEl.el) {
          // Set the parent container to use proper text wrapping
          const parent = typedWithEl.el.parentElement;
          if (parent) {
            parent.style.display = 'block';
            parent.style.whiteSpace = 'normal';
            parent.style.wordBreak = 'break-word';
            parent.style.overflowWrap = 'break-word';
            // Style the cursor inline with text
            const cursorEl = typedWithEl.el.nextSibling as HTMLElement;
            if (cursorEl && cursorEl.classList.contains('typed-cursor')) {
              cursorEl.style.display = 'inline-block';
              // align cursor at text bottom for inline effect
              cursorEl.style.verticalAlign = 'text-bottom';
            }
          }
        }
      },
      // For better SEO and accessibility, the typed text should be selectable
      onComplete: (self) => {
        // Cast to our extended type that includes el property
        const typedWithEl = self as TypedWithEl;
        if (typedWithEl.el) {
          typedWithEl.el.style.display = 'inline';
          typedWithEl.el.style.whiteSpace = 'normal';
        }
      }
    });

    // Cleanup function to destroy Typed instance on unmount
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, startDelay, backSpeed, backDelay, loop, loopCount, showCursor, cursorChar, smartBackspace]);

  return (
    <span 
      className={`typed-animation-wrapper ${className} text-center inline-block`} 
      style={{ 
        whiteSpace: 'normal', 
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <span 
        ref={typedElement} 
        className="typed-text"
      ></span>
    </span>
  );
};

export default TypedAnimationWrapper;

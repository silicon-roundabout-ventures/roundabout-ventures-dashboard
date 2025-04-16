import React from 'react';

interface CssTypedTextProps {
  /** Optional className for container */
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  startDelay?: number;
  /** The content to be animated (React nodes) */
  children: React.ReactNode;
  /** Whether to allow text to wrap to multiple lines */
  multiLine?: boolean;
  /** Maximum width for the text container (only used when multiLine is true) */
  maxWidth?: string;
}

/**
 * A CSS-only based typing animation that works reliably in SSR environments like Gatsby
 */
const CssTypedText: React.FC<CssTypedTextProps> = ({
  className = '',
  duration = 3.5,
  startDelay = 0.8,
  children,
  multiLine = false,
  maxWidth = '100%',
}) => {
  return (
    <div className={`${className} overflow-hidden`}>
      {/* Static content that will be visible if CSS fails or before animation */}
      <div className="static-content" style={{ maxWidth }}>
        {children}
      </div>
      
      {/* CSS-animated typing effect */}
      <div 
        className="typing-animation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          whiteSpace: 'normal',
          width: '100%',
          maxWidth,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      
      {/* CSS for the typing animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide static content once animation is loaded */
        .static-content {
          opacity: 0;
        }

        /* Typing animation */
        .typing-animation {
          position: relative;
          animation: typing ${duration}s steps(50, end) ${startDelay}s forwards,
                     blink-caret 0.75s step-end infinite;
          border-right: 3px solid rgba(255, 255, 255, 0.75);
          white-space: normal;
          overflow: hidden;
          width: 0;
        }

        /* Typing animation */
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        /* Cursor blink effect */
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: rgba(255, 255, 255, 0.75) }
        }

        /* Hide cursor after animation completes */
        .typing-animation.completed {
          border-right-color: transparent;
        }

        /* Script to hide cursor after animation completes */
        @media (prefers-reduced-motion: no-preference) {
          .typing-animation {
            animation: typing ${duration}s steps(50, end) ${startDelay}s forwards,
                       blink-caret 0.75s step-end infinite ${duration + startDelay}s;
          }
          
          .typing-animation::after {
            content: '';
            animation: removeCursor 0.1s forwards ${duration + startDelay}s;
          }
          
          @keyframes removeCursor {
            to {
              border-right-color: transparent;
            }
          }
        }
      `}} />
    </div>
  );
};

export default CssTypedText;

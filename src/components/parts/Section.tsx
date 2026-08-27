import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  eyebrow?: string;
  className?: string;
  background?: 'transparent' | 'dark' | 'glass';
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  eyebrow,
  className = '',
  background = 'transparent'
}) => {
  const bgClass =
    background === 'dark' ? 'bg-srv-panel backdrop-blur-sm' :
    background === 'glass' ? 'bg-srv-darkAlt/80 backdrop-blur-sm' : '';

  return (
    <div className={`py-20 ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {title && (
            <div className="mb-10">
              {eyebrow && (
                <div className="mb-2">
                  <span className="text-srv-comment font-mono text-sm tracking-widest uppercase">
                    // {eyebrow}
                  </span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mb-2">
                &lt;{title}/&gt;
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-srv-teal to-transparent" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

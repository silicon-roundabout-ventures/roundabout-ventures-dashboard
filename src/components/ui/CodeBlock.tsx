import React from 'react';

interface CodeLineProps {
  children: React.ReactNode;
  indent?: 0 | 1 | 2 | 3;
  className?: string;
}

export const CodeLine: React.FC<CodeLineProps> = ({ 
  children, 
  indent = 0, 
  className = '' 
}) => {
  const indentClass = indent === 0 ? '' : `code-indent-${indent}`;
  
  return (
    <span className={`code-line ${indentClass} ${className}`}>
      {children}
    </span>
  );
};

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`code-block ${className}`}>
      {children}
    </div>
  );
};

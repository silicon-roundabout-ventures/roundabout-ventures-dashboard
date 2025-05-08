import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children, className = '', ...props }) => (
  <span
    className={
      `text-xs px-2 py-0.5 rounded-full ${className}`
    }
    {...props}
  >
    {children}
  </span>
);

export default Tag;

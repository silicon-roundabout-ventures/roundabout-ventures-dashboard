/**
 * Link Component
 * 
 * A wrapper around Gatsby's Link component that automatically handles
 * internal and external links - uses Gatsby Link for internal navigation
 * and regular <a> tags for external links
 */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { cn } from '../../lib/utils';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target URL */
  href: string;
  /** Whether to use the Gatsby Link component for internal links */
  useGatsbyLink?: boolean;
  /** Whether the link should open in a new tab */
  openInNewTab?: boolean;
  /** Optional icon to display after the link text */
  icon?: React.ReactNode;
  /** Optional variant for styling */
  variant?: 'default' | 'button' | 'muted' | 'nav';
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  useGatsbyLink = true,
  openInNewTab,
  className,
  icon,
  variant = 'default',
  ...props
}) => {
  // Determine if the link is internal or external
  const isInternalLink = href && href.startsWith('/');
  
  // Open in new tab settings
  const newTabProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
    
  // Common classes based on variant
  const baseClasses = cn(
    {
      'inline-flex items-center gap-1 transition-colors': true,
      'text-primary hover:text-primary/80 font-medium': variant === 'default',
      'px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90': variant === 'button',
      'text-muted-foreground hover:text-foreground': variant === 'muted',
      'text-foreground hover:text-primary': variant === 'nav',
    },
    className
  );
  
  // Render internal links with Gatsby Link for better performance
  if (isInternalLink && useGatsbyLink) {
    return (
      <GatsbyLink to={href} className={baseClasses} {...newTabProps} {...props}>
        {children}
        {icon && <span>{icon}</span>}
      </GatsbyLink>
    );
  }
  
  // Render external links with regular <a> tags
  return (
    <a href={href} className={baseClasses} {...newTabProps} {...props}>
      {children}
      {icon && <span>{icon}</span>}
    </a>
  );
};

export default Link;

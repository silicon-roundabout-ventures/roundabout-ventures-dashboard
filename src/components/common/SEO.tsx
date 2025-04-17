/**
 * SEO Component
 * 
 * A reusable component for managing SEO metadata across pages
 * Leverages Gatsby Head API for optimal integration
 */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/**
 * Hook to access site metadata from Gatsby config
 */
function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          twitterUsername
          author
        }
      }
    }
  `);

  return data.site.siteMetadata;
}

interface SEOProps {
  /** Page title (will be appended to site name) */
  title?: string;
  /** Page description */
  description?: string;
  /** Page path (relative to domain, e.g., /about) */
  pathname?: string;
  /** Image to use for social sharing (path relative to domain) */
  image?: string;
  /** Should robots index this page */
  noIndex?: boolean;
  /** Additional structured data (JSON-LD) */
  structuredData?: Record<string, any>[];
  /** Children to include in head */
  children?: React.ReactNode;
}

/**
 * SEO component to be used with Gatsby Head API
 * 
 * @example
 * // In a page component:
 * export const Head = () => <SEO title="About Us" description="Learn about our team" />
 */
export function SEO({
  title,
  description,
  pathname,
  image,
  noIndex = false,
  structuredData = [],
  children,
}: SEOProps) {
  // Get site metadata from the custom hook
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    twitterUsername,
  } = useSiteMetadata();

  // Use defaults for any props not specified
  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: pathname ? `${siteUrl}${pathname}` : siteUrl,
    image: `${siteUrl}${image || defaultImage}`,
  };

  // Create JSON-LD structured data
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: defaultTitle,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        // Add social media profiles here
        `https://twitter.com/${twitterUsername || 'roundaboutvc'}`,
        'https://www.linkedin.com/company/roundabout-ventures',
      ],
    },
    ...structuredData,
  ];

  return (
    <>
      {/* Basic metadata */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {pathname && <link rel="canonical" href={seo.url} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      
      {/* JSON-LD structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      
      {/* Additional head elements */}
      {children}
    </>
  );
}

export default SEO;

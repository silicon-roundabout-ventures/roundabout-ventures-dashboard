/**
 * useSiteMetadata Hook
 * 
 * A custom hook that provides access to the site metadata
 * defined in gatsby-config.js's siteMetadata field
 */
import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  image: string;
  twitterUsername?: string;
  author: string;
}

/**
 * Hook to access site metadata from Gatsby config
 * @returns Site metadata object
 */
export function useSiteMetadata(): SiteMetadata {
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

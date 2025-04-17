/**
 * Portfolio Page
 * 
 * Displays all portfolio companies with filtering and statistics
 * Using the refactored component structure and data hooks
 */
import React from 'react';
import { HeadFC, graphql } from 'gatsby';
import Layout from '../components/core/Layout';
import PortfolioSection from '../components/sections/PortfolioSection';
import ParticleBackground from '../components/ui/ParticleBackground';
import { Toaster } from 'sonner';
import SEO from '../components/core/SEO';

interface PortfolioPageProps {
  location: any;
  data?: any; // Will be populated by GraphQL query
}

/**
 * Portfolio page component
 */
const PortfolioPage: React.FC<PortfolioPageProps> = ({ location }) => {
  return (
    <Layout location={location} title="Portfolio | Roundabout Ventures">
      {/* Particle background effect */}
      <div className="fixed inset-0 -z-10">
        <ParticleBackground />
      </div>
      
      {/* Portfolio section with data from our hook-based approach */}
      <div className="container mx-auto px-4 py-12">
        <PortfolioSection />
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-right" closeButton />
    </Layout>
  );
};

export default PortfolioPage;

/**
 * Head component for SEO metadata using our reusable SEO component
 */
export const Head: HeadFC = () => {
  return (
    <SEO 
      title="Portfolio"
      description="Explore our portfolio of innovative startups in deep tech, AI, and data."
      pathname="/portfolio"
      structuredData={[
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Investment Portfolio',
          description: 'Roundabout Ventures portfolio of innovative startups in deep tech, AI, and data.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              // Dynamic data would be added here in a production environment
              // This would typically be done with server-side rendering or at build time
            ]
          }
        }
      ]}
    />
  );
};

// Define GraphQL query to provide data at build time
export const query = graphql`
  query PortfolioPageQuery {
    # This query is now handled by the AirtableProvider
    # But we keep the structure to ensure page generation works properly
    allAirtable(filter: {table: {eq: "Startups"}}) {
      nodes {
        id
        recordId
        data {
          Name
          Deal_Name
          Notes
          One_Line_Summary
          Sector
          Stage
          Announced
          Close_Date
          Company
          Fund
          Total_Invested
          Entry_Valuation
          Logo {
            localFiles {
              publicURL
              childImageSharp {
                gatsbyImageData(width: 200, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
    # Query fallback mock data when Airtable is not available
    allMockPortfolioData {
      nodes {
        id
        recordId
        table
        data {
          Name
          Deal_Name
          Notes
          One_Line_Summary
          Sector
          Stage
          Announced
          Close_Date
          Company
          Fund
          Total_Invested
          Entry_Valuation
        }
      }
    }
  }
`;

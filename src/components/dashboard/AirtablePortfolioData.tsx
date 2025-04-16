import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PortfolioCompany } from "../../services/AirtableService"

interface AirtablePortfolioDataProps {
  onDataLoaded: (companies: PortfolioCompany[]) => void;
}

const AirtablePortfolioData: React.FC<AirtablePortfolioDataProps> = ({ onDataLoaded }) => {
  const data = useStaticQuery(graphql`
    query {
      allAirtable(filter: {table: {eq: "Startups"}}) {
        nodes {
          id
          data {
            name
            description
            sector
            website
            stage
            announced
            close_date
            logo {
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
    }
  `)

  React.useEffect(() => {
    if (data?.allAirtable?.nodes) {
      // Transform Airtable data to portfolio company format
      const companies: PortfolioCompany[] = data.allAirtable.nodes.map((node: any) => {
        const logoFile = node.data.logo?.localFiles?.[0];
        const logoUrl = logoFile ? (logoFile.publicURL || logoFile.childImageSharp?.gatsbyImageData) : null;
        
        const companyName = node.data.name || 'Unnamed Company';
        return {
          id: node.id,
          name: companyName,
          description: node.data.description || '',
          logo: logoUrl || `https://placehold.co/200x200?text=${companyName.charAt(0) || 'C'}`,
          website: node.data.website || '',
          industry: Array.isArray(node.data.sector) ? node.data.sector : node.data.sector ? [node.data.sector] : [],
          stage: node.data.stage || 'Seed',
          investmentDate: node.data.close_date || '',
          announced: node.data.announced === 'Yes' || node.data.announced === true
        };
      });
      
      // Pass data to parent component
      onDataLoaded(companies);
    }
  }, [data, onDataLoaded]);

  return null; // This component doesn't render anything
}

export default AirtablePortfolioData;

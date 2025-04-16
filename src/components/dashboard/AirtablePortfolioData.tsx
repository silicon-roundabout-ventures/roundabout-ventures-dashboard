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
    }
  `)

  React.useEffect(() => {
    if (data?.allAirtable?.nodes) {
      // Transform Airtable data to portfolio company format
      const companies: PortfolioCompany[] = data.allAirtable.nodes.map((node: any) => {
        // Get company name - prioritize Deal_Name, fallback to constructing from other fields
        const companyName = node.data.Deal_Name || 
                           (node.data.Company ? String(node.data.Company).split('.')[0] : null) || 
                           'Unnamed Company';
        
        // Get logo if available
        const logoFile = node.data.Logo?.localFiles?.[0];
        const logoUrl = logoFile ? (logoFile.publicURL || logoFile.childImageSharp?.gatsbyImageData) : null;
        
        // Format website from Company field (domain) - handle array or string
        let website = '';
        if (node.data.Company) {
          // Company could be an array in Airtable
          const companyValue = Array.isArray(node.data.Company) ? 
                              (node.data.Company.length > 0 ? node.data.Company[0] : '') : 
                              node.data.Company;
          
          // If Company is a domain like example.com, format it as a proper URL
          if (companyValue) {
            const domain = String(companyValue).trim();
            if (domain && !domain.startsWith('http')) {
              website = `https://${domain}`;
            } else {
              website = domain;
            }
          }
        }
        
        // Determine if company is announced
        const isAnnounced = node.data.Announced === 'Yes';
        
        // Get sectors as an array
        const sectors = Array.isArray(node.data.Sector) ? node.data.Sector : 
                       node.data.Sector ? [node.data.Sector] : [];
        
        // Generate description text from Notes or One_Line_Summary
        let description = '';
        if (isAnnounced) {
          description = node.data.Notes || node.data.One_Line_Summary || 
                      (sectors.length > 0 ? `${sectors.join(', ')} company` : 'Technology company');
        } else {
          // For stealth companies, mask the description
          description = 'Information about this company is not yet public.';
        }
        
        // Get investment date
        const investmentDate = node.data.Close_Date || '';
        
        // Format company name for stealth companies
        const displayName = isAnnounced ? 
                           companyName : 
                           `Stealth ${sectors[0] || 'Technology'} Company`;
        
        // Create first letter for placeholder logo
        const firstLetter = displayName.charAt(0);
        
        return {
          id: node.id,
          name: displayName,
          description: description,
          logo: logoUrl || `https://placehold.co/200x200?text=${firstLetter}`,
          website: website,
          industry: sectors,
          stage: node.data.Stage || 'Seed',
          investmentDate: investmentDate,
          announced: isAnnounced,
          oneLiner: node.data.One_Line_Summary || '',
          fund: node.data.Fund || undefined,
          totalInvested: node.data.Total_Invested ? Number(node.data.Total_Invested) : undefined,
          entryValuation: node.data.Entry_Valuation || undefined
        };
      });
      
      // Pass data to parent component
      onDataLoaded(companies);
    }
  }, [data, onDataLoaded]);

  return null; // This component doesn't render anything
}

export default AirtablePortfolioData;

import React, { useEffect } from "react";
import { usePortfolioCompanies } from "../../services/AirtableService";
import { PortfolioCompany } from "../../config/airtableConfig";

interface AirtablePortfolioDataProps {
  onDataLoaded?: (companies: PortfolioCompany[]) => void;
}

/**
 * Component that fetches portfolio company data at build time
 * and passes it to the parent component via callback.
 * All Airtable schema, field mapping, and transformations are now centralized
 * in airtableConfig.ts and AirtableService.tsx
 */
const AirtablePortfolioData: React.FC<AirtablePortfolioDataProps> = ({ onDataLoaded }) => {
  // Fetch normalized portfolio companies using the centralized hook
  const portfolioCompanies = usePortfolioCompanies();
  
  useEffect(() => {
    if (portfolioCompanies.length > 0 && onDataLoaded) {
      // Pass the already normalized data to the parent component
      onDataLoaded(portfolioCompanies);
    }
  }, [portfolioCompanies, onDataLoaded]);

  // This component doesn't render anything
  return null;
}

export default AirtablePortfolioData;

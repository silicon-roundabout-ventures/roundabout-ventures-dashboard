import React, { useEffect } from "react"
import { usePortfolioCompanies } from "../../services/airtable/AirtableProvider"
import { PortfolioCompany } from "../../services/airtable/airtable"

/**
 * Props for the AirtablePortfolioData component
 */
interface AirtablePortfolioDataProps {
  onDataLoaded?: (companies: PortfolioCompany[]) => void;
}

/**
 * A wrapper component that provides Airtable portfolio data to parent components
 * No longer needs to fetch data directly - uses the centralized provider
 */
const AirtablePortfolioData: React.FC<AirtablePortfolioDataProps> = ({ onDataLoaded }) => {
  // Get data from our centralized context
  const portfolioCompanies = usePortfolioCompanies();

  useEffect(() => {
    // If we have companies and a callback, provide the data to the parent
    if (portfolioCompanies.length > 0 && onDataLoaded) {
      onDataLoaded(portfolioCompanies);
    }
  }, [portfolioCompanies, onDataLoaded]);

  return null; // This component doesn't render anything
}

export default AirtablePortfolioData;

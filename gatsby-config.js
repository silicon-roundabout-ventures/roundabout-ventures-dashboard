// Load environment variables based on the environment
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Add at the top of the file
console.log("Gatsby Build Environment:");
console.log("AIRTABLE_API_KEY exists:", !!process.env.AIRTABLE_API_KEY);
console.log("AIRTABLE_BASE_ID exists:", !!process.env.AIRTABLE_BASE_ID);

module.exports = {
  siteMetadata: {
    title: `Roundabout Ventures`,
    description: `Community-Driven VC firm backing Deep Tech and Big Data startups`,
    author: `@roundaboutvc`,
    siteUrl: `https://roundabout.ventures`,
  },
  plugins: [
    // Gatsby v5 has built-in Head API, so react-helmet is redundant
    // See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
    
    // Core image processing plugins
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
    // Source filesystem for images and other static assets
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    
    // Styling plugins
    `gatsby-plugin-postcss`,
    
    // TypeScript support
    `gatsby-plugin-typescript`,
    
    // Airtable source plugin - fetches data at build time, keeping API keys secure
    // Include the Airtable plugin with graceful fallback for production builds
    {
      resolve: `gatsby-source-airtable`,
      options: {
        // Use empty string as fallback to avoid build errors while still skipping actual API calls
        apiKey: process.env.AIRTABLE_API_KEY || 'fallback_key_for_builds',
        // Skip real API calls if credentials aren't available
        skipAPICallsIfEmpty: !process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID,
        allowedJSONTypes: ['string', 'number', 'boolean', 'null', 'array', 'object'],
        tables: [
            {
              baseId: process.env.AIRTABLE_BASE_ID || 'fallback_base_id_for_builds',
              tableName: `Startups`,
              tableView: `Portfolio`, // Use the specific Portfolio view
              // Process and sanitize data during build to protect stealth companies
              transform: (record) => {
                // For debugging, log some fields but not the entire record (which can be huge)
                const companyName = record.fields['Name'] || record.fields['name'] || 'Unknown';
                const sectorValue = record.fields['Sector'] || record.fields['sector'] || 'Tech';
                console.log(`Processing company: ${companyName}, Sector: ${sectorValue}`);
                
                // CRITICAL: For Airtable, most fields will use original capitalization
                // Try to get the announced value - use the exact field name from Airtable
                const announced = record.fields['Announced'];
                console.log(`Company ${companyName} announced value:`, announced);
                
                // Explicitly check for stealth companies
                // Consider a company announced by default (for safety in development)
                const isAnnounced = announced !== 'No' && announced !== false;
                
                console.log(`Company ${record.fields['Name'] || record.fields['name'] || 'Unknown'} is announced: ${isAnnounced}`);
                
                // If company is not announced (stealth), mask its data
                if (!isAnnounced) {
                  const sector = record.fields['Sector'] || record.fields['sector'] || 'Tech';
                  return {
                    ...record,
                    fields: {
                      ...record.fields,
                      // Use lowercase field names for consistency with our schema
                      "name": `Stealth ${sector} Company`,
                      "description": "Information about this company is currently not available.",
                      "website": "",
                      "logo": null,
                      "sector": record.get('Sector'), // Keep sector for filtering
                      "stage": record.get('Stage') || "Seed", // Keep stage for statistics
                      "announced": false,
                      // Keep these fields for internal use
                      "close_date": record.get('Close_Date'),
                      "fund": record.get('Fund')
                    }
                  };
                }
                
                // For announced companies, return all data
                return record;
              }
            }
          ]
        }
      },
    
    // Uncomment when we have proper icons
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `roundabout-ventures`,
    //     short_name: `roundabout`,
    //     start_url: `/`,
    //     background_color: `#191c22`,
    //     theme_color: `#88c0d0`,
    //     display: `minimal-ui`,
    //     icon: `src/images/favicon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
} 
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
    // Only include the Airtable plugin if API key and Base ID are available
    ...(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID ? [
      {
        resolve: `gatsby-source-airtable`,
        options: {
          apiKey: process.env.AIRTABLE_API_KEY,
          tables: [
            {
              baseId: process.env.AIRTABLE_BASE_ID,
              tableName: `Startups`,
              tableView: `Portfolio`, // Use the specific Portfolio view
              // Process and sanitize data during build to protect stealth companies
              transform: (record) => {
                // Debug: Log the full record fields
                console.log('Record fields:', JSON.stringify(record.fields));
                
                // Try to get the announced value from multiple possible field names
                let announced = null;
                if ('Announced' in record.fields) announced = record.fields['Announced'];
                else if ('announced' in record.fields) announced = record.fields['announced'];
                else if ('isAnnounced' in record.fields) announced = record.fields['isAnnounced'];
                else if ('IsAnnounced' in record.fields) announced = record.fields['IsAnnounced'];
                
                // More thorough check
                console.log(`Company ${record.fields['Name'] || record.fields['name'] || 'Unknown'} announced value:`, announced);
                
                // Default to treating companies as announced unless explicitly marked as not announced
                // This is safer for initial development until we're sure of the data format
                const isAnnounced = !(announced === false || announced === 'No' || announced === 'no' || announced === 'false');
                
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
      }
    ] : []),
    
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
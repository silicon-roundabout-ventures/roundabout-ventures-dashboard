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
  // Gatsby configuration for optimal SSR and hydration
  flags: {
    DEV_SSR: false, // Disable SSR in development to prevent hydration mismatches
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    DETECT_NODE_MUTATIONS: true, // Help identify DOM mutations that may cause hydration issues
    PARALLEL_SOURCING: true, // Improve build performance
  },
  jsxRuntime: "automatic",
  plugins: [
    // Netlify adapter for Gatsby - must be first in the plugins array
    {
      resolve: "gatsby-adapter-netlify",
      options: {
        excludeDatastoreFromBundle: true,
        imageCDN: true
      }
    },
    
    // Gatsby v5 has built-in Head API, so react-helmet is redundant
    // See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
    
    // Core image processing plugins
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    // Configure gatsby-plugin-sharp with error handling for Netlify
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        failOnError: false, // Prevents build failures on image processing errors
        defaultQuality: 80, // Good balance between quality and size
        stripMetadata: true, // Reduces image size
      }
    },
    
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
    
    // Airtable source plugin - optimized for Netlify compatibility
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY || '',
        concurrency: 3, // Reduced from 5 to prevent rate limiting
        requestTimeout: 30000, // 30 seconds timeout for Netlify builds
        // Configure error handling for Netlify builds
        errorHandling: 'skip',
        separateNodeType: true, // Avoid node type conflicts
        queryName: 'AIRTABLE',
        tables: [
          // Only process if environment variables are available
          ...(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID ? [
            {
              baseId: process.env.AIRTABLE_BASE_ID,
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
          ] : [])
        ]
      }
    },
    
    // Create nodes with mock data when Airtable is not available
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/*': [
            'Cache-Control: public, max-age=0, must-revalidate'
          ]
        }
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
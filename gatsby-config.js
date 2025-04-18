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
    
    // Airtable source plugin with simplified configuration for Netlify compatibility
    {
      resolve: `gatsby-source-airtable`,
      options: {
        // Make sure to trim any whitespace from the API key
        apiKey: process.env.AIRTABLE_API_KEY ? process.env.AIRTABLE_API_KEY.trim() : '',
        concurrency: 1, // Set to 1 to avoid rate limiting on Netlify
        requestTimeout: 60000, // 60 seconds timeout for Netlify builds
        // Configure error handling for Netlify builds
        errorHandling: 'skip',
        separateNodeType: true, // Avoid node type conflicts
        queryName: 'AIRTABLE',
        tables: [
          // Only process if environment variables are available and non-empty
          ...(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_API_KEY.trim() !== '' && 
             process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_BASE_ID.trim() !== '' ? [
            {
              baseId: process.env.AIRTABLE_BASE_ID.trim(),
              tableName: `Startups`,
              tableView: `Portfolio` // Use the specific Portfolio view
            }
          ] : [])
        ]
      }
    },
    
    // Cache control headers for better performance
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'Cache-Control: public, max-age=0, must-revalidate'
          ]
        },
        mergeSecurityHeaders: true,
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
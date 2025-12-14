// Load environment variables based on the environment
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require("path");

// Add at the top of the file
console.log("Gatsby Build Environment:");
console.log("AIRTABLE_API_KEY exists:", !!process.env.AIRTABLE_API_KEY);
console.log("AIRTABLE_BASE_ID exists:", !!process.env.AIRTABLE_BASE_ID);

module.exports = {
  siteMetadata: {
    title: `Silicon Roundabout Ventures`,
    description: `Community-Driven VC firm backing European Deep Tech startups with first cheques and high-conviction`,
    author: `@siliconroundaboutvc`,
    siteUrl: `https://siliconroundabout.ventures`,
    socialImage: `/images/previews/og-index.png`,
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

    // Alias imports plugin
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },

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
        separateNodeType: false, // Use unified Airtable type for GraphQL queries
        queryName: 'Airtable',
        tables: [
          // Only process if environment variables are available and non-empty
          ...(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_API_KEY.trim() !== '' &&
            process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_BASE_ID.trim() !== '' ? [
            {
              baseId: process.env.AIRTABLE_BASE_ID.trim(),
              tableName: `Startups`,
              tableView: `Portfolio_websiteFeed`, // Use the specific Portfolio_websiteFeed view for the records to show (all fields, inc hidden ones, remain available in the GraphQL schema)
              mapping: { Logo: 'fileNode', Photo: 'fileNode' }
            },
            {
              baseId: process.env.AIRTABLE_BASE_ID.trim(),
              tableName: `SRV Funds`,
              // No specific view needed, default grid view is fine
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
        mergeSecurityHeaders: false,
      }
    },

    // Uncomment when we have proper icons
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Silicon Roundabout Ventures`,
        short_name: `siliconroundabout`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/siliconroundabout/srv_logo_dash.png`, // This path is relative to the root of the site.
      },
    },
  ],
} 
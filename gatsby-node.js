const path = require("path")
const crypto = require("crypto")

/* 
* Airtable node setup
*/
const { getMockPortfolioCompanies } = require("./src/mocks/mockPortfolioData.js");
const mockPortfolioData = getMockPortfolioCompanies();

// No custom schema - use gatsby-source-airtable's built-in schema inference

// Create fallback data if Airtable plugin is not loaded
exports.sourceNodes = ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  
  reporter.info('Checking if fallback mock data is needed');
  
  try {
    // More detailed environment logging for Netlify debugging
    reporter.info(`Build environment: ${process.env.NODE_ENV}`);
    reporter.info(`Airtable API Key exists: ${!!process.env.AIRTABLE_API_KEY}`);
    reporter.info(`Airtable Base ID exists: ${!!process.env.AIRTABLE_BASE_ID}`);
    
    // Always create mock data nodes - they'll only be used if Airtable fails
    // This ensures we always have fallback data available
    reporter.info('Creating mock portfolio data as fallback');
    
    // Create mock portfolio data nodes
    mockPortfolioData.forEach(item => {
      try {
        const nodeContent = JSON.stringify(item);
        const nodeMeta = {
          id: createNodeId(`mock-portfolio-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: 'MockPortfolioData',
            content: nodeContent,
            contentDigest: createContentDigest(item),
          },
        };
        
        const node = { ...item, ...nodeMeta };
        createNode(node);
      } catch (nodeError) {
        reporter.warn(`Failed to create mock node for ${item.id}: ${nodeError.message}`);
        // Continue with other nodes even if one fails
      }
    });
    
    reporter.info(`Created ${mockPortfolioData.length} mock portfolio data nodes as fallback`);
  } catch (error) {
    reporter.error('Error in sourceNodes: ' + error.message);
    // Prevent build failure by continuing despite errors
  }
};

/* 
* Webpack setup
*/

// Add webpack alias for @ imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  });
};

// Setup path aliases and handle browser-only modules
exports.onCreateWebpackConfig = ({ actions, stage, loaders, getConfig }) => {
  // Set up path aliases
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  })

  /* 
  * TypeScript & build-time setup
  */

  // Configure TypeScript with JSX support
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  '@babel/preset-typescript'
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  })

  // Handle browser-only modules during SSR
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas|particle|recharts|react-smooth|d3-array/,
            use: loaders.null(),
          }
        ],
      },
    })

    // Force build to continue even with errors in HTML generation
    const config = getConfig();
    if (config.mode === 'production') {
      actions.setWebpackConfig({
        devtool: false,
      });
    }
  }
} 
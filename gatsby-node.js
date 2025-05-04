const path = require("path")
const crypto = require("crypto")

// Explicitly add custom fields to AirtableData for GraphQL schema
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type AirtableData {
      Technology_Type: String
      Main_Headquarter: String
      Details: String
    }
  `);
};

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
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
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
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
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

// Build-time: generate sanitized JSONs using Gatsby's GraphQL
const fs = require('fs');

exports.onPostBuild = async ({ graphql, reporter }) => {
  reporter.info('Generating stats.json and companies.json');
  let companies = [];
  try {
    const result = await graphql(`
      query AllPortfolioData {
        allAirtable(filter: { table: { eq: "Startups" } }) {
          nodes {
            id
            data {
              Deal_Name
              Summary
              One_Line_Summary
              domain__from_Company_
              Logo { localFiles { publicURL } }
              Photo { localFiles { publicURL } }
              Sector
              Stage
              Close_Date
              Announced
              Fund_numeral
              Deal_Value
              Total_Invested
              GBP_Final_Ticket_Invested
              Entry_Valuation
              GBP_Initial_Round_Pre_Money_Valuation
              Technology_Type
              Main_Headquarter
              Latest_Follow_on_Round
              Current_Status
            }
          }
        }
      }
    `);
    if (result.errors) {
      throw result.errors;
    }
    const nodes = result.data.allAirtable.nodes;
    companies = nodes.map(({ id, data: d }) => {
      const rawDomain = d.domain__from_Company_;
      const domain = Array.isArray(rawDomain) ? rawDomain[0] : rawDomain;
      const website = domain
        ? (/^https?:\/\//i.test(domain) ? domain : `https://${domain}`)
        : '';
      const announced =
        typeof d.Announced === 'boolean'
          ? d.Announced
          : typeof d.Announced === 'string' && d.Announced.toLowerCase() === 'yes';
      const base = {
        id,
        name: d.Deal_Name || '',
        description: d.Summary || '',
        oneLiner: d.One_Line_Summary,
        logo: d.Logo?.localFiles?.[0]?.publicURL || '',
        photo: d.Photo?.localFiles?.[0]?.publicURL,
        website,
        industry: d.Sector || [],
        stage: d.Stage || '',
        investmentDate: d.Close_Date || '',
        announced,
        fund: d.Fund_numeral,
        dealValue: d.Deal_Value,
        totalInvested: d.Total_Invested,
        gbpFinalTicketInvested: d.GBP_Final_Ticket_Invested,
        gbpInitialRoundPreMoneyValuation: d.GBP_Initial_Round_Pre_Money_Valuation,
        entryValuation: d.Entry_Valuation,
        technologyType: d.Technology_Type,
        headquarter: d.Main_Headquarter,
        latestFollowOnRound: d.Latest_Follow_on_Round,
        currentStatus: d.Current_Status,
      };
      return announced
        ? base
        : {
            ...base,
            name: '🔒 Stealth',
            description: 'Details to be announced soon.',
            industry: base.industry,
            stage: base.stage,
          };
    });
  } catch (error) {
    reporter.error('GraphQL query failed, falling back to mock data', error);
    companies = mockPortfolioData;
  }
  // Compute stats
  const announcedList = companies.filter(c => c.announced);
  let totalInv = announcedList.reduce(
    (sum, c) => sum + (c.gbpFinalTicketInvested || 0),
    0
  );
  const invCount = announcedList.filter(c => c.gbpFinalTicketInvested).length;
  if (invCount === 0 && announcedList.length) {
    totalInv = announcedList.length * 500000;
  }
  const averageInvestment =
    invCount > 0
      ? totalInv / invCount
      : announcedList.length
      ? totalInv / announcedList.length
      : 0;
  const vals = announcedList
    .map(c => c.gbpInitialRoundPreMoneyValuation)
    .map(v => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string') {
        const m = v.match(/\d+(\.\d+)?/);
        if (m) {
          let num = parseFloat(m[0]);
          if (v.includes('M')) num *= 1000000;
          else if (v.includes('K')) num *= 1000;
          return num;
        }
      }
      return null;
    })
    .filter(v => v !== null);
  let medianValuation = 0;
  if (vals.length) {
    vals.sort((a, b) => a - b);
    const mid = Math.floor(vals.length / 2);
    medianValuation =
      vals.length % 2 === 0
        ? (vals[mid - 1] + vals[mid]) / 2
        : vals[mid];
  }
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const investmentsLast12Months = announcedList.reduce(
    (sum, c) => {
      const d = new Date(c.investmentDate);
      return d >= oneYearAgo ? sum + (c.totalInvested || 500000) : sum;
    },
    0
  );
  const companiesLast12Months = announcedList.filter(
    c => new Date(c.investmentDate) >= oneYearAgo
  ).length;
  const stats = {
    totalInvestments: totalInv,
    totalCompanies: companies.length,
    averageInvestment,
    medianValuation,
    investmentsLast12Months,
    companiesLast12Months,
  };
  fs.writeFileSync(
    path.join(__dirname, 'public', 'stats.json'),
    JSON.stringify(stats)
  );
  fs.writeFileSync(
    path.join(__dirname, 'public', 'companies.json'),
    JSON.stringify(companies)
  );
  reporter.info('Wrote stats.json and companies.json');
};
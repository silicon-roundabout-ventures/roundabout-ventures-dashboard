const path = require("path");
const { createRemoteFileNode } = require('gatsby-source-filesystem');

/* 
 * 
 * GATSBY NODE FUNCS 
 * 
 */


/* 
 * HELPER FUNCS 
 */

// Helper functions hoisted
function toBoolAnnounced(val) {
  const s = String(val).trim().toLowerCase();
  return val === true || ["yes", "true", "1"].includes(s);
}

function calculateMedian(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return arr.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function sanitizeStealth(company) {
  if (company.announced) return company;
  return {
    ...company,
    name: '🔒 Stealth',
    description: 'Details to be announced soon...',
    logo: '',
    photo: undefined,
    website: '',
  };
}

function calculatePortfolioStats(nodes) {
  const tickets = nodes.filter(n => n.data.GBP_Final_Ticket_Invested).map(n => n.data.GBP_Final_Ticket_Invested);
  const totalInvestments = tickets.reduce((sum, n) => sum + (n || 0), 0);
  const vals = nodes.filter(n => n.data.GBP_Initial_Round_Pre_Money_Valuation).map(n => n.data.GBP_Initial_Round_Pre_Money_Valuation);
  const averageInvestment = tickets.length ? tickets.reduce((a, b) => a + b, 0) / tickets.length : 0;
  const medianValuation = calculateMedian(vals);
  const oneYearAgo = new Date(); oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const investmentsLast12 = nodes.filter(n => new Date(n.data.Close_Date) >= oneYearAgo).reduce((s, n) => s + (n.data.GBP_Final_Ticket_Invested || 0), 0);
  const companiesLast12 = nodes.filter(n => new Date(n.data.Close_Date) >= oneYearAgo).length;
  return { totalInvestments, totalCompanies: nodes.length, averageInvestment, medianValuation, investmentsLast12Months: investmentsLast12, companiesLast12Months: companiesLast12 };
}

/* 
 * AIRTABLE FUNCS 
 */

const { getMockPortfolioCompanies, getMockFundStatistics } = require("./src/data/mockPortfolioData.js");
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

// Create fallback data if Airtable plugin is not loaded
exports.sourceNodes = ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  const mockData = getMockPortfolioCompanies();
  reporter.info('Adding mock portfolio nodes fallback');
  mockData.forEach(item => {
    const nodeContent = JSON.stringify(item);
    const nodeMeta = {
      id: createNodeId(`mock-portfolio-${item.id}`),
      parent: null,
      children: [],
      internal: { type: 'MockPortfolioData', content: nodeContent, contentDigest: createContentDigest(item) }
    };
    createNode({ ...item, ...nodeMeta });
  });
};

// Programmatic creation of portfolio page
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allAirtable(filter: {table: {eq: "Startups"}}) {
        nodes { 
          recordId 
          data { 
            Deal_Name 
            Summary 
            One_Line_Summary 
            domain__from_Company_ 
            Sector Stage 
            Close_Date 
            Announced 
            Fund_numeral 
            Main_Headquarter 
            Current_Status 
            Technology_Type 
            Logo { localFiles { childImageSharp { gatsbyImageData(width:200, height:200, layout: CONSTRAINED, quality:80) } } } 
            Photo { localFiles { childImageSharp { gatsbyImageData(width:600, height:400, layout: CONSTRAINED, quality:80) } } } 
            Latest_Follow_on_Round 
            GBP_Final_Ticket_Invested 
            Entry_Valuation 
            GBP_Initial_Round_Pre_Money_Valuation
          } 
        }
      }
    }
  `);

  if (result.errors) throw result.errors;
  
  const nodes = result.data.allAirtable.nodes;
  const rawCompanies = nodes.map(item => {
    const d = item.data;
    const rawDom = d.domain__from_Company_;
    const dom = Array.isArray(rawDom) ? rawDom[0] : rawDom || '';
    const website = /^https?:\/\//i.test(dom) ? dom : `https://${dom}`;
    return {
      id: item.recordId,
      name: d.Deal_Name || '',
      description: d.Summary || '',
      oneLiner: d.One_Line_Summary || '',
      logoImageData: d.Logo?.localFiles?.[0]?.childImageSharp?.gatsbyImageData || null,
      photoImageData: d.Photo?.localFiles?.[0]?.childImageSharp?.gatsbyImageData || null,
      logo: d.Logo?.localFiles?.[0]?.publicURL || '',
      photo: d.Photo?.localFiles?.[0]?.publicURL || '',
      website,
      technology: d.Technology_Type || '',
      hq: d.Main_Headquarter || '',
      sectors: d.Sector || [],
      stage: d.Stage || '',
      investmentDate: d.Close_Date || '',
      announced: toBoolAnnounced(d.Announced),
      fund: d.Fund_numeral || null,
      currentStatus: d.Current_Status || '',
      latestFollowOnRound: d.Latest_Follow_on_Round || ''
    };
  });

  const portfolioStats = nodes.length > 0 ? calculatePortfolioStats(nodes) : getMockFundStatistics();
  const sanitizedCompanies = rawCompanies.map(sanitizeStealth);
  
  // Emit portfolio page based on a template provided
  createPage({ 
    path: '/portfolio/', 
    component: path.resolve(__dirname, 'src/templates/portfolio.tsx'), 
    context: { 
      companies: sanitizedCompanies, 
      portfolioStats } 
  });
};

// Fetch remote logos/photos and expose as File nodes for gatsby-plugin-image
exports.createResolvers = ({ actions, cache, createNodeId, createResolvers, store }) => {
  const { createNode } = actions;
  createResolvers({
    MockPortfolioData: {
      logoImage: {
        type: 'File',
        resolve: async (source) => {
          if (!source.logo) return null;
          return await createRemoteFileNode({
            url: source.logo,
            store,
            cache,
            createNode,
            createNodeId: id => createNodeId(`remote-logo-${source.id}`),
            parentNodeId: source.id,
          });
        },
      },
      photoImage: {
        type: 'File',
        resolve: async (source) => {
          if (!source.photo) return null;
          return await createRemoteFileNode({
            url: source.photo,
            store,
            cache,
            createNode,
            createNodeId: id => createNodeId(`remote-photo-${source.id}`),
            parentNodeId: source.id,
          });
        },
      },
    },
  });
};

// Extend schema for remote image fields
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MockPortfolioData implements Node {
      logoImage: File @link
      photoImage: File @link
    }
  `);
};

/* 
 * TYPESCRIPT / WEBPACK / BUILD-TIME SETUP
 */

// Add webpack path alias for @ imports and handle browser-only modules
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
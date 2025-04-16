const path = require("path")
const crypto = require("crypto")

// Mock portfolio data for when Airtable is not available
const mockPortfolioData = [
  {
    id: "mock-1",
    table: "Startups",
    recordId: "rec123mock1",
    data: {
      Name: ["Jane Doe", "John Smith"],
      Deal_Name: "TechFusion AI",
      Notes: "AI-powered data analytics platform for enterprise",
      One_Line_Summary: "Making data accessible to all",
      Sector: ["Artificial Intelligence", "Enterprise Software"],
      Stage: "Series A",
      Announced: "Yes",
      Close_Date: "2023-06-15",
      Company: ["techfusion.ai"],
      Fund: "Fund I",
      Total_Invested: 500000,
      Entry_Valuation: "£5M"
    }
  },
  {
    id: "mock-2",
    table: "Startups",
    recordId: "rec123mock2",
    data: {
      Name: ["Alex Rivera"],
      Deal_Name: "GreenTech Solutions",
      Notes: "Sustainable energy management systems for commercial buildings",
      One_Line_Summary: "Reducing carbon footprints through smart building tech",
      Sector: ["CleanTech", "IoT"],
      Stage: "Seed",
      Announced: "Yes",
      Close_Date: "2023-09-22",
      Company: ["greentechsolutions.com"],
      Fund: "Fund I",
      Total_Invested: 350000,
      Entry_Valuation: "£3.5M"
    }
  },
  {
    id: "mock-3",
    table: "Startups",
    recordId: "rec123mock3",
    data: {
      Name: ["Sarah Chen", "Michael Wong"],
      Deal_Name: "HealthCare AI",
      Notes: "AI diagnostics platform for early disease detection",
      One_Line_Summary: "Democratizing healthcare through AI",
      Sector: ["HealthTech", "Artificial Intelligence"],
      Stage: "Series A",
      Announced: "Yes",
      Close_Date: "2023-04-10",
      Company: ["healthcareai.io"],
      Fund: "Fund I",
      Total_Invested: 750000,
      Entry_Valuation: "£7M"
    }
  },
  {
    id: "mock-4",
    table: "Startups",
    recordId: "rec123mock4",
    data: {
      Name: ["David Patel"],
      Deal_Name: "",
      Notes: "Information about this company is currently not available.",
      One_Line_Summary: "",
      Sector: ["Fintech"],
      Stage: "Seed",
      Announced: "No",
      Close_Date: "2024-01-15",
      Company: [""],
      Fund: "Fund II",
      Total_Invested: 250000,
      Entry_Valuation: "£2M"
    }
  },
  {
    id: "mock-5",
    table: "Startups",
    recordId: "rec123mock5",
    data: {
      Name: ["Emma Johnson", "Tom Wilson"],
      Deal_Name: "EdTech Innovations",
      Notes: "Personalized learning platform for K-12 students",
      One_Line_Summary: "Revolutionizing education through adaptive learning",
      Sector: ["EdTech"],
      Stage: "Seed",
      Announced: "Yes",
      Close_Date: "2023-11-05",
      Company: ["edtechinnovations.io"],
      Fund: "Fund II",
      Total_Invested: 300000,
      Entry_Valuation: "£2.5M"
    }
  }
];

// Add explicit schema typing for Airtable data
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Airtable implements Node {
      data: AirtableData
      table: String
      recordId: String
    }
    type AirtableData {
      Name: [String]
      Deal_Name: String
      Notes: String
      One_Line_Summary: String
      Sector: [String]
      Stage: String
      Announced: String
      Close_Date: String
      Company: [String]
      Logo: AirtableDataLogo
      Fund: String
      Total_Invested: Float
      Entry_Valuation: String
    }
    type AirtableDataLogo {
      localFiles: [File] @link
    }
    
    # Define schema for our mock portfolio data
    type MockPortfolioData implements Node {
      data: PortfolioData
      table: String
      recordId: String
    }
    type PortfolioData {
      Name: [String]
      Deal_Name: String
      Notes: String
      One_Line_Summary: String
      Sector: [String]
      Stage: String
      Announced: String
      Close_Date: String
      Company: [String]
      Fund: String
      Total_Invested: Float
      Entry_Valuation: String
    }
  `
  createTypes(typeDefs)
}

// Create fallback data if Airtable plugin is not loaded
exports.sourceNodes = ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  
  // Only create mock data if AIRTABLE_API_KEY is not available
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    reporter.info("No Airtable credentials detected, creating mock portfolio data nodes");
    
    // Create mock Airtable nodes with a different type name to avoid conflicts
    mockPortfolioData.forEach(item => {
      const nodeContent = {
        ...item,
      };
      
      const nodeMeta = {
        id: createNodeId(`mock-portfolio-${item.id}`),
        parent: null,
        children: [],
        internal: {
          // Use a different type name to avoid conflicts with gatsby-source-airtable
          type: "MockPortfolioData",
          contentDigest: createContentDigest(nodeContent),
        },
      };
      
      const node = { ...nodeContent, ...nodeMeta };
      createNode(node);
    });
    
    reporter.info(`Created ${mockPortfolioData.length} mock portfolio items`);
  }
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
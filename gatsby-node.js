const path = require("path")

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
  `
  createTypes(typeDefs)
}

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
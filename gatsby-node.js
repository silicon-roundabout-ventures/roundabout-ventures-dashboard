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
      name: String
      description: String
      sector: [String]
      website: String
      stage: String
      announced: String
      close_date: String
      logo: AirtableDataLogo
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
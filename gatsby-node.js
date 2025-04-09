const path = require("path")

// Setup path aliases and handle browser-only modules
exports.onCreateWebpackConfig = ({ actions, stage, loaders, getConfig }) => {
  // Set up path aliases
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
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
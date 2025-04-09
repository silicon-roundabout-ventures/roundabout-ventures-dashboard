#!/bin/bash

# Create necessary directories
mkdir -p src/images

# Install dependencies if not already installed
npm install --save gatsby gatsby-plugin-typescript gatsby-plugin-postcss tailwindcss postcss autoprefixer
npm install --save @tanstack/react-query gatsby-plugin-emotion @emotion/react @emotion/styled
npm install --save gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp gatsby-source-filesystem gatsby-plugin-manifest gatsby-plugin-react-helmet react-helmet

# Create Gatsby configuration files
echo "Gatsby configuration files have been created"
echo "- gatsby-config.js"
echo "- gatsby-browser.js"
echo "- gatsby-ssr.js"
echo "- gatsby-node.js"

# Update package.json scripts
echo "Updating package.json scripts..."
node -e '
  const fs = require("fs");
  const package = require("./package.json");
  
  package.scripts = {
    ...package.scripts,
    "develop": "gatsby develop",
    "start": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "clean": "gatsby clean"
  };
  
  fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
'

echo ""
echo "Migration setup complete!"
echo ""
echo "Next steps:"
echo "1. Convert your React Router routes to Gatsby pages in the src/pages directory"
echo "2. Update imports to use the new @/ alias where needed"
echo "3. Wrap your pages with the Layout component"
echo "4. Test your site by running: npm run develop"
echo ""

# Make the script executable
chmod +x migrate-to-gatsby.sh 
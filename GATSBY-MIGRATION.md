# Converting to Gatsby

This document outlines the steps taken to convert this web application from Vite/React to Gatsby.

## Migration Steps

1. **Install Gatsby and required dependencies**
   ```bash
   npm install --save gatsby gatsby-plugin-typescript gatsby-plugin-postcss tailwindcss postcss autoprefixer
   npm install --save @tanstack/react-query gatsby-plugin-emotion @emotion/react @emotion/styled
   npm install --save gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp gatsby-source-filesystem gatsby-plugin-manifest gatsby-plugin-react-helmet react-helmet
   ```

2. **Create Gatsby configuration files**
   - `gatsby-config.js` - Configure Gatsby plugins and site metadata
   - `gatsby-browser.js` - Set up app wrappers and CSS imports
   - `gatsby-ssr.js` - Handle server-side rendering
   - `gatsby-node.js` - Set up path aliases and page creation

3. **Update package.json**
   - Remove `"type": "module"` as Gatsby uses CommonJS
   - Update scripts to use Gatsby commands

4. **Create a Layout component**
   - Create `src/components/Layout.tsx` to wrap all pages
   - This replaces the App.tsx router setup

5. **Convert pages to use Gatsby structure**
   - Move React Router pages to Gatsby pages
   - Replace `react-router-dom` Link with Gatsby `Link`
   - Add SEO metadata using Gatsby Head API

6. **Handle path aliases**
   - Set up the `@` path alias in gatsby-node.js
   - Update imports to use the correct paths

## App Structure Changes

### Before (Vite/React Router)
- Used React Router for routing
- Entry point in `src/main.tsx`
- Routing defined in `App.tsx`

### After (Gatsby)
- Pages-based routing in `src/pages/`
- Layout component for global UI elements
- Gatsby's `wrapRootElement` for global providers
- Built-in GraphQL data layer (optional)

## Running the Application

- Development: `npm run develop` or `npm start`
- Build: `npm run build`
- Serve build: `npm run serve`
- Clean cache: `npm run clean`

## Known Issues and Solutions

1. **ESM vs CommonJS compatibility**
   - Gatsby works best with CommonJS
   - Removed `"type": "module"` from package.json

2. **Path aliases**
   - Set up aliases in gatsby-node.js to match Vite's configuration

3. **React Router to Gatsby Link**
   - Replace `react-router-dom` imports with Gatsby's `Link`

4. **Global providers**
   - Move providers from `App.tsx` to `gatsby-browser.js`
   - Use `wrapRootElement` API

## Benefits of Gatsby

1. **Built-in optimizations**
   - Automatic code splitting
   - Image optimization with gatsby-image
   - Built-in routing

2. **SEO features**
   - Server-side rendering
   - Static site generation
   - Metadata management

3. **Plugin ecosystem**
   - Extensive plugins for various features
   - Data sourcing from different APIs and CMSs

## Next Steps

1. Convert remaining pages
2. Set up proper SEO metadata for each page
3. Implement data fetching with Gatsby's GraphQL layer if needed
4. Add icons and manifest for PWA support 
# Silicon Roundabout Ventures Dashboard

![Silicon Roundabout Ventures](./src/images/siliconroundabout/srv_logo_dash.png)

A modern, data-driven dashboard for Silicon Roundabout Ventures, a Community-Driven VC firm backing Deep Tech founders with extreme conviction at pre-seed and seed stages.

## 📋 Project Overview

The Silicon Roundabout Ventures Dashboard is a JAMStack Gatsby-based web application that provides a transparent, responsive interface for the venture capital firm. It features dynamic data integration with Airtable, allowing for real-time updates of portfolio companies and fund statistics.

### 🚀 Deployment URL

**URL**: https://siliconroundabout.ventures

## ✨ Key Features

- **Transparency Principles**: All data is fetched from out Airtable and transparently displayed and updated in real-time (save from what Startups decide to keep in Stealth): we want to share exactly what we invest in, what we belive in, and what we are building. We have nothing to hide for other managers, LPs, or founders. We are 100% committed to a more transparent VC that actually puts money where their mouth is. For us it's Deeptech first, Technical Founders first, Europe first (at inception, not scaling), Pre-seed and Seed focused, and committed to building and sharing this journey in public.
- **Open Source**: The code is open source and available on GitHub: request what you'd like to see and (within the limit of confidentiality agreements) we'll try to implement it.
- **Modern UI Design**: Sleek dark theme with code editor-inspired aesthetics
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Dynamic Portfolio**: Real-time data fetching from Airtable
- **Fund Statistics Dashboard**: Visualizations of key fund metrics
- **Application Forms**: Integrated forms for startups and investors
- **Blog Integration**: Connected to Substack for Building in Public updates through RSS feed integration
- **Airtable Integration**: Flexible data retrieval and transformation

## 🛠 Technology Stack

- **Framework**: [Gatsby](https://www.gatsbyjs.com/) - React-based static site generator
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Accessible component library
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) - Data synchronization
- **CMS**: [Airtable](https://airtable.com/) - Flexible content management
- **Animation**: [Particles.js](https://particles.js.org/) - Background particle effects

## 🔌 Airtable Integration

The dashboard connects to Airtable to fetch and display real portfolio company data:

- **Base ID**: Configured via environment variables
- **Table**: where the startup data to visuialise rests
- **View**: for better filtering

The integration includes:
- Dynamic field mapping for flexibility
- Fallback to mock data if API is not available
- Error handling for API connection issues
- Fund statistics calculation from raw data

All data comes from Airtable via the `gatsby-source-airtable` plugin. To customize fields or tables:

1. Environment variables:
   - `AIRTABLE_API_KEY` (in `.env.development`)
   - `AIRTABLE_BASE_ID`

2. Plugin config (`gatsby-config.js`):
   ```js
   {
     resolve: `gatsby-source-airtable`,
     options: {
       apiKey: process.env.AIRTABLE_API_KEY.trim(),
       tables: [
         {
           baseId: process.env.AIRTABLE_BASE_ID.trim(),
           tableName: `Startups`,
           tableView: `Portfolio_websiteFeed`,
           mapping: { Logo: 'fileNode', Photo: 'fileNode' },
         },
       ],
     },
   }
   ```

3. Field definitions (`src/config/airtableConfig.ts`):
   - `FIELDS.PORTFOLIO` defines Airtable column names.
   - `PortfolioFields` interface mirrors your Airtable schema.

4. Data service 
  a. Gatsby/Airtable sourcing (build time)
    - gatsby-config.js
      - Configures gatsby-source-airtable with your API key, Base ID, table “Startups” and view “Portfolio_websiteFeed.”
    - createSchemaCustomization in gatsby-node.js
      - Adds any custom GraphQL fields.
  b. Page creation & raw → normalized data (build time in gatsby-node.js)
    - exports.createPages
      - Runs a GraphQL query
      ```graphql    allAirtable(filter:{table:{eq:"Startups"}}){       nodes {         recordId         data {           Deal_Name...         }       }     }```
      - Maps each node → a companies array of { id, name… }.
    - calculatePortfolioStats(nodes)
      - Sums d.GBP_Final_Ticket_Invested → totalInvestments
      - Gathers d.Entry_Valuation → averageInvestment & medianValuation
      - Filters by Close_Date for last-12-month investments & company count
      - Falls back to getMockFundStatistics() if no Airtable rows
    - createPage(…)
      - Emits /portfolio/, passing companies and portfolioStats via `pageContext`
  c. Portfolio template & filtering (runtime in `src/templates/portfolio.ts`)
    - Reads `companies` and `statistics` from ` pageContext` (fallback to mock data if nothing is retrieved)
    - Chart data (sectorData, stageData, etc.) via Gatsby's `useMemo` over companies
    - Renders
      ```tsx
        <StatisticsSection data={input_data}.../>
        <ChartsSection data={input_data}/>
      ```
    - Filter UI ([fileds used as filters])
    - Grid of ```<PortfolioCard company={…}/>``` for `filtered`
  d. Statistics rendering (`src/components/sections/StatisticsSection.tsx`)
    - Formats and displays
      - totalInvestments → “£X.XM”
      - totalCompanies
      - averageInvestment → “£Xk”
      - medianValuation → “£X.XM”
      - Last-12-month changes
  e. [DEPRECATED] AirtableService (in `src/services/_AirtableService.deprecated.tsx`)
    - AirtableService.getPortfolioCompanies() / getFundStatistics()
      - Directly hit Airtable’s REST API with caching, but not currently wired into the portfolio page:
      - NOW: Stats building lives in gatsby-node.js → calculatePortfolioStats
    _(client-side services are only needed for operations that would take place in the browser, but this is currently not used as it could leak to information being leaked directly from Airtable and before any sanitisation)_
    - It used to:
      - `normalizePortfolioCompany(record)`
      - Pick GraphQL data or fallback fields
      - Coerce Announced via toBoolAnnounced(…)
      - Sanitise stealth fields (name → “🔒 Stealth”, blank logo, etc.)
      - `usePortfolioCompanies()` queries Airtable (here: `allAirtable`).
    - Attachments resolve at `data.Logo.localFiles[0].publicURL`.
    - `normalizePortfolioCompany` maps nodes to `PortfolioCompany`.

To add/remove fields, update `FIELDS.PORTFOLIO` in `src/config/airtableConfig.ts` and adjust the GraphQL query and normalization logic in `src/gatsby-node.js`.

To adjust the rendering, update the `src/templates/portfolio.tsx` file or the components in `src/components`.

## 🔄 External Service Integrations

### Forms & Calendars via iframes

The dashboard uses iframes to integrate several external services, prioritizing flexibility and maintainability:

- **Lu.ma Calendar Embeds**: Community and investor events are displayed through embedded Lu.ma calendars, allowing real-time event updates without redeployment.

- **Application Forms**: Both startup application and LP inquiry forms are embedded through iframes:
  - **Airtable Forms**: For startup applications
  - **Google Forms**: For LP inquiries

#### Benefits of iframe Integration

- **Rapid Updates**: Form fields can be modified without code changes or redeployment
- **Simplified Maintenance**: Form processing logic handled by established services
- **Consistent Experience**: Users stay within the dashboard environment (no external redirects)
- **Flexibility**: Easy to switch form providers or update form content

All iframe content includes custom loading indicators with the dashboard's branded styling for a seamless user experience.

## 📝 Building in Public: Blog & Substack Integration

The "Building in Public" section of the dashboard features a modern blog that automatically pulls content from Silicon Roundabout Ventures' Substack publication:

- **RSS Feed Integration**: Automatically fetches the latest posts from the firm's Substack using its RSS feed
- **Content Transformation**: Converts Substack's HTML content to properly styled, responsive components
- **Image Optimization**: Handles Substack images through Gatsby's image optimization pipeline
- **Article Previews**: Displays post excerpts with "Read More" functionality to drive traffic to full articles
- **Mobile Responsive**: Adapts to all screen sizes while maintaining readability
- **Caching**: Implements caching mechanisms to reduce API calls and improve performance

This integration allows the team to write and publish content on Substack while automatically maintaining a consistent look and feel on the main website, eliminating duplicate content management.

## 📊 Fund Statistics

The dashboard calculates and displays key fund metrics:

- Total Investments (£)
- Average Investment (£)
- Median Valuation (£)
- Investments in Last 12 Months (£)
- Companies Added in Last 12 Months
- Industry, Stage, Type (hardware/software), and Headquarter distribution

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Airtable API Key (for data integration)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd roundabout-ventures-dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env.development

# Add your Airtable API key to .env.development
# AIRTABLE_API_KEY=your_api_key_here
# AIRTABLE_BASE_ID=your_base_id_here

# Start the development server
npm run develop

# Other available scripts
# npm run build - Build the production site
# npm run serve - Serve the production build locally
# npm run clean - Clean the Gatsby cache
```

The site will be available by default at http://localhost:8000

## 🔄 Environment Configuration

The project uses environment variables for API configuration:

- `AIRTABLE_API_KEY`: Your Airtable API authentication key
- `AIRTABLE_BASE_ID`: The specific Airtable base identifier

These variables are managed in the `.env.development` file (not committed to version control).

## 🏗️ Project Structure

src/
├── components/      # Reusable React components (UI & Processing)
│   ├── layouts/     # Layout, backgrounds & navigation
│   ├── sections/    # Page sections
│   ├── widgets/     # Cards, charts, utility rendering widgets, etc.
│   └── parts/       # Basic UI elements and unitary components
├── config/          # Env & Airtable field/type definitions
├── services/        # API data & normalization (`AirtableService`)
├── hooks/           # Custom hooks (e.g. filters)
├── data/            # Fallback mock data
├── pages/           # Gatsby page components (website pages)
├── templates/       # Gatsby template components (website templates for dynamically generated or enriched pages)
├── images/          # Static images
├── utils/          # Utility functions
├── types/           # Useful type definitions
└── styles/          # Global styles & Tailwind setup

## 📦 Deployment

The project is deployed using Netlify

## 📝 Contributing

To contribute to the project:

1. Clone the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚧 TODO

### Functionality

- [x] Account for currency exchange rates in fund & portfolio stats  
- [x] Check that data processed is sanitised correctly  
- [ ] Add login for LPs and Founders  
- [ ] Add interactive pages for LP client features and AI support  
- [ ] Add interactive pages for Founders to warm-connect with the community  
- [ ] Consider adding a news feed for key portfolio updates  
- [ ] Add both Founder and LP testimonials  

### Refactoring TODOs

- [ ] Prune & clean up dependencies and npm scripts  
- [ ] Enhance performance & SEO (sitemap, PWA/offline, rel=canonical, preload, preconnect)  
- [ ] Harden security & caching headers (CSP, cache-control)  
- [ ] Consolidate config & enforce code quality (alias paths, remove console logs, ESLint + Prettier)  
- [ ] Styling & Theming Improvements

#### Detailed TODO

##### Prune & clean up dependencies and npm scripts
- Remove unused dependencies (`react-type-animation`, `next-themes`)
- Consolidate npm scripts (`dev`, `start`, `develop`)

##### Enhance performance & SEO
- Configure `gatsby-plugin-sitemap`
- Configure `gatsby-plugin-offline` or `gatsby-plugin-preload-fonts`
- Add `<link rel="preconnect">` for external domains (Airtable, analytics)
- Extend SEO component:
  - Add `<link rel="canonical">`
  - Include `og:locale` and alternate language tags (if applicable)

##### Harden security & caching headers
- Tighten CSP in `gatsby-plugin-netlify` (remove `'unsafe-inline'`/`eval`)
- Adjust `Cache-Control` settings for HTML vs static assets

##### Consolidate config & enforce code quality
- Consolidate alias-imports and TypeScript path configurations (e.g. switch to `gatsby-plugin-tsconfig-paths`)
- Remove `console.log` statements from `gatsby-config.js` and production code
- Add ESLint rules (import ordering, no-unused-vars, no-console)
- Add Prettier (`.prettierrc`) and enforce formatting on commit
- Audit Radix/UI imports to tree-shake only what you use (consider `@radix-ui/react-core`)

##### Styling & Theming Improvements
- Audit Tailwind config: enable JIT mode and purge unused classes
- Define custom Tailwind theme (colors, spacing, typography)
- Extract repeated utility classes using `@apply`-based CSS modules or components
- Move inline styles (e.g. modals, animation wrappers) into Tailwind or CSS modules
- Consolidate global styles via `styles/` directory or shared layout CSS
- Add Stylelint with a Tailwind plugin to enforce consistency
- Ensure responsive breakpoints are consistently applied across layouts

## 🎨 Design Inspiration

The dashboard's aesthetic is inspired by two key elements:

1. **Silicon Roundabout Ventures' Brand Identity**: The black and white color scheme reflects the firm's sophisticated, minimalist brand approach, with accent colors carefully chosen to highlight important data and actions.

2. **Developer-Focused Experience**: The dark mode design draws inspiration from modern code editors and IDEs that developers use daily. This creates a familiar, comfortable viewing experience while maintaining a professional appearance.

### Signature Particle Backgrounds

A distinctive feature of the dashboard is the animated particle backgrounds that create a subtle, dynamic effect. These particles represent the interconnected nature of the startup ecosystem and the flowing, ever-changing tech landscape. 

The particle system is customizable in density, speed, and connection distance, allowing for different atmospheres across various pages while maintaining a cohesive visual identity.

## 🔍 Airtable Data Handling Guide

### Base and Table Structure

The dashboard is configured to work with a specific Airtable structure:

1. **Base**: The default base ID is the database to which the dashboard is connected
2. **Table**: Table listing portfolio companies
3. **View**: Optimised view for the website

### Field Mapping

The system uses flexible field mapping to accommodate variations in Airtable field names:

```typescript
// Primary field mappings
const name = fields['Deal Name'] || fields['Company Name'] || fields['Name']; 
const description = fields['Summary'] || fields['One Line Summary'] || fields['Description'];
const stage = fields['Stage'] || fields['Investment Stage'] || fields['Round'];
```

To customize field mappings, modify the transformation logic in `src/services/AirtableService.ts` in the `getPortfolioCompanies()` method.

### Calculated Metrics

Fund statistics are dynamically calculated from raw Airtable data:

- **Median Valuation**: Uses the `Entry Valuation` field when available; otherwise estimates based on deal value and stage
- **Investments in Last 12 Months**: Calculated using the `investmentDate` field
- **Industry and Stage Distribution**: Generated from the mapped fields in each record
- **Total Investments**: Uses the `totalInvested` field when available; otherwise estimates based on deal value and stage
- **Headquartered in**: Where are the investmets based
- **Type**: Startups based devidided between Hardware and Software

### Customizing Data Sources

To change the Airtable data source:

1. Update `.env.development` with your API key and base ID
2. Modify field mappings in `AirtableService.ts` to match your structure
3. Adjust calculation methods if your financial data uses different formats

```javascript
// .env.development example
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

## 🔧 Customization Guide

### Theming

Colors are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'srv-dark': '#0d1117',
      'srv-blue': '#1f2937',
      'srv-teal': '#4dd0e1',
      'srv-pink': '#f472b6',
      'srv-yellow': '#fbbf24',
      'srv-gray': '#9ca3af',
      'srv-light': '#e5e7eb'
    }
  }
}
```

Modify these values to match your brand colors.

### Page Structure

To add or modify pages:

1. Create or edit files in the `src/pages` directory
2. Gatsby automatically creates routes based on the file structure
3. Use the existing layout components to maintain design consistency

### Component Customization

The component library is organized into:

- `layouts/`: Layout, navigation, and shared components
- `sections/`: Page sections and data visualizations
- `widgets/`: Reusable UI components and processing elements
- `parts/`: Basic interface elements

Extend these components by following the established patterns and TypeScript interfaces.

## 📄 License

This project is licensed under the MIT License with Attribution Requirement - see the [LICENSE](./LICENSE) file for details.

In short, you are free to use, modify, and distribute the code, but must include attribution to Silicon Roundabout Ventures in your project, either in the UI, documentation, or website footer.

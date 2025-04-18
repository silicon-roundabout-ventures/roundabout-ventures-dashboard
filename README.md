# Silicon Roundabout Ventures Dashboard

![Silicon Roundabout Ventures](./src/images/srv_logo_dash.png)

A modern, data-driven dashboard for Silicon Roundabout Ventures, a Community-Driven VC firm backing Deep Tech founders with extreme conviction at pre-seed and seed stages.

## 📋 Project Overview

The Silicon Roundabout Ventures Dashboard is a JAMStack Gatsby-based web application that provides a transparent, responsive interface for the venture capital firm. It features dynamic data integration with Airtable, allowing for real-time updates of portfolio companies and fund statistics.

### 🚀 Deployment URL

**URL**: https://siliconroundabout.ventures

## ✨ Key Features

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
- **Table**: "Startups"
- **View**: "Portfolio"

The integration includes:
- Dynamic field mapping for flexibility
- Fallback to mock data if API is not available
- Error handling for API connection issues
- Fund statistics calculation from raw data

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
- Industry and Stage distribution

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

The site will be available at http://localhost:8000

## 🔄 Environment Configuration

The project uses environment variables for API configuration:

- `AIRTABLE_API_KEY`: Your Airtable API authentication key
- `AIRTABLE_BASE_ID`: The specific Airtable base identifier

These variables are managed in the `.env.development` file (not committed to version control).

## 🏗️ Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── common/      # Layout, navigation, etc.
│   ├── dashboard/   # Dashboard-specific components
│   └── ui/          # Basic UI elements
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── images/          # Static images
├── pages/           # Gatsby pages
├── services/        # API and data services
└── styles/          # Global styles
```

## 📦 Deployment

The project is deployed using Lovable:

1. Open [Lovable Project](https://lovable.dev/projects/f06d8893-6918-4f22-bd2b-f6c1a738717c)
2. Click on Share -> Publish
3. For custom domains, navigate to Project > Settings > Domains

## 📝 Contributing

To contribute to the project:

1. Clone the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚧 TODO

### Refactoring
- [ ] Reorganize project structure for better code organization
  - [ ] Standardize directory naming conventions
  - [ ] Create dedicated directories for page-specific components
  - [ ] Separate layouts from common components
- [ ] Implement standardized component patterns
  - [ ] Create compound components for related UI elements
  - [ ] Use React Context for state sharing rather than prop drilling
  - [ ] Implement proper memoization for expensive calculations
- [ ] Create reusable UI components for common patterns
  - [ ] Build a `DataCard` base component
  - [ ] Create a standardized `StatsDisplay` component
  - [ ] Implement a reusable filtering system
- [ ] Apply consistent error handling throughout the application
  - [ ] Wrap all data-fetching components in error boundaries
  - [ ] Create standardized error display components
  - [ ] Implement graceful degradation for failed API calls
- [ ] Add comprehensive comments and documentation

### Improving Airtable Import Data Flow
- [ ] Centralize Airtable data fetching
  - [ ] Create a dedicated `AirtableDataProvider` component
  - [ ] Implement custom hooks for data access
  - [ ] Standardize GraphQL queries
- [ ] Implement robust error handling for API failures
  - [ ] Add retry mechanisms
  - [ ] Create graceful fallbacks to mock data
- [ ] Create better data transformation utilities
  - [ ] Implement a standard `transformAirtableRecord` utility
  - [ ] Build a `sanitizeCompanyData` function for consistent data cleaning
  - [ ] Create a `calculatePortfolioStats` utility for consistent statistics
- [ ] Improve type safety for Airtable data
  - [ ] Define strict TypeScript interfaces for all data structures
  - [ ] Implement runtime type checking
- [ ] Optimize build-time data processing
  - [ ] Reduce duplicate data fetching
  - [ ] Implement caching strategies
- [ ] Add incremental builds for content updates

### Fixing RSS Blog Display
- [ ] Implement proper RSS feed parsing
  - [ ] Handle missing or malformed content
  - [ ] Sanitize HTML from external sources
- [ ] Add caching for external feed data
  - [ ] Implement server-side caching
  - [ ] Add fallback content for failed fetches
- [ ] Create fallback UI for failed feed fetches
  - [ ] Design placeholder components
  - [ ] Show meaningful error messages
- [ ] Improve the styling of blog post previews
  - [ ] Create consistent card layouts
  - [ ] Optimize image display
- [ ] Add pagination for blog posts
  - [ ] Implement lazy loading
  - [ ] Create page navigation controls
- [ ] Implement category filtering for blog content

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
2. **Table**: "Startups"
3. **View**: "Portfolio"

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

- `common/`: Layout, navigation, and shared components
- `dashboard/`: Data visualization and metrics displays
- `ui/`: Basic interface elements built with shadcn-ui

Extend these components by following the established patterns and TypeScript interfaces.

## 📄 License

This project is licensed under the MIT License with Attribution Requirement - see the [LICENSE](./LICENSE) file for details.

In short, you are free to use, modify, and distribute the code, but must include attribution to Silicon Roundabout Ventures in your project, either in the UI, documentation, or website footer.

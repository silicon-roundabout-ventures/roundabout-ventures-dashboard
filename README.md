# Silicon Roundabout Ventures Dashboard

![Silicon Roundabout Ventures](./src/images/srv_logo_dash.png)

A modern, data-driven dashboard for Silicon Roundabout Ventures, a Community-Driven VC firm backing Deep Tech founders with extreme conviction at pre-seed and seed stages.

## 📋 Project Overview

The Silicon Roundabout Ventures Dashboard is a Gatsby-based web application that provides a professional, responsive interface for the venture capital firm. It features dynamic data integration with Airtable, allowing for real-time updates of portfolio companies and fund statistics.

### 🚀 Deployment URL

**URL**: https://siliconroundabout.ventures

## ✨ Key Features

- **Modern UI Design**: Sleek dark theme with code editor-inspired aesthetics
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Dynamic Portfolio**: Real-time data fetching from Airtable
- **Fund Statistics Dashboard**: Visualizations of key fund metrics
- **Application Forms**: Integrated forms for startups and investors
- **Blog Integration**: Connected to Substack for Building in Public updates
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

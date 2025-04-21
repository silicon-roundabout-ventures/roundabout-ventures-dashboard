# Codebase Overview

## Repository Structure

```
roundabout-ventures-dashboard/
├── .env.example             # Example env vars
├── .env.development         # Dev env vars
├── babelrc (.babelrc)       # Babel config
├── gatsby-config.js         # Gatsby site config
├── gatsby-node.js           # Gatsby Node APIs
├── gatsby-browser.js        # Browser APIs
├── gatsby-ssr.js            # SSR APIs
├── netlify.toml             # Netlify deployment config
├── windsurf_deployment.yaml # Lovable platform config
├── package.json             # npm scripts & dependencies
├── tailwind.config.ts       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── src/                     # Source code
│   ├── pages/               # Gatsby pages → routes
│   ├── components/          # Reusable UI & layout
│   │   ├── core/            # Layout, Section, Hero, Container
│   │   ├── ui/              # Primitives: Button, Card, Slider, etc.
│   │   └── sections/        # Page sections: DashboardOverview, etc.
│   ├── hooks/               # Custom React Query hooks
│   ├── services/            # API clients (e.g. Airtable)
│   ├── utils/               # Helper functions
│   ├── styles/              # Global styles, utilities
│   └── images/              # Static or imported images
├── public/                  # Built static files (auto-generated)
├── static/                  # Static assets served at root
└── README.md                # Project readme
```

## Key Dependencies

- **Framework**: `gatsby` (^5.x), `react` (^18.x), `react-dom`
- **Data & API**:
  - `gatsby-source-airtable` (build-time GraphQL)
  - `airtable` (client SDK)
  - `@tanstack/react-query` (client caching)
  - Custom hooks in `src/hooks/`
- **UI & Styling**:
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `@radix-ui/react-*` (Accordion, Dialog, Tooltip, etc.)
  - `lucide-react` (icons)
  - `clsx`, `class-variance-authority`, `tailwind-merge`
  - `recharts` (charts)
  - `typed.js`, `react-type-animation`, `embla-carousel-react`
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Utilities**: `date-fns`, `dotenv`, `vaul`, `sonner` (toasts)

## Internal Linking & Data Flow

1. **Gatsby Pages (`src/pages/`)**
   - Each `.tsx` under `pages/` auto-generates a route.
   - Pages import layout/components from `components/core` & `components/ui`.
   - Static images via `useStaticQuery` GraphQL (Gatsby Image)

2. **Layout & Sections**
   - `Layout` wraps pages, pulls site metadata via GraphQL.
   - `Section`, `Hero`, `Container` build page structure.
   - Section-level components live under `components/sections/`.

3. **UI Primitives**
   - `Button`, `GlassCard`, `CodeBlock`, `ImageSlider`, `ParticleBackground`, etc.
   - Located in `components/ui/`

4. **Data Services & Hooks**
   - `src/services/airtable.ts`: configures Airtable client and helper functions.
   - `src/hooks/`: wraps API calls in React Query hooks (`usePortfolio`, etc.).
   - Client-side data fetching via React Query; build-time sourcing via `gatsby-source-airtable`.

5. **Styles**
   - Global Tailwind CSS config in `tailwind.config.ts`.
   - Utility classes + Radix UI with shadcn patterns.

6. **Deployment**
   - Netlify adapter (`gatsby-adapter-netlify`) for SSR compatibility.
   - Config in `netlify.toml` and `windsurf_deployment.yaml` for Lovable.

---
*Generated on 2025-04-21*

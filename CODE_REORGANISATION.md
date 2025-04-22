# Codebase Overview from main

## Repository Structure

```
roundabout-ventures-dashboard/
├── .env.example            # Example env vars
├── .env.development        # Dev env vars
├── .babelrc                # Babel config
├── jsconfig.json / tsconfig.json  # JS/TS configs
├── gatsby-config.js        # Gatsby site & plugin config
├── gatsby-node.js          # Node APIs (custom page creation)
├── gatsby-browser.js       # Browser APIs
├── gatsby-ssr.js           # SSR APIs
├── netlify/                # Netlify functions & redirects
├── netlify.toml            # Netlify build settings
├── package.json            # npm scripts & dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.ts      # TailwindCSS config
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── about/          # About page components
│   │   ├── community/      # Community page components
│   │   ├── dashboard/      # Dashboard widgets & layout
│   │   ├── home/           # Home page components
│   │   ├── common/         # Shared components (buttons, cards)
│   │   ├── icons/          # SVG/icon components
│   │   └── ui/             # UI primitives (Modal, Tooltip, etc.)
│   ├── config/             # App configuration & constants
│   ├── lib/                # GraphQL fragments, utility wrappers
│   ├── hooks/              # Custom React hooks (data fetching)
│   ├── images/             # Static and imported images
│   ├── pages/              # Gatsby page components → routes
│   ├── services/           # API clients (Airtable, etc.)
│   ├── styles/             # Global styles & Tailwind overrides
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── static/                 # Static assets served at root
├── public/                 # Built files (auto-generated)
└── README.md               # Project readme
```

## Key Dependencies

- **Framework & Rendering**: `gatsby`, `react`, `react-dom`
- **Theming**: `next-themes`
- **Data & API**:
  - `gatsby-source-airtable`, `gatsby-source-filesystem`
  - `airtable` client SDK
  - `@tanstack/react-query` for client-side caching
- **UI & Styles**:
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `@radix-ui/react-*` (accordion, dialog, tooltip, etc.)
  - `lucide-react` (icons)
  - `clsx`, `class-variance-authority`, `tailwind-merge`
  - `tailwindcss-animate`
  - `recharts` (charts)
  - `typed.js`, `react-type-animation`, `embla-carousel-react` (animations/carousels)
- **Forms & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **Utilities**: `date-fns`, `dotenv`, `vaul`, `sonner`, `cmdk`, `input-otp`

## Internal Linking & Data Flow

1. **Pages** (`src/pages/`):
   - Auto-generated routes map to page components.
   - Data via GraphQL queries for static data and React Query hooks for runtime fetch.
2. **Components**:
   - Domain-specific groupings (`about`, `community`, `dashboard`, `home`).
   - Shared/common and low-level UI primitives under `common/` and `ui/`.
3. **Config & Lib**:
   - `config/` holds constants (API keys, base URLs).
   - `lib/` defines GraphQL fragments, helper wrappers for queries.
4. **Hooks & Services**:
   - `hooks/` provide React Query wrappers (`usePortfolio`, etc.).
   - `services/` exports API client instances (Airtable).
5. **Types & Utils**:
   - `types/` centralize TypeScript interfaces/models.
   - `utils/` utility functions (formatters, mappers).
6. **Styles & Theming**:
   - Global Tailwind CSS setup in `tailwind.config.ts`.
   - Theme management via `next-themes` and CSS variables.

---
*Generated on 2025-04-21*

---

# Codebase Overview from refactor/code-reorganization branch

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
---
title: "Building an Interactive, Live & Transparent VC Website with AI, React & Gatsby"
description: "A step-by-step guide to rebuilding our VC firm's public site in the open, leveraging AI assistance, Gatsby, Airtable, and Windsurf for continuous deployment."
tags:
  - GatsbyJS
  - React
  - TypeScript
  - AI
  - Netlify
  - Airtable
  - OpenSource
published: false
cover_image: "https://your-cdn.com/assets/cover.png"
---

*April 29, 2025 • by Francesco Perticarari (@fpert)*

## 🚀 Why We Rebuilt Our VC Site in Public

As a community-driven deeptech VC, we wanted more than a static brochure. We needed a _live dashboard_ of our investments, a transparent feed of progress, and an open-source codebase so founders, investors, and LPs could follow along.

Our journey:

1. **Inspiration:** We loved the design of our old site and apps, but they were closed—and frankly, outdated.
2. **Tools:** VS Code + GitHub Copilot, Windsurf for continuous deploy, Netlify Dev for local testing.
3. **Framework:** Gatsby + TypeScript + Tailwind for fast builds and strong type safety.
4. **Data:** Airtable as our CMS: schemas centralised in `src/config/airtableConfig.ts`, and normalized in `src/services/AirtableService.tsx`.

## 🛠️ Setting Up the Stack

### 1. Project Scaffold

- `gatsby new roundabout-dashboard`
- Add `gatsby-plugin-image`, `gatsby-transformer-sharp`, `gatsby-plugin-sharp`, `gatsby-source-filesystem`.
- Install `gatsby-source-airtable`, TypeScript, and Tailwind.

```bash
npm install gatsby-source-airtable gatsby-plugin-image gatsby-transformer-sharp gatsby-plugin-sharp tailwindcss typescript
```

### 2. Environment & Config

- Create `.env.development`:
  ```env
  AIRTABLE_API_KEY=your_key_here
  AIRTABLE_BASE_ID=appXXXXXXX
  ```

- In `gatsby-config.js`, wire up Airtable plugin:

```js
// gatsby-config.js
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY.trim(),
        tables: [{
          baseId: process.env.AIRTABLE_BASE_ID.trim(),
          tableName: `Startups`,
          tableView: `Portfolio_websiteFeed`,
          mapping: { Logo: 'fileNode', Photo: 'fileNode' },
        }],
      },
    },
    // ...other plugins
  ],
};
```

### 3. Centralising Fields & Types

```ts
// src/config/airtableConfig.ts
export const FIELDS = {
  PORTFOLIO: {
    NAME: 'Deal_Name',
    LOGO: 'Logo',
    PHOTO: 'Photo',
    SUMMARY: 'One_Line_Summary',
  }
};
export interface PortfolioFields extends Record<string,string> {}
```

### 4. Normalisation Service

```tsx
// src/services/AirtableService.tsx
export const normalizePortfolioCompany = (record) => ({
  id: record.id,
  name: record.data.Deal_Name || '',
  logo: record.data.Logo?.localFiles[0]?.publicURL || '',
});

export function usePortfolioCompanies() {
  const data = useStaticQuery(graphql`
    query { allAirtable { nodes { data { Deal_Name Logo { localFiles { publicURL } } } } } }
  `);
  return data.allAirtable.nodes.map(normalizePortfolioCompany);
}
```

## 🧱 Refactoring Airtable Data Fetch to Build Time

To ensure zero data leakage and optimal performance, we moved all Airtable data sourcing to build time:

1. **gatsby-config.js**: Configure `gatsby-source-airtable` for the `Startups` table and `Portfolio_websiteFeed` view.
2. **gatsby-node.js** (`createPages`):
   - Run a GraphQL query for all Airtable `Startups` nodes.
   - **Normalize** each record into a `company` object with fields: `id`, `name`, `logo`, `sectors`, etc.
   - **calculatePortfolioStats**: Sum tickets, valuations, and filter last-12-month data.
   - **sanitizeStealth** helper: After stats calculation, map over companies and replace non-announced ones with a stealth placeholder (🔒 Stealth).
   - **createPage**: Emit `/portfolio/` page, passing `{ companies: sanitizedCompanies, portfolioStats }` via `pageContext`.

```js
// gatsby-node.js excerpt
const nodes = result.data.allAirtable.nodes;
const rawCompanies = nodes.map(normalizeFn);
const portfolioStats = calculatePortfolioStats(nodes);
const sanitizedCompanies = rawCompanies.map(sanitizeStealth);
createPage({
  path: '/portfolio/',
  component: resolve(__dirname, 'src/templates/portfolio.tsx'),
  context: { companies: sanitizedCompanies, portfolioStats }
});
```

## 📊 Memoizing Chart & Filter Data

In our **`src/templates/portfolio.tsx`**, we consume `pageContext.companies` and use React’s `useMemo` to derive:

- `sectorData`, `stageData`, `techData`, `hqData` for charts
- Filter arrays (`announced`, `stealth`, or by sector)

```tsx
const sectorData = useMemo(() => {
  const counts = {};
  companies.forEach(c => c.sectors?.forEach(s => counts[s] = (counts[s]||0) + 1));
  return Object.entries(counts).map(([name,value]) => ({ name, value }));
}, [companies]);
```

This avoids recalculations on every render and keeps the UI snappy.

## 📦 Deprecating Client-Side Services

We removed the old `AirtableService.tsx` hook to prevent runtime GraphQL leaks:

- Renamed to `_AirtableService.deprecated.tsx` in `src/services`
- Deleted `usePortfolioChartData` and `usePortfolioStatistics` hooks
- All data processing now lives in build-time code (gatsby-node)

## 🔀 Merging Branch to Main

Workflow to merge your feature branch while preserving its history:

```bash
# On your feature branch:
git add .
git commit -m "Refactor: move Airtable logic to build time, add stealth sanitisation"
# Merge into main using strategy for feature-first:
git checkout main
git merge <feature-branch> --no-ff -m "Merge feature: build-time data fetch refactor"
git push origin main
```

## 🚀 Deployment & CI/CD

- **Windsurf**: Continuous deploy from `main` branch.
- **Netlify**: Uses `GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true` for incremental builds.

## 🎨 Building the UI

- **CircularImage** component to render community and team photos:
  ```tsx
  <CircularImage
    image={data.communityImage1.childImageSharp.gatsbyImageData}
    alt="Community pitch session"
    size={180}
  />
  ```
- **Team page** with `useStaticQuery` to load member images.
- **Index page** slider background via `ImageSlider` and live feed via our API route.

## 🤖 Leveraging AI—Wisely

Copilot and Windsurf accelerated initial code and CI/CD setup. **Beware blind acceptance**:

- Always review AI suggestions for security and performance.
- Use AI to scaffold, not to ship unchecked.

## 🚧 Challenges & Lessons

- **GraphQL field mismatches**: removed custom schema, let Gatsby infer.
- **Image loading breaks**: fixed by consistent `relativePath` and `childImageSharp` checks.
- **Rate limits**: set `concurrency: 1` in source plugin on Netlify.
- **Type safety**: embraced TypeScript across services and hooks.

## 🌱 Building in Public

- Live Netlify Dev at `http://localhost:8000`
- Netlify functions under `netlify/functions`
- Open repo: [silicon-roundabout-ventures/roundabout-ventures-dashboard](https://github.com/silicon-roundabout-ventures/roundabout-ventures-dashboard)

### Coming Next

- Real-time blog feed mirroring LP updates (redacted for privacy)
- Interactive founder dashboards
- Co-investment leaderboards

## 🎉 Final Thoughts

By moving all data sourcing and sanitisation to build time, we:

- **Eliminate** client-side GraphQL queries (security)
- **Improve** performance (no runtime fetch)
- **Guarantee** consistent stats unaffected by stealth filtering

Hope this detailed tutorial helps you build your own live, transparent VC dashboard! Share feedback or contributions on the GitHub repo.

---

> _Originally published April 29, 2025 • Updated May 7, 2025 • by Francesco Perticarari (@fpert)_

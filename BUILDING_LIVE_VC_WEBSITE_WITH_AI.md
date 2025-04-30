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

---

> _This post is part of our #buildinpublic series. Feedback welcome!_

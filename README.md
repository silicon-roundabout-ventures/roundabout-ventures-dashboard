# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f06d8893-6918-4f22-bd2b-f6c1a738717c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f06d8893-6918-4f22-bd2b-f6c1a738717c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f06d8893-6918-4f22-bd2b-f6c1a738717c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Roundabout Ventures Dashboard

A Gatsby-based website for Roundabout Ventures, a Community-Driven VC firm backing Deep Tech and Big Data startups.

## Overview

This project was migrated from a Vite/React setup to Gatsby to take advantage of Gatsby's performance optimizations, SEO benefits, and plugin ecosystem.

## Features

- Modern design with a dark theme
- Responsive layout
- Optimized for performance with Gatsby
- SEO-friendly structure

## Technologies

- **Gatsby** - React-based framework for fast websites
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **React Query** - Data fetching library

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run develop
```

### Available Scripts

- `npm run develop` - Start the development server
- `npm run build` - Build the production site
- `npm run serve` - Serve the production build locally
- `npm run clean` - Clean the Gatsby cache

## Project Structure

```
/
├── src/
│   ├── components/     # Reusable components
│   ├── images/         # Static images
│   ├── pages/          # Page components (auto-routed by Gatsby)
│   ├── services/       # API and service logic
│   ├── types/          # TypeScript type definitions
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── static/             # Static assets copied to public directory
├── gatsby-config.js    # Gatsby configuration
├── gatsby-browser.js   # Gatsby browser APIs
├── gatsby-ssr.js       # Gatsby server-side rendering APIs
├── gatsby-node.js      # Gatsby Node.js APIs
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Migration to Gatsby

This project was successfully migrated from Vite/React to Gatsby. For details on the migration process, see [GATSBY-MIGRATION.md](./GATSBY-MIGRATION.md).

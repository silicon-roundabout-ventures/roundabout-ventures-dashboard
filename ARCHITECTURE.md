# System Architecture & Data Flow

## Portfolio Dashboard Overview

This document outlines the data architecture for the Multi-Fund Portfolio Dashboard, specifically how Gatsby sources, processes, and displays data from Airtable.

### 1. Data Source (Airtable)
The system sources data from two Airtable tables:
*   **Startups**: Contains investment data (Deal Name, Sector, Investment Date, etc.).
    *   **Key Field**: `Fund_numeral`. This is a Lookup Field returning an Array of Strings (e.g., `["Fund I"]`).
*   **SRV Funds**: Contains fund metadata (Name, Status).
    *   **Key Field**: `Numeral`. This is a Single Line Text field (e.g., `"Fund I"`).

### 2. Data Processing (`gatsby-node.js`)
Gatsby fetches data at build time. Key transformation steps:

#### A. Schema Configuration
To resolve the type mismatch between the Lookup Array and Gatsby's expectation, we explicitly define the schema:
```graphql
type AirtableData {
  Fund_numeral: [String]  # Correctly models Airtable Lookup
  Numeral: String         # Source of truth for Fund Name
}
```

#### B. Normalization Helper
A helper function `normalizeAirtableField` converts the Lookup Array to a simple string for matching:
```javascript
// Input: ["Fund I"] -> Output: "Fund I"
function normalizeAirtableField(val) {
  return Array.isArray(val) ? val[0] : val;
}
```

#### C. Data Mapping
1.  **Funds**: Mapped from the `SRV Funds` table.
2.  **Companies**: Mapped from the `Startups` table.
3.  **Stats Calculation**: The server calculates aggregate stats (All Funds) and per-fund stats by filtering companies where `normalize(Startup.Fund_numeral) === Fund.Numeral`.

### 3. Frontend Architecture (`portfolio.tsx`)
The UI is decoupled to provide flexible filtering:

*   **Fund Switcher (Top)**: Controls the "View Context".
    *   **Action**: Selects a Fund ID.
    *   **Updates**: Statistics Section and Charts Section.
    *   **Data Source**: Uses pre-calculated `perFundStats` from `pageContext`.
    *   **Placeholder**: If a fund has no data, shows a "Launching Soon" card instead of empty charts.
*   **Company List (Bottom)**: Independent Component.
    *   **Visibility**: Always visible, regardless of the Top Switcher.
    *   **Filtering**: Has its own local filter (including a "By Fund" option) to sort companies.

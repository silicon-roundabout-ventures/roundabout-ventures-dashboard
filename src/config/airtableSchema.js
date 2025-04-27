// src/config/airtableSchema.js
// Static schema for gatsby-node.js and other build-time operations
// Must be plain JavaScript, not TypeScript

// Table names
exports.TABLES = {
  PORTFOLIO: 'Startups',
  FUNDS: 'SRV Funds'
};

// Field names
exports.FIELDS = {
  PORTFOLIO: {
    ID: 'id',
    NAME: 'Deal_Name',
    DESCRIPTION: 'Summary',
    ONE_LINER: 'One_Line_Summary',
    LOGO: 'Logo',
    PHOTO: 'Photo',
    WEBSITE: 'Company',
    INDUSTRY: 'Sector',
    STAGE: 'Stage',
    INVESTMENT_DATE: 'Close_Date',
    ANNOUNCED: 'Announced',
    FUND: 'Fund_numeral',
    DEAL_VALUE: 'Deal_Value',
    TOTAL_INVESTED: 'Total_Invested',
    ENTRY_VALUATION: 'Entry_Valuation',
    COMPANY_DOMAIN: 'domain__from_Company_',
  },
  FUNDS: {
    // Add fund fields here
  }
};

// GraphQL SDL dynamically generated from FIELDS.PORTFOLIO
exports.AIRTABLE_TYPEDEFS = (() => {
  const portfolioFields = Object.values(exports.FIELDS.PORTFOLIO);
  const numericFields = ['Deal_Value', 'NET_MOIC', 'Total_Invested'];
  // Fields representing arrays of strings
  const listFields = ['Company', 'domain__from_Company_', 'Sector', 'Fund_numeral'];
  const fieldLines = portfolioFields.map(name => {
    const type = numericFields.includes(name)
      ? 'Float'
      : listFields.includes(name)
      ? '[String]'
      : 'String';
    return `  ${name}: ${type}`;
  });
  const typeDefs = `
  type AirtableData {
${fieldLines.join('\n')}
    Logo: AirtableDataLogo
    Photo: AirtableDataPhoto
  }

  type Airtable implements Node @dontInfer {
    data: AirtableData
    table: String
    recordId: String
  }

  type AirtableDataLogo { localFiles: [File] @link }
  type AirtableDataPhoto { localFiles: [File] @link }
`;
  return typeDefs;
})();

// Static GraphQL queries for gatsby-node.js
exports.PORTFOLIO_PAGE_QUERY = `
  query {
    allAirtable(filter: {table: {eq: "${exports.TABLES.PORTFOLIO}"}}) {
      nodes {
        id
        data {
          ${Object.values(exports.FIELDS.PORTFOLIO).join('\n          ')}
        }
      }
    }
  }
`;

exports.FUNDS_PAGE_QUERY = `
  query {
    allAirtable(filter: {table: {eq: "${exports.TABLES.FUNDS}"}}) {
      nodes {
        id
        # Add required fields here
      }
    }
  }
`;

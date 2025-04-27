// Mock portfolio data for when Airtable is not available
// Raw portfolio companies data
const mockPortfolioCompanies = [
  {
    id: 'rec123456',
    name: 'Example Tech',
    description: 'A revolutionary tech company focused on AI solutions.',
    oneLiner: 'AI for everyone',
    logo: 'https://via.placeholder.com/150',
    photo: 'https://via.placeholder.com/500',
    website: 'example-tech.com',
    industry: ['Artificial Intelligence', 'SaaS'],
    stage: 'Series A',
    investmentDate: '2023-05-15',
    announced: true,
    fund: 'Fund II',
    dealValue: 5000000,
    netMoic: 2.3,
    totalInvested: 1000000,
    entryValuation: '20M',
  },
  {
    id: 'rec789012',
    name: 'Green Solutions',
    description: 'Sustainable energy solutions for businesses.',
    oneLiner: 'Making energy sustainable',
    logo: 'https://via.placeholder.com/150',
    website: 'greensolutions.co',
    industry: ['Clean Energy', 'Sustainability'],
    stage: 'Seed',
    investmentDate: '2024-01-10',
    announced: true,
    fund: 'Fund III',
    totalInvested: 500000,
  },
  // Add more mock companies here if needed
];

// Raw fund statistics
const mockFundStatistics = {
  totalInvestments: 25000000,
  totalCompanies: 15,
  averageInvestment: 1666667,
  medianValuation: 18000000,
  investmentsLast12Months: 8000000,
  companiesLast12Months: 5,
};

// Helper functions
function getMockPortfolioCompanies() {
  return mockPortfolioCompanies;
}

function getMockFundStatistics() {
  return mockFundStatistics;
}

module.exports = {
  mockPortfolioCompanies,
  mockFundStatistics,
  getMockPortfolioCompanies,
  getMockFundStatistics,
};

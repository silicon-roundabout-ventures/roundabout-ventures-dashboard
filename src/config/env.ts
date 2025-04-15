/**
 * This file provides a central place to access environment variables
 * To use this in development, create a .env.development file in the root directory with:
 * 
 * AIRTABLE_API_KEY=your_api_key_here
 * AIRTABLE_BASE_ID=your_base_id_here
 */

interface EnvConfig {
  AIRTABLE_API_KEY: string | undefined;
  AIRTABLE_BASE_ID: string | undefined;
  IS_DEVELOPMENT: boolean;
}

// Get environment variables with fallbacks
const env: EnvConfig = {
  // Try both versions of variable names for maximum compatibility
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY || process.env.GATSBY_AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID || process.env.GATSBY_AIRTABLE_BASE_ID,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};

// Log the environment status in development
if (env.IS_DEVELOPMENT) {
  console.log('=== ENVIRONMENT CONFIGURATION ===');
  console.log('API Key available:', !!env.AIRTABLE_API_KEY);
  console.log('Base ID available:', !!env.AIRTABLE_BASE_ID);
  console.log('================================');
}

// Provide helper method to check if Airtable is configured
export const isAirtableConfigured = (): boolean => {
  return Boolean(env.AIRTABLE_API_KEY && env.AIRTABLE_BASE_ID);
};

export default env;

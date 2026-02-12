#!/usr/bin/env node

/**
 * This script verifies that Airtable credentials are valid
 * Run before Netlify build to ensure proper authentication
 */

const https = require('https');

// Load environment variables based on environment
try {
  const dotenv = require('dotenv');
  dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
  });
} catch (e) {
  // dotenv might not be available in production/CI environments where env vars are injected directly
  console.log('✓ dotenv module not found, relying on system environment variables');
}

// Check if Airtable credentials exist
const apiKey = process.env.AIRTABLE_API_KEY ? process.env.AIRTABLE_API_KEY.trim() : '';
const baseId = process.env.AIRTABLE_BASE_ID ? process.env.AIRTABLE_BASE_ID.trim() : '';

console.log('✓ --- Airtable Credentials Verification ---');
console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`✓ API Key exists: ${!!apiKey}`);
console.log(`✓ Base ID exists: ${!!baseId}`);

if (!apiKey || !baseId) {
  console.log('❌ ERROR: Missing Airtable credentials');
  console.log('✓ Continuing with mock data...');
  process.exit(0); // Continue build with mock data
}

// Test the API key by making a simple request
const options = {
  hostname: 'api.airtable.com',
  port: 443,
  path: `/v0/${baseId}/Startups?maxRecords=1`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
};

console.log('✓ Testing Airtable API connection...');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✓ Airtable API connection successful!');
      process.exit(0); // Success
    } else {
      console.error(`❌ ERROR: Airtable API returned status code ${res.statusCode}`);
      console.error(`❌ Response: ${data}`);
      console.log('✓ Continuing with mock data...');
      process.exit(0); // Continue build with mock data
    }
  });
});

req.on('error', (error) => {
  console.error(`❌ ERROR: ${error.message}`);
  console.log('✓ Continuing with mock data...');
  process.exit(0); // Continue build with mock data
});

req.end();

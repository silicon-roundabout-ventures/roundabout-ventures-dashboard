// Simple script to test Airtable API connection
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.development' });

// Set up Airtable
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

console.log('=== AIRTABLE CONNECTION TEST ===');
console.log('API Key exists:', !!apiKey);
console.log('Base ID exists:', !!baseId);
console.log('Base ID configured:', baseId ? 'Yes' : 'No');

if (!apiKey || !baseId) {
  console.error('Missing Airtable credentials in .env.development file');
  process.exit(1);
}

// Configure Airtable
Airtable.configure({ apiKey });
const base = Airtable.base(baseId);

// Try the Startups table specifically as confirmed by the user
const possibleTables = ['Startups'];

// Helper function to fetch from a specific table
async function fetchFromTable(tableName) {
  try {
    console.log(`\nAttempting to fetch from table: ${tableName}`);
    
    // Use the 'Portfolio_websiteFeed' view as specified by the user
    console.log(`Using 'Portfolio_websiteFeed' view as specified`);
    const records = await base(tableName).select({
      maxRecords: 100,
      view: 'Portfolio_websiteFeed'
    }).all();
    
    console.log(`✅ Success! Found ${records.length} records in table '${tableName}'`);
    
    if (records.length > 0) {
      console.log('First record fields:', Object.keys(records[0].fields).join(', '));
      
      // Format and display company information
      console.log(`\n=== COMPANIES FROM ${tableName} ===`);
      records.forEach((record, index) => {
        const fields = record.fields;
        
        // Try various field names for company name
        const name = 
          fields['Deal Name'] || 
          fields['Company Name'] || 
          fields['Name'] || 
          `Unnamed Company ${index + 1}`;
        
        // Try various field names for description
        const description = 
          fields['Summary'] || 
          fields['One Liner'] ||
          fields['Description'] ||
          'No description available';
        
        // Try different field names for announced status
        const isAnnounced = 
          fields['Announced'] === 'Yes' || 
          fields['Announced'] === true || 
          fields['Public'] === 'Yes' || 
          fields['Public'] === true || 
          (fields['Status'] && fields['Status'].includes('Public'));
        
        console.log(`\n${index + 1}. ${name}`);
        console.log(`   Description: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`);
        console.log(`   Stealth: ${!isAnnounced ? 'Yes' : 'No'}`);
      });
    }
    
    return records;
  } catch (error) {
    console.error(`❌ Error fetching from table '${tableName}':`, error.message);
    return [];
  }
}

// Main function to try all possible tables
async function testAirtableConnection() {
  console.log('\nTesting connection to Airtable...');
  
  let foundData = false;
  
  for (const tableName of possibleTables) {
    const records = await fetchFromTable(tableName);
    if (records.length > 0) {
      foundData = true;
    }
  }
  
  if (!foundData) {
    console.log('\n❌ No data found in any of the expected tables.');
    console.log('Available tables might have different names. Try listing all tables:');
    
    try {
      // This is a workaround to list tables - not officially supported by Airtable API
      const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
        headers: {
          'Authorization': `Bearer ${apiKey}` // API key from environment variables
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('\nAvailable tables:');
        data.tables.forEach(table => {
          console.log(`- ${table.name}`);
        });
      } else {
        console.log('Could not list tables, status:', response.status);
      }
    } catch (error) {
      console.error('Error listing tables:', error.message);
    }
  }
}

// Run the test
testAirtableConnection();

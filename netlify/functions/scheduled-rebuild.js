// Netlify function to trigger daily rebuild
// This ensures your Airtable data stays fresh without manual intervention

const { schedule } = require('@netlify/functions');

// Function runs daily to automatically refresh site data from Airtable
const handler = async (event) => {
  try {
    // Verify that the deploy hook URL is configured
    const deployHookUrl = process.env.DEPLOY_HOOK_URL;
    if (!deployHookUrl) {
      console.log('Error: DEPLOY_HOOK_URL environment variable is not set');
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          message: 'Missing DEPLOY_HOOK_URL environment variable' 
        })
      };
    }

    // Trigger the Netlify deploy hook to start a new build
    console.log(`Triggering rebuild via deploy hook: ${new Date().toISOString()}`);
    const response = await fetch(deployHookUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the deploy hook was successfully triggered
    if (response.ok) {
      console.log('Rebuild successfully triggered');
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Rebuild successfully triggered',
          timestamp: new Date().toISOString()
        })
      };
    } else {
      // Log error details if the deploy hook failed
      console.error('Failed to trigger rebuild:', await response.text());
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          message: 'Failed to trigger rebuild',
          status: response.status
        })
      };
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error triggering rebuild:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};

// Schedule to run once daily at midnight
// This keeps your Airtable data synchronized without paid webhook services
module.exports.handler = schedule('0 0 * * *', handler);

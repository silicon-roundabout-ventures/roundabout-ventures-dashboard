// This file helps bridge the gap between ESM and CommonJS modules
// It's needed to support projects that were originally set up with ESM

require = require('esm')(module);
module.exports = require('./gatsby-node.js'); 
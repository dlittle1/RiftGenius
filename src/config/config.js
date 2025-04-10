require('dotenv').config();

module.exports = {
  RIOT_API_KEY: process.env.RIOT_API_KEY,
  DEFAULT_REGION: process.env.REGION || 'americas'
};
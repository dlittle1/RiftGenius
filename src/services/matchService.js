// src/services/matchService.js
const riotClient = require('../src/api/riotClient');

/**
 * Retrieves recent matches for a player by PUUID
 * @param {string} puuid - Player Universally Unique IDentifier
 * @param {number} count - Number of matches to retrieve (default: 10)
 * @returns {Promise<Array<string>>} Array of match IDs
 */
async function getRecentMatches(puuid, count = 10) {
  try {
    return await riotClient.getMatchIdsByPUUID(puuid, count);
  } catch (error) {
    console.error(`Error in getRecentMatches: ${error.message}`);
    return [];
  }
}

/**
 * Retrieves detailed match information by match ID
 * @param {string} matchId - Match ID
 * @returns {Promise<Object|null>} Match data if successful, null otherwise
 */
async function getMatchDetails(matchId) {
  try {
    return await riotClient.getMatchById(matchId);
  } catch (error) {
    console.error(`Error in getMatchDetails: ${error.message}`);
    return null;
  }
}

/**
 * Retrieves and processes multiple matches for a player
 * @param {string} puuid - Player Universally Unique IDentifier
 * @param {number} count - Number of matches to retrieve (default: 10)
 * @returns {Promise<Array<Object>>} Array of processed match data
 */
async function getPlayerMatchHistory(puuid, count = 10) {
  try {
    // Get match IDs
    const matchIds = await getRecentMatches(puuid, count);
    
    // Get match details for each ID
    const matchPromises = matchIds.map(id => getMatchDetails(id));
    const matches = await Promise.all(matchPromises);
    
    // Filter out null values (failed requests)
    return matches.filter(match => match !== null);
  } catch (error) {
    console.error(`Error in getPlayerMatchHistory: ${error.message}`);
    return [];
  }
}

module.exports = {
  getRecentMatches,
  getMatchDetails,
  getPlayerMatchHistory
};
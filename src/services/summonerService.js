// src/services/summonerService.js
const riotClient = require('../api/riotClient');

/**
 * Retrieves summoner data by Riot ID (gameName + tagLine)
 * @param {string} gameName - The game name portion of Riot ID
 * @param {string} tagLine - The tag line portion of Riot ID
 * @returns {Promise<Object|null>} Summoner data if successful, null otherwise
 */
async function getSummonerByRiotID(gameName, tagLine) {
  try {
    // First get the PUUID
    const puuid = await riotClient.getPUUIDFromRiotID(gameName, tagLine);
    
    if (!puuid) {
      return null;
    }
    
    // Then get the summoner data using the PUUID
    return await riotClient.getSummonerByPUUID(puuid);
  } catch (error) {
    console.error(`Error in getSummonerByRiotID: ${error.message}`);
    return null;
  }
}

module.exports = {
  getSummonerByRiotID
};
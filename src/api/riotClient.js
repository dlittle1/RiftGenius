// src/api/riotClient.js
const axios = require('axios');
const { REGIONS, ACCOUNT } = require('./endpoints');
const config = require('../config/config');

/**
 * Retrieves PUUID from a Riot ID (gameName + tagLine)
 * @param {string} gameName - The game name portion of Riot ID
 * @param {string} tagLine - The tag line portion of Riot ID
 * @param {string} region - API region (default: AMERICAS)
 * @returns {Promise<string|null>} PUUID if successful, null otherwise
 */
async function getPUUIDFromRiotID(gameName, tagLine, region = REGIONS.AMERICAS) {
  try {
    const response = await axios.get(
      ACCOUNT.GET_BY_RIOT_ID(region, gameName, tagLine),
      {
        headers: {
          'X-Riot-Token': config.RIOT_API_KEY
        }
      }
    );
    
    return response.data.puuid;
  } catch (error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.status?.message || error.message;
    
    console.error(`Error fetching PUUID (${statusCode}): ${errorMessage}`);
    return null;
  }
}

/**
 * Retrieves summoner data by PUUID
 * @param {string} puuid - Player Universally Unique IDentifier
 * @param {string} region - Game region (default from config)
 * @returns {Promise<Object|null>} Summoner data if successful, null otherwise
 */
async function getSummonerByPUUID(puuid, region = config.DEFAULT_REGION) {
  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`,
      {
        headers: {
          'X-Riot-Token': config.RIOT_API_KEY
        }
      }
    );
    
    return response.data;
  } catch (error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.status?.message || error.message;
    
    console.error(`Error fetching summoner data (${statusCode}): ${errorMessage}`);
    return null;
  }
}

/**
 * Retrieves match IDs for a player by PUUID
 * @param {string} puuid - Player Universally Unique IDentifier
 * @param {number} count - Number of matches to retrieve (default: 10)
 * @param {string} region - API region (default: AMERICAS)
 * @returns {Promise<Array<string>|null>} Array of match IDs if successful, null otherwise
 */
async function getMatchIdsByPUUID(puuid, count = 10, region = REGIONS.AMERICAS) {
  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
      {
        params: {
          count: count
        },
        headers: {
          'X-Riot-Token': config.RIOT_API_KEY
        }
      }
    );
    
    return response.data;
  } catch (error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.status?.message || error.message;
    
    console.error(`Error fetching match IDs (${statusCode}): ${errorMessage}`);
    return [];
  }
}

/**
 * Retrieves match details by match ID
 * @param {string} matchId - Match ID
 * @param {string} region - API region (default: AMERICAS)
 * @returns {Promise<Object|null>} Match data if successful, null otherwise
 */
async function getMatchById(matchId, region = REGIONS.AMERICAS) {
  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          'X-Riot-Token': config.RIOT_API_KEY
        }
      }
    );
    
    return response.data;
  } catch (error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.status?.message || error.message;
    
    console.error(`Error fetching match details (${statusCode}): ${errorMessage}`);
    return null;
  }
}

module.exports = {
  getPUUIDFromRiotID,
  getSummonerByPUUID,
  getMatchIdsByPUUID,
  getMatchById
};
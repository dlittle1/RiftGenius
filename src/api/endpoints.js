// src/api/endpoints.js
const REGIONS = {
  AMERICAS: 'americas',
  ASIA: 'asia',
  EUROPE: 'europe',
  SEA: 'sea'
};

// Game regions are different from API regions
const GAME_REGIONS = {
  BR1: 'br1',
  EUN1: 'eun1',
  EUW1: 'euw1',
  JP1: 'jp1',
  KR: 'kr',
  LA1: 'la1',
  LA2: 'la2',
  NA1: 'na1',
  OC1: 'oc1',
  TR1: 'tr1',
  RU: 'ru',
  PH2: 'ph2',
  SG2: 'sg2',
  TH2: 'th2',
  TW2: 'tw2',
  VN2: 'vn2'
};

module.exports = {
  REGIONS,
  GAME_REGIONS,
  ACCOUNT: {
    GET_BY_RIOT_ID: (region, gameName, tagLine) => 
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  },
  SUMMONER: {
    GET_BY_PUUID: (region, puuid) =>
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`
  },
  MATCH: {
    GET_BY_PUUID: (region, puuid, count = 10) =>
      `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids?count=${count}`,
    GET_MATCH_BY_ID: (region, matchId) =>
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`
  }
};
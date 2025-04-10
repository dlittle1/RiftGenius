// tests/services.test.js
const { getSummonerByRiotID } = require('../src/services/summonerService');
const riotClient = require('../src/api/riotClient');

// Mock the riotClient module
jest.mock('../src/api/riotClient');

describe('Summoner Service', () => {
  describe('getSummonerByRiotID', () => {
    it('should retrieve summoner data for a valid Riot ID', async () => {
      // Mock data
      const mockPUUID = 'test-puuid-12345';
      const mockSummonerData = {
        id: 'summoner-id-12345',
        accountId: 'account-id-12345',
        puuid: mockPUUID,
        name: 'TestSummoner',
        profileIconId: 123,
        summonerLevel: 100
      };
      
      // Setup mocks
      riotClient.getPUUIDFromRiotID.mockResolvedValueOnce(mockPUUID);
      riotClient.getSummonerByPUUID = jest.fn().mockResolvedValueOnce(mockSummonerData);
      
      // Call the function
      const result = await getSummonerByRiotID('TestUser', 'NA1');
      
      // Assertions
      expect(result).toEqual(mockSummonerData);
      expect(riotClient.getPUUIDFromRiotID).toHaveBeenCalledWith('TestUser', 'NA1');
      expect(riotClient.getSummonerByPUUID).toHaveBeenCalledWith(mockPUUID);
    });

    it('should return null when PUUID cannot be found', async () => {
      // Setup mocks
      riotClient.getPUUIDFromRiotID.mockResolvedValueOnce(null);
      
      // Call the function
      const result = await getSummonerByRiotID('NonExistentUser', 'NA1');
      
      // Assertions
      expect(result).toBeNull();
      expect(riotClient.getPUUIDFromRiotID).toHaveBeenCalledWith('NonExistentUser', 'NA1');
    });

    // Clear all mocks after each test
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
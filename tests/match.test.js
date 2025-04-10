// tests/match.test.js
const { getRecentMatches, getMatchDetails } = require('../src/services/matchService');
const riotClient = require('../src/api/riotClient');

// Mock the riotClient module
jest.mock('../src/api/riotClient');

describe('Match Service', () => {
  describe('getRecentMatches', () => {
    it('should retrieve recent matches for a valid PUUID', async () => {
      // Mock data
      const mockPUUID = 'test-puuid-12345';
      const mockMatchIds = [
        'NA1_4321123456', 
        'NA1_4321123457', 
        'NA1_4321123458'
      ];
      
      // Setup mocks
      riotClient.getMatchIdsByPUUID = jest.fn().mockResolvedValueOnce(mockMatchIds);
      
      // Call the function
      const result = await getRecentMatches(mockPUUID, 3);
      
      // Assertions
      expect(result).toEqual(mockMatchIds);
      expect(riotClient.getMatchIdsByPUUID).toHaveBeenCalledWith(mockPUUID, 3);
    });

    it('should return an empty array when there are no matches', async () => {
      // Mock data
      const mockPUUID = 'test-puuid-12345';
      
      // Setup mocks
      riotClient.getMatchIdsByPUUID = jest.fn().mockResolvedValueOnce([]);
      
      // Call the function
      const result = await getRecentMatches(mockPUUID, 5);
      
      // Assertions
      expect(result).toEqual([]);
      expect(riotClient.getMatchIdsByPUUID).toHaveBeenCalledWith(mockPUUID, 5);
    });

    // Clear all mocks after each test
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('getMatchDetails', () => {
    it('should retrieve details for a valid match ID', async () => {
      // Mock data
      const mockMatchId = 'NA1_4321123456';
      const mockMatchData = {
        metadata: {
          matchId: mockMatchId,
          participants: ['test-puuid-12345', 'test-puuid-67890']
        },
        info: {
          gameCreation: 1633232000000,
          gameDuration: 2400,
          participants: [
            {
              puuid: 'test-puuid-12345',
              championName: 'Ahri',
              kills: 10,
              deaths: 2,
              assists: 8,
              // other participant stats...
            },
            // other participants...
          ]
        }
      };
      
      // Setup mocks
      riotClient.getMatchById = jest.fn().mockResolvedValueOnce(mockMatchData);
      
      // Call the function
      const result = await getMatchDetails(mockMatchId);
      
      // Assertions
      expect(result).toEqual(mockMatchData);
      expect(riotClient.getMatchById).toHaveBeenCalledWith(mockMatchId);
    });

    it('should return null for an invalid match ID', async () => {
      // Mock data
      const mockMatchId = 'INVALID_ID';
      
      // Setup mocks
      riotClient.getMatchById = jest.fn().mockResolvedValueOnce(null);
      
      // Call the function
      const result = await getMatchDetails(mockMatchId);
      
      // Assertions
      expect(result).toBeNull();
      expect(riotClient.getMatchById).toHaveBeenCalledWith(mockMatchId);
    });
  });
});
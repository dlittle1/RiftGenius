// tests/api.test.js
const axios = require('axios');
const { getPUUIDFromRiotID } = require('../src/api/riotClient');

// Mock axios
jest.mock('axios');

describe('Riot API Client', () => {
  describe('getPUUIDFromRiotID', () => {
    // Test case: Successfully retrieve PUUID
    it('should retrieve PUUID when given valid Riot ID', async () => {
      // Mock data
      const mockResponse = {
        data: {
          puuid: 'test-puuid-12345',
          gameName: 'TestUser',
          tagLine: 'NA1'
        }
      };
      
      // Mock axios.get to return mock data
      axios.get.mockResolvedValueOnce(mockResponse);
      
      // Call the function
      const result = await getPUUIDFromRiotID('TestUser', 'NA1');
      
      // Assertions
      expect(result).toEqual('test-puuid-12345');
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // Test case: Handle error when Riot ID doesn't exist
    it('should return null when Riot ID does not exist', async () => {
      // Mock axios.get to throw an error
      const mockError = {
        response: { 
          status: 404,
          data: { status: { message: 'Data not found' } } 
        }
      };
      
      axios.get.mockRejectedValueOnce(mockError);
      
      // Call the function
      const result = await getPUUIDFromRiotID('NonExistentUser', 'NA1');
      
      // Assertions
      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    
    // After each test, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
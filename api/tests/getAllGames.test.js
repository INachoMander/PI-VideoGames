const { getAllGames, getVideoGameDb } = require('../src/controllers/getAllGames');

describe('getAllGames', () => {
    it('should return an array of games', async () => {
      const games = await getAllGames();
      expect(Array.isArray(games)).toBe(true);
    }, 10000); // Aumentar el tiempo de espera a 10000 milisegundos
  });

describe('getVideoGameDb', () => {
  it('should return an array of games from the database', async () => {
    const dbGames = await getVideoGameDb();
    expect(Array.isArray(dbGames)).toBe(true);
  });
});
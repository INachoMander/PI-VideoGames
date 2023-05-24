// Importa el módulo y la función que deseas probar
const getGenres = require('../src/controllers/getGenres');
const { Genres } = require('../src/db');
const axios = require('axios');

// Define un mock para axios.get
jest.mock('axios');

describe('getGenres', () => {
  it('should fetch genres from the API and save them to the database', async () => {
    // Define el resultado simulado de la llamada a axios.get
    const mockApiResponse = {
      data: {
        results: [
          { id: '1', name: 'Action' },
          { id: '2', name: 'Adventure' },
          // Agrega otros géneros simulados aquí
        ],
      },
    };

    // Simula la llamada a axios.get
    axios.get.mockResolvedValue(mockApiResponse);

    // Define un mock para Genres.findOrCreate
    const mockFindOrCreate = jest.fn();

    // Simula la llamada a Genres.findOrCreate
    Genres.findOrCreate = mockFindOrCreate;

    // Realiza la prueba llamando a la función
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getGenres(req, res);

    // Verifica que se haya llamado a axios.get con la URL correcta
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://api.rawg.io/api/genres?key='));

    // Verifica que se haya llamado a Genres.findOrCreate para cada género
    expect(mockFindOrCreate).toHaveBeenCalledTimes(mockApiResponse.data.results.length);

    // Verifica el estado de respuesta y el JSON devuelto
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should handle errors and send a 404 status', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getGenres(req, res);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('error');
  });
});
const { Sequelize, DataTypes } = require('sequelize');
const defineVideogameModel = require('../src/models/Videogame');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
  } = process.env;

// Crea una instancia de Sequelize y establece la configuración de la base de datos en memoria
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`);

// Define el modelo de videogame utilizando la función defineVideogameModel
defineVideogameModel(sequelize);

describe('Videogame model', () => {
  it('should define the Videogame model correctly', () => {
    // Verifica si el modelo se ha definido correctamente en sequelize.models
    expect(sequelize.models.videogame).toBeDefined();

    // Obtén el modelo definido
    const VideogameModel = sequelize.models.videogame;

    // Verifica las propiedades del modelo
    expect(VideogameModel.tableName).toBe('videogames');
    expect(VideogameModel.rawAttributes).toHaveProperty('id');
    expect(VideogameModel.rawAttributes).toHaveProperty('name');
    expect(VideogameModel.rawAttributes).toHaveProperty('description');
    expect(VideogameModel.rawAttributes).toHaveProperty('platforms');
    expect(VideogameModel.rawAttributes).toHaveProperty('background_image');
    expect(VideogameModel.rawAttributes).toHaveProperty('released');
    expect(VideogameModel.rawAttributes).toHaveProperty('rating');
    expect(VideogameModel.rawAttributes).toHaveProperty('created');
  });
});
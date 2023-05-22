require('dotenv').config();
const { Videogame } = require("../db");
const { getGames } = require("./getGames");

const getName = async (name) => {
    const juegos = await getGames();
    if (name) {
        const filtrado = juegos.filter((game) => game.name.toLowerCase().includes(name.toLowerCase())).splice(0, 15);
    
        if (filtrado.length > 0) {
            return filtrado;
        } else {
            throw new Error('No se encontró el juego con ese nombre');
        }
    } else {
        return Videogame; // Corregido: Videogame en lugar de videogame
    }
};

module.exports = { getName };

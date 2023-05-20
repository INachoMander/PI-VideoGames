const axios = require("axios")
require('dotenv').config()
const {API_KEY} = process.env
const {Videogame} = require("../db")
const { Op } = require("sequelize")
const {getGames} = require("./getGames")

const getName =async (name) => {
    const juegos = await getGames();
    if(name){
        const filtrado = juegos.filter((game)=> game.name.toLowerCase().includes(name.toLowerCase())).splice(0, 15);
    
    if(filtrado.length>0){
        return filtrado;
    } else {
        throw new Error('No se encontro el juego con ese nombre')
    }
} else {return videogame}
}

module.exports = {getName}
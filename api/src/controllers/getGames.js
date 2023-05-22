const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame} = require('../db')

const getGames = async ()=>{
    const dbGames = await Videogame.findAll();
    let url=`https://api.rawg.io/api/games?key=${API_KEY}`
    let juegos=[];
    try {
        for (let i = 0; i < 5; i++) {
            const apiGames = await axios.get(url)
            apiGames.data.results.map((game)=>{
                juegos.push({
                     id: game.id,
                    name: game.name,
                    image: game.background_image,
                    genres: game.genres?.map((gen)=> gen.name),
                    platforms: game.platforms?.map((plat)=> plat.platform.name),
                    released: game.released,
                    rating: game.rating,
                })
            })
            url= apiGames.data.next;
        }
        return juegos;
    } catch (error) {
        console.log(error);
    }
    const gameDB = dbGames.map((game)=>{return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres?.map((gen)=> gen.name),
        platforms: game.platforms?.map((platform)=> platform),
        released: game.released,
        rating: game.rating,
    }})

    const allGames = juegos.concat(gameDB)

    if (allGames){
        return allGames;
    } else {
        throw Error('Juego no encontrado')
    }
}
module.exports ={ getGames }
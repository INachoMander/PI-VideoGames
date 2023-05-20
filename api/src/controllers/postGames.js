const {Videogame} = require('../db')

const postGames = async (name, description, platforms, image, released, rating, Genres ) =>{
   try {
          if(!name || ! description || !platforms || !image || !released || !rating || !Genres){
            throw Error('Faltan datos')}
            else{
               const nuevoJuego = await Videogame.create({
               name, description, platforms, image, released, rating, Genres
              });
            }
            const newGenre = await Genres.findAll({
                where: {
                    name: Genres
                },
            });
            nuevoJuego.addGenre(newGenre);
            return (newGenre, nuevoJuego)
   } catch (error) {
    return error;
   } 
}
module.exports = {postGames};
const {Videogame} = require('../db')

const postGames = async (name, description, platforms, image, released, rating, Genres ) =>{
  try {
          if(!name || ! description || !platforms || !image || !released || !rating || !Genres){
            throw Error('Faltan datos')}
            else{
               const newGame = await Videogame.create({
               name, description, platforms, image, released, rating, Genres
              });
            }
            const newGenre = await Genres.findAll({
                where: {
                    name: Genres
                },
            });
            newGame.addGenre(newGenre);
            return (newGenre, newGame)
  } catch (error) {
    return error;
  } 
}
module.exports = {postGames};
const { Videogame, Genres } = require("../db");

const postGames = async (req, res) => {
  console.log(req.body)
  try {
    const { name, description, platforms, background_image, released, rating, genre} =
      req.body;

    if (
      !name ||
      !description ||
      !platforms ||
      !released ||
      !rating ||
      !genre
    ) {
      res.status(404).json({message:"Faltan datos"});
    } else {
      const [newGame, created]= await Videogame.findOrCreate({
        where:{name:name},
        defaults:{name,
          description,
          platforms,
          background_image: background_image || "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
          released,
          rating}
          
        },
      );
      genre.forEach(async element => {
        let genresDbFind = await Genres.findAll({where:{name : element}})

        await newGame.addGenres(genresDbFind)
      });

      if(created){
        res.status(200).json({message:"VIDEOGAME CREATED SUCCESSFULLY"})
      }else if(!created){ 
        res.status(400).json({message:"VIDEOGAME ALREADY EXISTS"})
      }

      // res.status(200).json(newGame)
    }
  } catch (error) {
    res.status(404).json({message:"ERROR EN ALGUNO DE LOS DATOS INGRESADOS"});
  }
};

module.exports = postGames;

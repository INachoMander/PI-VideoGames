require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const {getVideoGameDb} = require("../controllers/getAllGames")



const getGamesParams = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    
    if (idVideogame.length > 7 && typeof idVideogame === "string") {
      
      const videoGame = await getVideoGameDb();
      const filter = videoGame.filter((el)=>el.id === idVideogame)
      res.status(200).json(filter[0]);
      
      
    } else {
      
      const URL_BASE = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;

      const videoGameApi = await axios.get(URL_BASE);
        
      const oneGame = {
        id: videoGameApi.data.id,
        name: videoGameApi.data.name,
        description: videoGameApi.data.description,
        platforms: videoGameApi.data.platforms.map(
          (p) => p.platform.name
        ),
        background_image: videoGameApi.data.background_image,
        genres: videoGameApi.data.genres.map((g) => g.name),
        released: videoGameApi.data.released,
        rating: videoGameApi.data.rating,
      };
      // console.log(oneGame);
      res.status(200).json(oneGame)
    }
  } catch (error) {
 res.status(404).send(error.message)

  }
};

module.exports = getGamesParams;

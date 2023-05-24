require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const getVideoGameApi = async () => {
  try {
    const games = [];

    let URL_BASE = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let index = 0; index < 5; index++) {
      let pageGame = await axios.get(URL_BASE);
      pageGame.data?.results.forEach((e) => {
        games.push({
          id: e.id,
          name: e.name,
          platforms: e.platforms.map((platform) => platform.platform.name),
          background_image: e.background_image,
          released: e.released,
          rating: e.rating,
          genres: e.genres.map((g) => g.name),
          created: false,
        });
      });

      URL_BASE = pageGame.data.next;
    }

    return games;
  } catch (error) {
    console.log(error.message);
  }
};

const getVideoGameDb = async () => {
  try {
    const allGames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const dbAllGames = allGames.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rating: e.rating,
        background_image: e.background_image,
        genres: e.genres.map((e) => e.name),
        description: e.description,
        released: e.released,
        platforms: e.platforms,
        created: e.created,
      };
    });

    return dbAllGames;
  } catch (error) {
    console.log(error);
  }
};

//concatenamos
const getAllGames = () => {
  const allInfo = Promise.all([getVideoGameDb(), getVideoGameApi()]).then(
    (respuesta) => {
      return [...respuesta[0], ...respuesta[1]];
    }
  );
  //   res.status(200).json(allInfo);
  return allInfo;
};

module.exports = { getAllGames, getVideoGameDb };

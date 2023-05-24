
require('dotenv').config();
const { Genres } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenders = async (req, res) => {
  try {
    const URL_BASE = `https://api.rawg.io/api/genres?key=${API_KEY}`;

    const getGendersApi = await axios.get(URL_BASE);

    const genres = getGendersApi.data.results.map((g) => g.name);
      
    genres.forEach((element) => {
    
      Genres.findOrCreate({ where: { name: element} });
    });

    const allGenres = await Genres.findAll();
    res.status(200).json(allGenres);
    
  } catch (error) {
    res.status(404).send("error");
  }
};

module.exports = getGenders;


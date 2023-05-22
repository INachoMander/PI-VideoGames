const axios = require ('axios')
const { Genres } = require('../db')
const { API_KEY } = process.env
require('dotenv').config();

const getGenres = async () => {
  try {
    const dbGenres = await Genres.findAll()
  
    if (!dbGenres.length) {
      let genres
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      if (!response.data.results) throw Error('ERROR EN PEDIDO DE LA API')
      genres = response.data.results.map(genre => {
        return {
          id: genre.id,
          name: genre.name
        }
      })
      await Genres.bulkCreate(genres)
      return genres
    }
  
    return dbGenres.map(genre => {
      return {
        id: genre.id,
        name: genre.name
      }
    })
  } catch (error) {
    throw Error(error.message)
  }
}
  
module.exports = {getGenres}
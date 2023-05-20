const Router = require('express')
const {getGenres} = require('../controllers/getGenres')
const genresRouter = Router()

genresRouter.get('/', async(req, res) => {
  try {
    const genres = await getGenres()
    res.json({
      ok: true,
      genres
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    })
  }
})

module.exports = genresRouter
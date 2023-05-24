const { Router } = require("express");

// const {getAllGames} = require("../controllers/getAllGames");
const getGamesParams = require("../controllers/getGamesParams");
const postGames = require("../controllers/postGames");
const getGenres = require("../controllers/getGenres");
const getGameQuery = require("../controllers/getGameQuery");
const deleteGameById = require("../controllers/deleteGameById");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGameQuery);

router.get("/videogames/:idVideogame", getGamesParams);

router.post("/videogames", postGames);

router.get("/genres", getGenres)

router.delete("/videogames/:idVideogame", deleteGameById)




module.exports = router;

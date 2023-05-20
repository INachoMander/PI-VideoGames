const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genresRouter = require ("./genres")
const videogameRouter = require ("./videogame")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameRouter);
router.use('/genres', genresRouter);

module.exports = router;

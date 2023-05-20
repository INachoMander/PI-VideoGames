const { Router } = require("express");
const { getGames } = require ("../Controllers/getGames");
const { postGames } = require ('../Controllers/postGames');
const { getGamesID } = require ('../Controllers/getGamesID');
const { getName } = require("../Controllers/getName");

const videogamesRouter = Router ();
//GET FROM ALL GAMES
videogamesRouter.get('/', async (req, res)=>{
    try {
        const allGames= await getGames();
        res.status(200).json(allGames)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})
//GET BY ID
videogamesRouter.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const gamesID = await getGamesID(id);
        res.status(200).json(gamesID)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
//GET GAMES BY NAME
videogamesRouter.get('/', async (req, res)=>{
    const {name} = req.query;
    try { let gamesName= null;
        if(name){
            gamesName = await getName(name);
             if(gamesName=== null){
                res.status(404).json({message: "NO SE ENCONTRO CON ESE NAME"});
                return;
            }
            res.status(200).json(gamesName);
            return;
        }
        // si no hay nombre en el pedido debe traer todos
        const allGames= await getGames();
        res.status(200).json(allGames);
    } catch (error){
        res.status(500).json({error: error.message})
    }
})
//POST
videogamesRouter.post('/', async (req, res)=>{
    const {name, description, platforms, image, released, rating, Genres} = req.body

    try {
        const nuevoJuego= await postGames(name, description, platforms, image, released, rating, Genres)
        res.status(200).json(nuevoJuego)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = videogamesRouter;
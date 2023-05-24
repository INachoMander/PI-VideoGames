const { Videogame } = require("../db");

const deleteGameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const getId = await Videogame.findByPk(idVideogame);

    if (getId) {
      await getId.destroy();
      res.status(200).send("ELIMINADO EXITOSAMENTE");
    } else {
      res.status(404).send("NO SE ENCONTRO EL VIDEO JUEGO");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = deleteGameById;

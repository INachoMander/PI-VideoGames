const { getAllGames } = require("../controllers/getAllGames");

const getGameQuery = async (req, res) => {
  try {
    const { name } = req.query;
    const getVideoGamesQuery = await getAllGames();

    if (name) {
      const nameQuery = getVideoGamesQuery.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase()));
      res.status(200).json(nameQuery);
    } else {
      res.status(200).json(getVideoGamesQuery);
    }
  } catch (error) {
    res.status(404).json({ message: "NO SE ENCONTRO" });
  }
};
module.exports = getGameQuery;

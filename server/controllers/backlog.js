const Backlog = require("../models/backlog");

module.exports = {
  getAllBacklogs: async (req, res) => {
    try {
      const backlogs = await Backlog.find().populate("userId");
      res.json(backlogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBacklog: async (req, res) => {
    try {
      // get backlog
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBacklog: async (req, res) => {
    api_key =
      "0020709b1b2af025df475654ed1bbaf70020709b1b2af025df475654ed1bbaf7";

    try {
      // create backlog
      const { animeId } = req.body;
      console.log(animeId);

      if (animeId) {
        // TODO: hide api_key
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/${animeId}?api_key=${api_key}`
        );
        const json = await data.json();
        const { number_of_seasons } = json;

        const episodes = [];

        for (var i = 0; i < number_of_seasons; i++) {
          const data = await fetch(
            `https://api.themoviedb.org/3/tv/${animeId}/season/${i}?api_key=${api_key}`
          );
          const json = await data.json();
          console.log(json);
        }

        res.json(number_of_seasons);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

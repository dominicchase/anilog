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
    api_key = "0020709b1b2af025df475654ed1bbaf7";

    try {
      // create backlog
      const { animeId, userId } = req.body;

      if (animeId) {
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/${animeId}?api_key=${api_key}`
        );
        const json = await data.json();
        const { backdrop_path, name, number_of_seasons, poster_path } = json;

        const allSeasons = [];

        for (var i = 0; i < number_of_seasons; i++) {
          const data = await fetch(
            `https://api.themoviedb.org/3/tv/${animeId}/season/${i}?api_key=${api_key}`
          );
          const json = await data.json();
          const { episodes, id, name, poster_path, season_number } = json;

          const seasonEpisodes = [];

          for (var j = 0; j < episodes.length; j++) {
            const episode = episodes[j];

            seasonEpisodes.push({
              id: episode.id,
              name: episode.name,
              overview: episode.overview,
              stillPath: episode.still_path,
              episodeWatched: false,
            });
          }

          allSeasons.push({
            id,
            name,
            episodes: seasonEpisodes,
            posterPath: poster_path,
            seasonWatched: false,
          });
        }

        const backlog = new Backlog({
          userId,
          backlog: [
            {
              id: animeId,
              name,
              seasons: allSeasons,
              backdropPath: backdrop_path,
              posterPath: poster_path,
              allWatched: false,
            },
          ],
        });
        const newBacklog = await backlog.save();
        res.status(201).json(newBacklog);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

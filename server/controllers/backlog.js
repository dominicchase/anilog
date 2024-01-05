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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const { userId } = req.params;

      const backlog = await Backlog.findOne({ userId });

      if (!backlog) {
        return res.status(404).json({ error: "Backlog not found" });
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedBacklog = backlog.backlog.slice(startIndex, endIndex);

      const totalPages = Math.ceil(backlog.backlog.length / limit);

      res.json({
        data: paginatedBacklog,
        page,
        totalPages,
        totalCount: backlog.backlog.length,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBacklog: async (req, res) => {
    try {
      const { animeId, userId } = req.body;

      const backlog = await Backlog.findOne({ userId });

      if (backlog) {
        return res.status(404).json({ error: "Backlog exists" });
      } else {
        const anime = await getAnime(animeId);

        if (!anime) {
          return res.status(404).json({ error: "Anime not found" });
        }

        const backlog = new Backlog({
          userId,
          backlog: [anime],
        });

        const newBacklog = await backlog.save();
        res.status(201).json(newBacklog);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBacklog: async (req, res) => {
    try {
      const { animeId, userId } = req.body;

      // if animeId, add anime to backlog
      if (animeId) {
        // query backlog for incoming anime
        const anime = await Backlog.findOne({
          userId,
          backlog: { $elemMatch: { id: animeId } },
        });

        // if incoming anime exists in backlog, error
        if (!!anime) {
          return res.status(404).json({ error: "Anime exists" });
        } else {
          const newAnime = await getAnime(animeId);
          const updatedBacklog = await Backlog.findOneAndUpdate(
            { userId },
            { $push: { backlog: newAnime } },
            { new: true }
          );

          res.status(200).json(updatedBacklog);
        }
      }

      // if episodeId, flag episode as watched
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

const getAnime = async (animeId) => {
  api_key = "0020709b1b2af025df475654ed1bbaf7";

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
    const { episodes, id, name, poster_path } = json;

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

  return {
    id: animeId,
    name,
    seasons: allSeasons,
    backdropPath: backdrop_path,
    posterPath: poster_path,
    allWatched: false,
  };
};

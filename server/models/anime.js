const mongoose = require("mongoose");

const userWatchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  episodes: [
    {
      episodeId: {
        type: Number,
        required: true,
      },
      watched: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const animeSchema = new mongoose.Schema({
  animeId: {
    type: Number,
    required: true,
  },
  userWatchHistory: [userWatchHistorySchema],
});

module.exports = mongoose.model("Anime", animeSchema);

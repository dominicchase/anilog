const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  episodes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Anime", animeSchema);

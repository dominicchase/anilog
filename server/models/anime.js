const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mal_id: {
    type: Number,
    required: true,
  },
  // episodes: {
  //   type: Array,
  //   required: true,
  // },
});

module.exports = mongoose.model("Anime", animeSchema);

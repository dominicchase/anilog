const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  backlog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Backlog", backlogSchema);

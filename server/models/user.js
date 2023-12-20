const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  // make this secure
  password: {
    type: String,
    required: true,
  },
  backlog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

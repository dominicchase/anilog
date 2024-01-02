const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  backlog: { type: Array, required: true },
});

module.exports = mongoose.model("Backlog", backlogSchema);

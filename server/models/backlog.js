const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  backlog: {},
});

module.exports = mongoose.model("Backlog", backlogSchema);

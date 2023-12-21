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
  backlog: [{}],
});

module.exports = mongoose.model("User", userSchema);

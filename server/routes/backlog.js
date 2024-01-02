const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

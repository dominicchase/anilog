const express = require("express");
const controllers = require("../controllers/user.js");
const router = express.Router();

router.get("/", controllers.getAllUsers);
router.get("/:id", controllers.getUser);

router.post("/", controllers.createUser);

module.exports = router;

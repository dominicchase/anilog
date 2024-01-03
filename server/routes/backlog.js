const express = require("express");
const controllers = require("../controllers/backlog.js");
const router = express.Router();

router.get("/", controllers.getAllBacklogs);

router.post("/", controllers.createBacklog);

module.exports = router;

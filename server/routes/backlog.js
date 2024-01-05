const express = require("express");
const controllers = require("../controllers/backlog.js");
const router = express.Router();

router.get("/", controllers.getAllBacklogs);
router.get("/:userId", controllers.getBacklog);

router.post("/", controllers.createBacklog);
router.post("/update", controllers.updateBacklog);

module.exports = router;

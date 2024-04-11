const express = require("express");
const songsController = require("../controllers/songsController");

const router = express.Router();

router.get("/", songsController.song_index);
router.post("/", songsController.song_create);
router.get("/:id", songsController.song_details);
router.put("/:id", songsController.song_edit);

module.exports = router;

const express = require("express");
const historyController = require("../controllers/historyController");

const router = express.Router();

router.get("/", historyController.history_index);
router.post("/", historyController.history_create);

module.exports = router;

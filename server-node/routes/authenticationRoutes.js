const express = require("express");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

router.post("/", authenticationController.user_index);

module.exports = router;
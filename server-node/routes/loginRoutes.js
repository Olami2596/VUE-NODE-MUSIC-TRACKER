const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.post("/", loginController.user_index);

module.exports = router;

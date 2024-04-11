const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");

const router = express.Router();

router.get("/", bookmarkController.bookmark_index); 
router.post("/", bookmarkController.bookmark_create);
router.delete("/:bookmarkId", bookmarkController.bookmark_delete);



module.exports = router;

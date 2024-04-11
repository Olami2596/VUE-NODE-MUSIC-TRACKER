const _ = require("lodash");
const Bookmark = require("../models/bookmark");
const Song = require("../models/song");
const jwt = require("jsonwebtoken"); // Import JWT library

const bookmark_index = async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists in header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Error! Token is missing or invalid.",
      });
    }

    // Extract token from Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Error! Token was not provided.",
      });
    }

    // Decode the token
    const decodedToken = jwt.verify(token, "secretkeyappearshere");

    // Get user ID from decoded token
    const userId = decodedToken.userId;

    // Fetch bookmarks for the user
    const { songId } = req.query;
    const query = { user: userId };
    if (songId) {
      query.song = songId;
    }

    let bookmarks = await Bookmark.find(query).populate("song").exec();

    // Map bookmarks to desired format
    bookmarks = bookmarks.map((bookmark) => {
      return {
        bookmarkId: bookmark._id,
        song: bookmark.song,
      };
    });

    // Send bookmarks in the response
    res.status(200).json({
      success: true,
      data: bookmarks,
    });

    console.log(bookmarks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error has occurred trying to fetch bookmarks" });
  }
};

const bookmark_create = async (req, res) => {
  try {
    const { songId, userId } = req.body;

    // Check if the userId and songId are provided
    if (!userId || !songId) {
      return res.status(400).send({
        error: "userId and songId are required.",
      });
    }

    // Check if the bookmark already exists for the given songId and userId
    const existingBookmark = await Bookmark.findOne({
      song: songId,
      user: userId,
    });

    // If a bookmark already exists, return an error
    if (existingBookmark) {
      return res.status(400).send({
        error: "You already have this set as a bookmark.",
      });
    }

    // Create a new bookmark
    const newBookmark = await Bookmark.create({
      song: songId,
      user: userId,
    });

    // Send the newly created bookmark in the response
    res.send(newBookmark);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error has occurred trying to create bookmark.",
    });
  }
};

const bookmark_delete = async (req, res) => {
  try {
    const { bookmarkId } = req.params; // Corrected parameter name
    const bookmark = await Bookmark.findById(bookmarkId);
    if (!bookmark) {
      return res.status(404).send({ error: "Bookmark not found." });
    }
    await bookmark.deleteOne();
    res.send(bookmark);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error has occurred trying to delete bookmark." });
  }
};

module.exports = {
  bookmark_index,
  bookmark_create,
  bookmark_delete,
};

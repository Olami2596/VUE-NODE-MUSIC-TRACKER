const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const songSchema = new Schema(
  {
    title: {
      type: String,
    },
    artist: {
      type: String,
    },
    genre: {
      type: String,
    },
    album: {
      type: String,
    },
    albumImageUrl: {
      type: String,
    },
    youtubeId: {
      type: String,
    },
    lyrics: {
      type: String,
    },
    tab: {
      type: String,
    },
  },
  { timestamps: true }
);


const Song = mongoose.model("Song", songSchema);
module.exports = Song;

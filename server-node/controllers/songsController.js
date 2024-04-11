const Song = require("../models/song");

const song_index = async (req, res) => {
  try {
    let songs = null;
    const search = req.query.search;
    if (search) {
      songs = await Song.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { artist: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
          { album: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      songs = await Song.find().limit(10).exec();
    }
    if (!songs || songs.length === 0) {
      res.send([]);
      return;
    }
    const songObjects = songs.map((song) => song.toObject());
    res.send(songObjects);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error has occurred trying to fetch songs" });
  }
};


const song_create = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.send(song);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error has occurred trying to create songs" });
  }
};

const song_details = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.send(song);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error has occurred trying to fetch song" });
  }
};

const song_edit = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedSong) {
      return res.status(404).send({ error: "Song not found" });
    }

    res.send(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing the song" });
  }
};

module.exports = {
  song_index,
  song_create,
  song_details,
  song_edit,
};

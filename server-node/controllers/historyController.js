const History = require("../models/history");
const Song = require("../models/song");
const _ = require("lodash");

const history_index = async (req, res) => {
  try {
    const { songId, userId } = req.query;
    const query = {
      user: userId,
    };

    if (songId) {
      query.song = songId; // Include songId in the query if provided
    }

    let histories = await History.find(query).populate("song").exec();

    histories = histories.map((history) => {
      return {
        historyId: history._id,
        song: history.song,
      };
    });

    res.send(histories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error has occurred trying to fetch historys" });
  }
};


const history_create = async (req, res) => {
  try {
    const { userId, songId } = req.body; 
    const history = await History.create({
      user: userId,
      song: songId,
    });

    // Send the newly created history in the response
    res.send(history);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error has occurred trying to create history.",
    });
  }
};


module.exports = {
  history_index,
  history_create,
};

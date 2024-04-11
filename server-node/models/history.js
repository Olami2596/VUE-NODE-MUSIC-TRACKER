const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
  },
  { timestamps: true }
);

// Associate history with User and Song models
historySchema.statics.associate = function (models) {
  this.belongsTo(models.User);
  this.belongsTo(models.Song);
};

const History = mongoose.model("History", historySchema);
module.exports = History;

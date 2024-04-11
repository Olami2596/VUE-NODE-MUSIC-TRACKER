const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
  },
  { timestamps: true }
);

// Associate bookmark with User and Song models
bookmarkSchema.statics.associate = function (models) {
  this.belongsTo(models.User);
  this.belongsTo(models.Song);
};

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark;

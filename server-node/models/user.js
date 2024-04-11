const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcryptjs"));

function hashPassword(user) {
  const SALT_FACTOR = 8;

  if (!user.isModified("password")) {
    return Promise.resolve(); // Return a resolved promise if password is not changed
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(user.password, salt))
    .then((hash) => {
      user.password = hash; // Set the hashed password
    });
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define hooks in an array
userSchema.pre("save", function (next) {
  hashPassword(this)
    .then(() => next())
    .catch(next);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compareAsync(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

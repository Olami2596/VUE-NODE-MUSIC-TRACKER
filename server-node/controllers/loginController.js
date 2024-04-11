const User = require("../models/user");
const jwt = require('jsonwebtoken')


// function jwtSignUser(user) {
//   const ONE_WEEK = 60 * 60 * 24 * 7
//   return jwt.sign({ user }, process.env.JWT_SECRET || 'secret', { expiresIn: ONE_WEEK });
// }

const user_index = async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  // if (!existingUser
  //     || existingUser.password
  //     !== password) {
  //     const error =
  //         Error(
  //             "Wrong details please check at once"
  //         );
  //     return next(error);
  // }
      const isPasswordValid = await existingUser.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({ error: "Login information was incorrect" });
      }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1w" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

    const userJson = existingUser.toJSON();
    res.status(200).json({
      user: userJson,
      token: token,
    });
};
 
// const user_index = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(403).send({ error: "Login information was incorrect" });
//     }

//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(403).send({ error: "Login information was incorrect" });
//     }

//     const userJson = user.toJSON()
//     res.send({ user: userJson, token : jwtSignUser(userJson) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "An error has occurred trying to login" });
//   }
// };

module.exports = {
  user_index,
};

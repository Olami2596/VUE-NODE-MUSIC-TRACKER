const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Function to generate JWT token
// function jwtSignUser(user) {
//   const ONE_WEEK = 60 * 60 * 24 * 7;
//   return jwt.sign({ user }, process.env.JWT_SECRET || "secret", {
//     expiresIn: ONE_WEEK,
//   });
// }

// const user_index = (req, res) => {
//   const { email, password } = req.body;

//   // Validate email and password
//   if (!validator.isEmail(email)) {
//     return res.status(400).send({ error: "Invalid email address" });
//   }

//   const isPasswordValid =
//     validator.isLength(password, { min: 8, max: 32 }) &&
//     /[a-z]/.test(password) &&
//     /[A-Z]/.test(password) &&
//     /[0-9]/.test(password) &&
//     /[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>/?]/.test(password);

//   if (!isPasswordValid) {
//     return res.status(400).send({
//       error:
//         "Invalid password. Password must have at least 8 characters, including lowercase and uppercase letters, numbers, and special characters.",
//     });
//   }

//   // Create a new user instance
//   const user = new User(req.body);

//   // Save the user
//   user
//     .save()
//     .then((result) => {
//       // Generate JWT token
//       const token = jwtSignUser(user.toJSON());

//       // Send response with user and token
//       res.send({
//         user: user.toJSON(),
//         token,
//         message: `User created successfully. Email: ${result.email}`,
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(400).send({ error: "This email account is already in use" });
//     });
// };

const user_index = async (req, res, next) => {
  const { email, password } = req.body;
  const newUser = User({
    email,
    password,
  });

  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1w" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(201).json({
    success: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token,
    },
  });
};

module.exports = {
  user_index,
};

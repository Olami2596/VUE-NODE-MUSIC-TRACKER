const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const authenticationRoutes = require("./routes/authenticationRoutes");
const loginRoutes = require("./routes/loginRoutes");
const songsRoutes = require("./routes/songsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const historyRoutes = require("./routes/historyRoutes");
const isAuthenticated = require("./policies/isAuthenticated")

// express app
const app = express();

const dbURI = "mongodb://localhost:27017";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

require('./passport')

//routes
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

app.use("/register", authenticationRoutes);
app.use("/login", loginRoutes);
app.use("/songs", songsRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/histories", historyRoutes);


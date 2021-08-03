const cors = require("cors");
const express = require("express");
const app = express();

const movies = require("./routes/moviesRoutes");
const series = require("./routes/seriesRoutes");
const home = req

app.use(cors());
app.use(express.json());

app.use("/home", home);
app.use("/filmes", movies);
app.use("/series", series);

module.exports = app;
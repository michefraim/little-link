require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
// const bodyParser = require("body-parser");

app.use(cors());
express.urlencoded()
app.use(express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api", api);

module.exports = app;

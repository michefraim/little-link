require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api")

app.use(cors());

app.use(express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api", api);

module.exports = app;

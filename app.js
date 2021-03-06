require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
const bodyParser = require("body-parser");
const pug = require('pug');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use("/api", api);

module.exports = app;

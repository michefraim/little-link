const express = require("express");
const littleLink = require("./littleLink");
const stats = require("./stats");


const api = express.Router();

api.use("/littleLink", littleLink);
api.use("/stats", stats);

module.exports = api;
const { Router } = require("express");
const littleLink = require("./littleLink");

const api = Router();

api.use("/littleLink", littleLink);

module.exports = api;
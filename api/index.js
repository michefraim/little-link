const express = require("express");
const littleLink = require("./littleLink");
const stats = require("./stats");

const api = express.Router();

api.use("/littleLink", littleLink);
// api.use("/stats/", stats);
api.get("/stats/:shortUrl", (request, response) => {
    // const shortUrl = request.params.shortUrl
    console.log(process.cwd)
    response.sendFile(`${process.cwd()}/public/html/stats.html`);
  });


module.exports = api;
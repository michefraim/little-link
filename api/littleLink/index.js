const { Router } = require("express");


const littleLink = Router();

littleLink.use("*", (req, res) => {
  res.status(404).send("Not found! :(");
});

module.exports = littleLink;
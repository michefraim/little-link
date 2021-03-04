const express = require("express");
const fs = require("fs");
const DataBase = require("../models/database");
const LittleLink = require("../models/littleLink");

const router = express.Router();

router.use(express.json());

router.get("/", (request, response) => {
  return response.status(404).json({ message: "Error No ID" });
});

router.get("/:shortUrl", (request, response) => {
  const { shortUrl } = request.params;
  try {
    const data = DataBase.readDataBaseByShortUrl(shortUrl);
    if (data === "Not Found") {
      return response
        .status(200)
        .json({ error: "No short URL found for the given input" });
    }
  } catch (e) {
    return response
      .status(500)
      .json({ error: `failed reading the database`, fullerror: e });
  }
});

module.exports = router;
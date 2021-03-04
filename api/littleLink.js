const express = require("express");
const fs = require("fs");
const DataBase = require("../models/database.js");
const LittleLink = require("../models/littleLink.js");

const router = express.Router();

router.use(express.json());

router.get("/", (request, response) => {
  return response.status(404).json({ message: "Error No ID" });
});

router.get("/:shortUrl", async (request, response) => {
  const { shortUrl } = request.params;
  try {
    const data = await DataBase.readDataBaseByShortUrl(shortUrl);
    console.log(data);
    if (data === "Not Found") {
      return response
        .status(200)
        .json({ error: "No short URL found for the given input" });
    }
    res.status(200).redirect(data.originUrl);
  } catch (e) {
    return response
      .status(500)
      .json({ error: `failed reading the database`, "fullerror": e });
  }
});

module.exports = router;

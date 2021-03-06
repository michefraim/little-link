const express = require("express");
const DataBase = require("../models/database.js");

const router = express.Router();
router.use(express.json());

router.get("/", (request, response) => {
  return response.status(404).json({ message: "Error No shortUrl" });
});

router.get("/:shortUrl", async (request, response) => {
  const { shortUrl } = request.params;
  try {
    const data = await DataBase.readDataBaseByUrl(shortUrl, false);

    if (data === "Not Found") {
      return response
        .status(200)
        .json({ error: "No short URL found for the given input" });
    }

    response.status(200).render("index", {
      originalUrl: data[0].originUrl,
      shortUrl: data[0].shortUrl,
      creationDate: data[0].creationDate,
      redirectCount: data[0].redirectCount,
    });
  } catch (e) {
    return response.status(500).json({ error: `failed reading the database` });
  }
});

module.exports = router;

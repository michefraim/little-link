const express = require("express");
const DataBase = require("../models/database.js");

const router = express.Router();
router.use(express.json());

router.get("/:shortUrl", async (request, response) => {
  const { shortUrl } = request.params;
  try {
    const data = await DataBase.readDataBaseByUrl(shortUrl, false);

    if (data === "Not Found") {
      return response
        .status(200)
        .json({ error: "No short URL found for the given input" });
    }
    return response.json(data);
  } catch (e) {
    return response.status(500).json({ error: `failed reading the database` });
  }
});

module.exports = router;

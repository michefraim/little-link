const express = require("express");
const DataBase = require("../models/database.js");
const LittleLink = require("../models/littleLink.js");
const { validateUrl } = require("../utils.js");
const { removeBackSlash } = require("../utils.js");

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
    response.redirect(data[0].originUrl);
  } catch (e) {
    return response.status(500).json({ error: `failed reading the database` });
  }
});

router.post("/new", async (request, response) => {
  const originUrl = request.body.url;
  const originUrlStandardized = removeBackSlash(originUrl);

  if (!validateUrl(originUrlStandardized)) {
    return response
      .status(400)
      .json({ message: "Bad URL entered", succuss: false });
  }

  if (!LittleLink.isUrlOnline(originUrlStandardized)) {
    return response
      .status(400)
      .json({ message: "The URL entered is not up", succuss: false });
  }

  if (await DataBase.doesUrlAlreadyExists(originUrlStandardized)) {
    const responseData = await DataBase.readDataBaseByUrl(
      originUrlStandardized,
      true
    );
   return response.status(200).json(responseData);
  }

  const littleLink = new LittleLink(originUrlStandardized);
  try {
      await DataBase.addNewData(littleLink);
  }
  catch (e) {
      console.log(e);
  }
  response.status(200).send(littleLink);
});

module.exports = router;

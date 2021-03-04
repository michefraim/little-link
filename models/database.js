"use strict";
const fs = require("fs");
const { default: axios } = require("axios");
const randomWords = require("random-words");

module.exports = class DataBase {

  static async doesUrlAlreadyExists(originUrl) {

  }

  static async postNewUrl(originUrl, newData) {
    const fileData = await JSON.parse(
      fs.fsPromises.readFile("./models/database.js")
    );
    fileData.push(newData);
    fs.fsPromises.writeFile('sample.json', JSON.stringify(fileData, null, 2));

  }
};

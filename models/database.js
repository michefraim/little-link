"use strict";
const fs = require("fs").promises;

module.exports = class DataBase {
  static async readDataBaseData() {
    const fileData = await fs.readFile(
      "./database.json",
      "utf8",
      (error, data) => {
        if (error) throw error;
        return;
      }
    );
    const fileDataParsed = JSON.parse(fileData);
    return fileDataParsed;
  }

  static async readDataBaseByShortUrl(shortUrl) {
    const fileData = await this.readDataBaseData();
      const filteredData = fileData.filter((LittleLink) => {
        return LittleLink.shortUrl === shortUrl.toLowerCase();
      });
      if (filteredData.length === 0) {
        return "Not Found";
      }
      return filteredData;
  }

  static async doesUrlAlreadyExists(originUrl) {
    const fileData = this.readDataBaseData();
    try {
      const filteredData = fileData.filter((LittleLink) => {
        return LittleLink.originUrl === originUrl.toLowerCase();
      });
      return filteredData.length === 0 ? false : true;
    } catch (e) {
      return `checking for url failed ${e}`;
    }
  }

  static async addNewData(newData) {
    if (this.doesUrlAlreadyExists(newData.originUrl)) {
      const filteredData = fileData.filter((LittleLink) => {
        return LittleLink.originUrl === originUrl.toLowerCase();
      });
      return filteredData;
    }

    const fileData = this.readDataBaseData();
    console.log(fileData);
    fileData.push(newData);
    try {
      await fs.fsPromises.writeFile(
        "sample.json",
        JSON.stringify(fileData, null, 2)
      );
      return;
    } catch (e) {
      return `Adding data failed ${e}`;
    }
  }
};

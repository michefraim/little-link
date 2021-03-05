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

  static async readDataBaseByUrl(url, isOrigin) {
    const fileData = await this.readDataBaseData();
    const urlLowerCased = url.toLowerCase();
    const filteredData = fileData.filter((data) => {
      if (isOrigin) {
        return data.originUrl === urlLowerCased;
      } else {
        return data.shortUrl === urlLowerCased;
      }
    });
    if (filteredData.length === 0) {
      return "Not Found";
    }
    return filteredData;
  }

  static async doesUrlAlreadyExists(originUrl) {
    const fileData = await this.readDataBaseData();
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
    if (await this.doesUrlAlreadyExists(newData.originUrl)) {
      const filteredData = fileData.filter((LittleLink) => {
        return LittleLink.originUrl === originUrl.toLowerCase();
      });
      return filteredData;
    }

    const fileData = await this.readDataBaseData();
    fileData.push(newData);
    try {
      await fs.writeFile("database.json", JSON.stringify(fileData, null, 2));
      return;
    } catch (e) {
      return `Adding data failed ${e}`;
    }
  }
};

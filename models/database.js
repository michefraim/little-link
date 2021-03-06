"use strict";
const fs = require("fs").promises;
let dataBasePath =
  process.env.NODE_ENV == "test" ? "./testDatabase.json" : "./database.json";

module.exports = class DataBase {
  static async readDataBaseData() {
    const fileData = await fs.readFile(
      dataBasePath,
      "utf8",
      (error, data) => {
        if (error) throw error;
        return;
      }
    );
    return JSON.parse(fileData);
  }

  static async readDataBaseByUrl(url, isOrigin) {
    const fileData = await this.readDataBaseData();
    const filteredData = fileData.filter((data) => {
      if (isOrigin) {
        return data.originUrl === url.toLowerCase();
      } else {
        return data.shortUrl === url.toLowerCase();
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
      await fs.writeFile(dataBasePath, JSON.stringify(fileData, null, 2));
      return;
    } catch (e) {
      return `Adding Data Failed ${e}`;
    }
  }

  static async updateData(newData) {
    const fileData = await this.readDataBaseData();
    const littleLinkIndex = fileData.findIndex(
      (obj) => obj.shortUrl === newData[0].shortUrl
    );
    fileData[littleLinkIndex].redirectCount = newData[0].redirectCount;
    try {
      await fs.writeFile(dataBasePath, JSON.stringify(fileData, null, 2));
      return;
    } catch (e) {
      return `Updating Data Failed ${e}`;
    }
  }
};

"use strict";
const fs = require("fs");

module.exports = class DataBase {
  static async readDataBaseData() {
      try {
    const fileData = await JSON.parse(
      fs.fsPromises.readFile("../database.json")
    );
    return fileData;
      }
      catch (e) {
          return `database read failed ${e}`;
      }
  }

  static async doesUrlAlreadyExists(originUrl) {
    const fileData = this.readDataBaseData();
    try {
        const filteredData = fileData.filter((LittleLink) => {
          return LittleLink.originUrl === originUrl.toLowerCase();
        });
        return filteredData.length === 0 ? false : true;
    }
    catch (e) {
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
    fileData.push(newData);
    try {
        await fs.fsPromises.writeFile("sample.json", JSON.stringify(fileData, null, 2));
        return;
    }
    catch (e) {
        return `Adding data failed ${e}`;
    }

  }
};

"use strict";
const fs = require("fs");

module.exports = class DataBase {
    static async readDataBaseData() {
       const fileData = await JSON.parse(
            fs.fsPromises.readFile("../database.json")
          );
          return fileData;
    }

  static async doesUrlAlreadyExists(originUrl) {
        const fileData = this.readDataBaseData();
        const filteredData = fileData.filter((LittleLink) => {
            return LittleLink.originUrl;
        })
        return (filteredData.length === 0) ? false : true;
  }

  static async postNewUrl(newData) {
        this.readDataBaseData();
    fileData.push(newData);
    fs.fsPromises.writeFile('sample.json', JSON.stringify(fileData, null, 2));
  }
};

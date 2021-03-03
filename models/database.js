"use strict";
const fs = require("fs")
const { default: axios } = require("axios");
const randomWords = require("random-words");

class DataBase{
    static async isUrlOnline(originUrl) {
        const response = await axios.get(originUrl);
        return (response.status >= 200 && response.status < 300) ? true : false;
    }

    static async doesUrlAlreadyExists(url) {}

    static async postNewUrl(url) {
        const newData = {
            "original url": url, 
            "shorturl-id": randomWords({ exactly: 2, maxLength: 5,  join: '' });
            "creationDate": new Date()
        }
        const fileData = await fsPromises.readFile("./models/database.js");

    }
}
"use strict";
const DataBase = require("./database.js") 

// console.log(DataBase.readDataBaseData());
async function lel() {
    const response = await DataBase.readDataBaseByShortUrl("lalalal");
    console.log(response);
}
console.log(lel());

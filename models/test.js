"use strict";
// const DataBase = require("./database.js") 

// async function lel() {
//     const response = await DataBase.readDataBaseByShortUrl("lalalal");
//     console.log(response);
// }

function removeBackSlash(originUrl) {
    if (originUrl.slice(-1) !== "/") {
        return originUrl;
    }
    return originUrl.slice(0, -1);
}

const url = 'https://www.facebook.com/';

// removeBackSlash(url);
console.log(removeBackSlash(url));


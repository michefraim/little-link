"use strict";
// const DataBase = require("./database.js") 

// async function lel() {
//     const response = await DataBase.readDataBaseByShortUrl("lalalal");
//     console.log(response);
// }

function removeBackSlash(originUrl) {
    return (originUrl.slice(-1) === "/") ? originUrl.slice(0, -1) : originUrl;
}

const url = 'https://www.facebook.com';

// removeBackSlash(url);
console.log(removeBackSlash(url));


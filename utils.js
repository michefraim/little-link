"use strict";

function urlValidate(originUrl) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(originUrl);
}

function removeBackSlash(originUrl) {
    if (originUrl.slice(-2, -1) !== "/") {
        return originUrl;
    }
    return  newOriginUrl = originUrl.slice(-2, -1);
}

module.exports = {
    urlValidate,
    removeBackSlash
}
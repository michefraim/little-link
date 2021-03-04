"use strict";

function validateUrl(originUrl) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(originUrl);
}

function removeBackSlash(originUrl) {
    if (originUrl.slice(-1) !== "/") {
        return originUrl;
    }
    return originUrl.slice(0, -1);
}

module.exports = {
    validateUrl,
    removeBackSlash
}
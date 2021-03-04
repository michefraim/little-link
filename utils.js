"use strict";

function validateUrl(originUrl) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(originUrl);
}

function removeBackSlash(originUrl) {
    return (originUrl.slice(-1) === "/") ? originUrl.slice(0, -1) : originUrl;
}

module.exports = {
    validateUrl,
    removeBackSlash
}
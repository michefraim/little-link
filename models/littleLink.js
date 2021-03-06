"use strict";
const { default: axios } = require("axios");
const randomWords = require("random-words");

module.exports = class LittleLink {
  constructor(
    originUrl,
    LittleLink = randomWords({ exactly: 2, maxLength: 5, join: "" })
  ) {
    this.originUrl = originUrl.toLowerCase();
    this.shortUrl = LittleLink.toLowerCase();
    this.creationDate = new Date();
    this.redirectCount = 0;
  }
};

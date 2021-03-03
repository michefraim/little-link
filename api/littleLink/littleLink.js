const express = require("express");
const fs = require("fs");
const axios = require("axios");
const randomWords = require("random-words");

const router = express.Router();

router.use(express.json());


const getRequestById = async () => {
    try {
        const resp = await axios.get(`/${id}`);
        console.log(resp);
        if (id === "test") {
            console.log('true');
        } else {
            console.log("false");
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

getRequestById();
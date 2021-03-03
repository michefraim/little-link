const express = require("express");
const fs = require("fs");

const router = express.Router();

router.use(express.json());

router.get("/", (request, response) => {
    return response.status(404).json({ message: "Error No ID" });
});

router.get("/:id", (request, response) => {
    const { id } = request.params;

    });

module.exports = router;
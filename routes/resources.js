const express = require("express")
const router = express.Router()
const Resource = require("../models/resources");

router.get("/", (req, res) => {
    res.send("coming soon")
})

module.exports = router
const express = require("express")
const router = express.Router()
const Resource = require("../models/resources");

router.get("/", (req, res) => {
    res.render("resources/index")
})

module.exports = router
const express = require("express")
const router = express.Router()
const Announcement = require("../models/announcements")

router.get("/", (req, res) => {
    res.send("coming soon")
})

module.exports = router
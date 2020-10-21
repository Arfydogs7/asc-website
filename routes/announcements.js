const express = require("express")
const router = express.Router()
const Announcement = require("../models/announcements")
const { ensureAuth } = require("../middleware/auth")

//home page
router.get("/", async(req, res) => {
    res.render("announcements/index")
    try {
        const announcements = await Announcement.find().lean()
        res.render("tutors/index", {
            announcements: announcements,
        })
    } catch {
        res.redirect("/")
    }
})

//new announcement
router.get("/new", (req, res) => {
    res.render("announcements/new", { announcement: new Announcement() })
})

//create announcement
router.post("/", async(req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
    })
    try {
        const newAnnoun = await announcement.save()
        res.redirect("/announcements")
    } catch {
        res.render("announcements/new", {
            announcement: announcement,
            errorMessage: "error creating announcement"
        })
    }
})

//edit announcement

//update announcement

//delete announcement

module.exports = router
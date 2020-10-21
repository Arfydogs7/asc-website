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
router.get("/new", ensureAuth, (req, res) => {
    res.render("announcements/new", { announcement: new Announcement() })
})

//create announcement
router.post("/", ensureAuth, async(req, res) => {
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
router.get("/:id/edit", ensureAuth, async(req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id)
        res.render("announcements/edit", { announcement: announcement })
    } catch {
        res.redirect("/login")
    }
})

//update announcement
router.put("/:id", async(req, res) => {
    let announcement;
    try {
        announcement = await Announcement.findById(req.params.id)
        announcement.title = req.body.title,
            await announcement.save()
        res.redirect(`/announcements`)
    } catch {
        if (!announcement) {
            res.redirect("/login")
        } else {
            res.render("announcements/edit", {
                announcement: announcement,
                errorMessage: "error updating announcement"
            })
        }
    }
})

//delete announcement
router.delete("/:id", async(req, res) => {
    let announcement;
    try {
        announcement = await Announcement.findById(req.params.id)
        await announcement.remove()
        res.redirect("/login")
    } catch {
        if (!announcement) {
            res.redirect("/login")
        } else {
            res.render("/dashboard", {
                errorMessage: "error deleting announcement"
            })
        }
    }
})

module.exports = router
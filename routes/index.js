const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Tutor = require("../models/tutors")

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/about", (req, res) => {
    res.render("about")
})

//login
router.get("/login", ensureGuest, (req, res) => {
    res.render("login", { layout: "layouts/login.ejs" })
})

//error authenticating
router.get("/error", (req, res) => {
    res.send("there was an error authenticating")
})

//admin panel
router.get("/dashboard", ensureAuth, async(req, res) => {
    const searchOptions = {}
    if (req.query.name && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, "i")
    }
    try {
        const tutors = await Tutor.find(searchOptions)
        res.render("dashboard", {
            tutors: tutors,
            searchOptions: req.query
        })
    } catch {
        res.redirect("/")
    }
})

module.exports = router
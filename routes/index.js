const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/about", (req, res) => {
    res.render("about")
})

//login
router.get("/login", (req, res) => {
    res.render("login", { layout: "layouts/login.ejs" })
})

//admin panel
router.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

module.exports = router
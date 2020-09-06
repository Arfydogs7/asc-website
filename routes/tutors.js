const express = require("express")
const router = express.Router()

//all tutors
router.get("/", (req, res) => {
    res.render("tutors/index")
})

//new tutors
router.get("/new", (req, res) => {
    res.render("tutors/new")
})

//create tutors
router.post("/", (res, req) => {
    res.send("create")
})

module.exports = router
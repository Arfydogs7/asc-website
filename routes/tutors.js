const express = require("express")
const router = express.Router()
const Tutor = require("../models/tutors")

//all tutors
router.get("/", async(req, res) => {
    //search
    const searchOptions = {}
    if (req.query.name && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, "i")
    }
    try {
        const tutors = await Tutor.find(searchOptions)
        res.render("tutors/index", {
            tutors: tutors,
            searchOptions: req.query
        })
    } catch {
        res.redirect("/")
    }
})

//new tutors
router.get("/new", (req, res) => {
    res.render("tutors/new", { tutor: new Tutor() })
})

//create tutors
router.post("/", async(req, res) => {
    const tutor = new Tutor({
        name: req.body.name,
        grade: req.body.grade,
        email: req.body.email,
        number: req.body.number,
        subjects: {
            math: req.body.math,
            science: req.body.science,
            sosci: req.body.sosci,
            language: req.body.language,
            testing: req.body.testing
        }
    })
    try {
        const newTutor = await tutor.save()
        res.redirect(`/tutors/${newTutor.id}`)
    } catch {
        res.render("tutors/new", {
            tutor: tutor,
            errorMessage: "error creating tutor"
        })
    }
})

//tutor pages
router.get("/:id", async(req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id)
        res.render("tutors/show", {
            tutor: tutor
        })
    } catch {
        res.redirect("/")
    }
})

//edit
router.get("/:id/edit", async(req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id)
        res.render("tutors/edit", { tutor: tutor })
    } catch {
        res.redirect("/tutors")
    }
})

//update
router.put("/:id", async(req, res) => {
    let tutor;
    try {
        tutor = await Tutor.findById(req.params.id)
        tutor.name = req.body.name,
            tutor.grade = req.body.grade,
            tutor.email = req.body.email,
            tutor.number = req.body.number,
            tutor.subjects = {
                math: req.body.math,
                science: req.body.science,
                sosci: req.body.sosci,
                language: req.body.language,
                testing: req.body.testing
            }
        await tutor.save()
        res.redirect(`/tutors/${newTutor.id}`)
    } catch {
        if (!tutor) {
            res.redirect("/tutors")
        } else {
            res.render("tutors/edit", {
                tutor: tutor,
                errorMessage: "error updating tutor"
            })
        }
    }
})

//delete
router.delete("/:id", async(req, res) => {
    let tutor;
    try {
        tutor = await Tutor.findById(req.params.id)
        await tutor.remove()
        res.redirect("/tutors")
    } catch {
        if (!tutor) {
            res.redirect("/")
        } else {
            res.redirect(`tutors/${tutor.id}`)
        }
    }
})

module.exports = router
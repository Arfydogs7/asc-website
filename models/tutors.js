const mongoose = require("mongoose")

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: String,
    subjects: {
        math: [String],
        english: [String],
        science: [String],
        language: [String],
        sosci: [String],
        testing: [String],
        other: [String]
    },
    daysAvail: [String],
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    hours: {
        type: Number,
        required: true,
        default: 0,
    },
    hourLog: [Date]
})

module.exports = mongoose.model("Tutor", tutorSchema)
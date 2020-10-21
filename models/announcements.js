const mongoose = require("mongoose")

const announSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    markdown: {
        type: String
    }
})

module.exports = mongoose.model("Announcement", announSchema)
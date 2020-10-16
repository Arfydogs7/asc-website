const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Resource", resourceSchema)
const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Amenities: {
        type: [String],
        default: [],
    },
    Images: {
        type: [String],
        default: [],
    },
    Host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
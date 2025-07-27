const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    Property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,  
    },
    Comment: {
        type: String,
    },
});


module.exports = mongoose.model("Review", ReviewSchema);
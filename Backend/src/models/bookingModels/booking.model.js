const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    Property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Checkin_date: {
        type: String,
        required: true,
    },
    Checkout_date: {
        type: String,
        required: true,
    },
    TotalPrice: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    },
    Razorpay_Orderid: {
        type: String,
    },
    Payment_Details: {
        Order_id: {type: String},
        Payment_id: {type: String},
        Signature: {type: String},
    },
}, {timestamps: true});

module.exports = mongoose.model("Booking", BookingSchema);
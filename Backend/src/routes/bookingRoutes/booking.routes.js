const express = require("express");
const AuthMiddleWare = require("../../middlewares/authMiddleware.js");
const BookingController = require("../../controllers/bookingControllers/booking.controller.js");

const router = express.Router();

router.post("/create", AuthMiddleWare, BookingController.BookingCreateController);
router.get("/view/:id", AuthMiddleWare, BookingController.BookingViewController);
router.delete("/delete/:id", AuthMiddleWare, BookingController.BookingCancelController);

module.exports = router;
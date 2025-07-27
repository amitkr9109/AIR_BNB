const express = require("express");
const AuthMiddleWare = require("../../middlewares/authMiddleware");
const PaymentController = require("../../controllers/paymentControllers/payment.controller.js");

const router = express.Router();

router.post("/process", AuthMiddleWare, PaymentController.ProcessPaymentController);
router.post("/verify", AuthMiddleWare, PaymentController.VerifyPaymentController);

module.exports = router;
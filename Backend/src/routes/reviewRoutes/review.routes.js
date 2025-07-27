const express = require("express");
const AuthMiddleWare = require("../../middlewares/authMiddleware.js");
const ReviewController = require("../../controllers/reviewControllers/review.controller.js");

const router = express.Router();

router.post("/create", AuthMiddleWare, ReviewController.CreateReviewController);
router.get("/read/:id", AuthMiddleWare, ReviewController.ReadReviewController);
router.put("/update/:id", AuthMiddleWare, ReviewController.UpdateReviewController);
router.delete("/delete/:id", AuthMiddleWare, ReviewController.DeleteReviewController);
router.get("/allread/:id", AuthMiddleWare, ReviewController.AllReadReviewController);

module.exports = router;
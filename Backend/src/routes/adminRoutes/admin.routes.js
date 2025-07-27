const express = require("express");
const AdminMiddleWare = require("../../middlewares/adminMiddleware.js");
const AdminController = require("../../controllers/adminControllers/admin.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/user-view", AdminMiddleWare, AdminController.GetAllUserController);
router.delete("/user-delete/:id", AdminMiddleWare, AdminController.DeleteAllUserController);
router.get("/property-view", AdminMiddleWare, AdminController.GetAllPropertyController);
router.delete("/property-delete/:id", AdminMiddleWare, AdminController.DeleteAllPropertyController);
router.get("/booking-view", AdminMiddleWare, AdminController.GetAllBookingController);
router.delete("/booking-delete/:id", AdminMiddleWare, AdminController.DeleteAllBookingController);
router.get('/profile', authMiddleware, AdminMiddleWare, async (req, res) => {
  res.status(200).json({ user: req.user });
}); 

module.exports = router;
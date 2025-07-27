const express = require("express");
const UserController = require("../../controllers/userControllers/user.controller.js");
const AuthMiddleWare = require("../../middlewares/authMiddleware.js");


const router = express.Router();

router.post("/register", UserController.RegisterController);
router.post("/login", UserController.LoginController);
router.post("/logout", UserController.LogOutController);
router.get("/current-user", AuthMiddleWare, UserController.CurrentUserController);
router.post("/update", AuthMiddleWare, UserController.UpdateUserController);
router.post("/reset-password", AuthMiddleWare, UserController.ResetPasswordController);

module.exports = router;
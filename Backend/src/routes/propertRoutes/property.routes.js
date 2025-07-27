const express = require("express");
const AuthMiddleWare = require("../../middlewares/authMiddleware.js");
const PropertyController = require("../../controllers/propertyControllers/property.controller.js");


const router = express.Router();

router.post("/create", AuthMiddleWare, PropertyController.PropertyCreateController);
router.get("/view/:id", AuthMiddleWare, PropertyController.PropertyViewController);
router.put("/update/:id", AuthMiddleWare, PropertyController.PropertyUpdateController);
router.delete("/delete/:id", AuthMiddleWare, PropertyController.PropertyDeleteController);
router.post("/search", AuthMiddleWare, PropertyController.PropertySearchController);
router.get("/allview", AuthMiddleWare, PropertyController.PropertyAllViewController);

module.exports = router;
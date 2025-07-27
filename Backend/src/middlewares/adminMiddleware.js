const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModels/user.model.js");
const CustomError = require("../utils/customError.js");
const CacheClient = require("../services/cache.service.js");
 
const AdminMiddleWare = async function (req, res, next) {
   const { token } = req.cookies;
 
   try {
    if (!token) return next(new CustomError("Unauthorized User!", 401));
 
    const IsBlacklistedToken = await CacheClient.get(token);
    if (IsBlacklistedToken) {
       return res.status(401).json({ message: "Token blacklisted" });
    }
 
    const decode = JWT.verify(token, process.env.JWT_SECRET);
     
    const AdminUser = await UserModel.findById(decode.id);
 
    if (!AdminUser) return next(new CustomError("User not found", 401));


    if (AdminUser.IsAdmin !== true){
        return next(new CustomError("Access Denied", 400));
    }
    
    req.user = AdminUser;
    next();

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};
 
module.exports = AdminMiddleWare;
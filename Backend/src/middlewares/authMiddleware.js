const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModels/user.model.js");
const CustomError = require("../utils/customError.js");
const CacheClient = require("../services/cache.service.js");

const AuthMiddleWare = async function(req, res, next){
    const {token} = req.cookies;

    try {
        if(!token) return next(new CustomError("Unauthorized user", 401));

        const isBlackedListToken = await CacheClient.get(token);
        if(isBlackedListToken){
            return res.status(401).json({message: "Token Blacklist"});
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decode.id);
        if(!user) return next(new CustomError("user not found !", 401));

        req.user = user;
        next();

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
}

module.exports = AuthMiddleWare;
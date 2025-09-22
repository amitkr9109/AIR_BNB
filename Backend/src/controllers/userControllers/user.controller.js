const UserModel = require("../../models/userModels/user.model.js");
const CustomError = require("../../utils/customError.js");
const CacheClient = require("../../services/cache.service.js");
const JWT = require("jsonwebtoken");
const { ResetPasswordConformationTemplate } = require("../../utils/emailTemplate.js");
const sendMail = require("../../utils/email.js");

const RegisterController = async function(req, res, next){

    const {username, email, mobileNo, address, password} = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if(existingUser) return next(new CustomError("User Already Exist", 409));

        const user = await UserModel.create({
            username,
            email, 
            mobileNo, 
            address, 
            password
        });

        const token = await user.generateToken();
        res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(201).json({ message: "User Registerd successfully", token: token, Userdata: user});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const LoginController = async function(req, res, next){
    const {email, password} = req.body;

    try {
        const LoginUser = await UserModel.authenticateUser(email, password);

        const token = await LoginUser.generateToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({message: "User Logged in", token: token, Logindata: LoginUser});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const LogOutController = async function(req, res,next){
    const {token} = req.cookies;

    try {
        if(!token) return next(new CustomError("User unauthorized", 401));
        const BlackListToken = await CacheClient.set(token, "blacklisted", "EX",3600);
        res.clearCookie("token");
        res.status(200).json({message: "User Logged Out"});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
}

const CurrentUserController = async function(req, res, next){
    try {
        const user = req.user;
        res.status(200).json({message: "authentication successfully", user: user});
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const UpdateUserController = async function(req, res, next){
    try {
        const {username, email, mobileNo, address, NewPassword} = req.body;

        const UpdateUser = await UserModel.findOne({ email: email});
        if(username) UpdateUser.username = username;
        if(email) UpdateUser.email = email;
        if(mobileNo) UpdateUser.mobileNo = mobileNo;
        if(address) UpdateUser.address = address;

        let NewToken = null;
        if(NewPassword){
            NewToken = UpdateUser.generateToken();
            UpdateUser.password = NewPassword;
        };

        await UpdateUser.save();

        if(!NewToken){
            return next(new CustomError("Error in new generating token", 400));
        };

        res.cookie("token", NewToken);

        res.status(200).json({ success: true, message: "Profile Updated successfully", Updatedata: UpdateUser });


    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const ResetPasswordController = async function(req, res, next){
    try {
        const { email } = req.body;
        if(!email){
            return next(new CustomError("Email is Incorrect, please correct the email", 400));
        };

        const ResetUser = await UserModel.findOne({email});
        if(!ResetUser){
            return next(new customers("ResetUser is not found", 400));
        };

        const RawToken = JWT.sign({ id: ResetUser._id}, process.env.JWT_RAW_SECRET, {expiresIn: "10m"});

        const ResetLink = `http://localhost:3000/user/reset-password/${RawToken}`;

        const EmailTemplate = ResetPasswordConformationTemplate(req.user.username, ResetLink);
        await sendMail(process.env.EMAIL_SEND_USER, "Reset Password", EmailTemplate);

        res.status(200).json({success: true, message: "Reset password link shared on your email, please check your email.", data: ResetLink});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

module.exports = {
    RegisterController,
    LoginController,
    LogOutController,
    CurrentUserController,
    UpdateUserController,
    ResetPasswordController,
};
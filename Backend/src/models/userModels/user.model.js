const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
        maxLength: 10,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    IsAdmin:{
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.generateToken = async function(){
    const token = JWT.sign({ id: this._id }, process.env.JWT_SECRET,{expiresIn: "1h"});

    if(!token) throw new Error("error generating token");
    return token;
};

UserSchema.statics.authenticateUser = async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not Found");

    const MatchedUser = await bcrypt.compare(password, user.password);
    if(!MatchedUser) throw new Error("Email or Password is incorrect");
    return user;
};



module.exports = mongoose.model("User", UserSchema);
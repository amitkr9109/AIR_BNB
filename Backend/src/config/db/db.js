const mongoose = require("mongoose");

const connectToDB = async function(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/air_bnb`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("error connect to database",error);
    }
}

module.exports = connectToDB;
const nodemailer = require("nodemailer");
const CustomError = require("../utils/customError.js");

const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


const sendMail = function(to, subject, htmlContent){
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent,
    };

    return new Promise(function(resolve, reject){
        Transporter.sendMail(mailOptions, function(err, info){
            if(err){
                reject(err);
            }
            else{
                resolve("Information sucessfully ", info)
            }
        });
    })
};

module.exports = sendMail;
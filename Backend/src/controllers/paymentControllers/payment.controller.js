const BookingModel = require("../../models/bookingModels/booking.model.js");
const CustomError = require("../../utils/customError.js");
const PaymentInstance = require("../../services/payment.service.js");
const crypto = require("crypto");
const { PaymentConformationTemplate } = require("../../utils/emailTemplate.js");
const sendMail = require("../../utils/email.js");

const ProcessPaymentController = async function(req, res, next){
    try {
        const { Amount, Currency, bookingId } = req.body;
        if(!Amount || !Currency || !bookingId){
            return next(new CustomError("All fields are required", 400));
        }

        const Options = {
            amount: Amount * 100,
            currency: Currency && "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        const PaymentProcess = await PaymentInstance.orders.create(Options);
        if(!PaymentProcess){
            return next(new CustomError("Error in Processing Payment", 400));
        }

        await BookingModel.findByIdAndUpdate(bookingId, {
            Razorpay_Orderid: PaymentProcess.id,
        })

        res.status(200).json({success: true, data: PaymentProcess});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const VerifyPaymentController = async function(req, res, next){
    try {
        const { Razorpay_Order_Id, Razorpay_Payment_Id, Razorpay_Signature } = req.body;
        if(!Razorpay_Order_Id || !Razorpay_Payment_Id || !Razorpay_Signature){
            return next(new CustomError("All fields are required", 400));
        }

        console.log("Incoming verify payload:", req.body);

        const PaymentVerify = await BookingModel.findOne({ 
            Razorpay_Orderid: Razorpay_Order_Id 
        }).populate("user_id", "username email").populate("Property", "Location");

        if(!PaymentVerify){
            console.error("Booking not found for order ID:-", Razorpay_Order_Id);
            return next(new CustomError("Payment Verification failed !", 404));
        }

        const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${Razorpay_Order_Id}|${Razorpay_Payment_Id}`)
        .digest("hex");
        
        if(generatedSignature !== Razorpay_Signature){
            return next(new CustomError("Verification failed, Payment declined", 400));
        }

        PaymentVerify.Status = "Completed";

        PaymentVerify.Payment_Details = {
            Order_id: Razorpay_Order_Id,
            Payment_id: Razorpay_Payment_Id,
            Signature: Razorpay_Signature,
        };

        await PaymentVerify.save();

        const EmailTemplate = PaymentConformationTemplate(
            req.user.username,
            PaymentVerify.Property.Location,
            PaymentVerify.Status,
            PaymentVerify.TotalPrice,
        );


        await sendMail(process.env.EMAIL_SEND_USER, "Booking and Payment Completed", EmailTemplate);

        res.status(200).json({success: true, message: "Booking and Payment Completed", data: PaymentVerify});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};


module.exports = {
    ProcessPaymentController,
    VerifyPaymentController,
};
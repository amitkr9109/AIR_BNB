const { error } = require("winston");
const BookingModel = require("../../models/bookingModels/booking.model.js");
const PropertyModel = require("../../models/propertyModels/property.model.js");
const PaymentInstance = require("../../services/payment.service.js");
const CustomError = require("../../utils/customError.js");
const { BookingConformationTemplate } = require("../../utils/emailTemplate.js");
const sendMail = require("../../utils/email.js");


const BookingCreateController = async function(req, res, next){
    try {
        const { propertyShow_id, Checkin_date, Checkout_date, TotalPrice } = req.body;

        const propertyFind = await PropertyModel.findById(propertyShow_id);
        if(!propertyFind){
            return next(new CustomError("Property Id not found !", 400));
        }

        if(!propertyShow_id && !Checkin_date && !Checkout_date && !TotalPrice){
            return next(new CustomError("All fields are required", 400));
        }

        const BookingCreate = await BookingModel.create({
            Property: propertyShow_id,
            user_id: req.user._id,
            Checkin_date,
            Checkout_date,
            TotalPrice,
            Status: "Pending",
        });

 
        const Options = {
            amount: TotalPrice * 100,
            currency: "INR",
            receipt: `Receipt ${BookingCreate._id}`,
            payment_capture: 1,
        };

        const RazorpayOrder = await PaymentInstance.orders.create(Options);

        BookingCreate.Razorpay_Orderid = RazorpayOrder.id;
        await BookingCreate.save();

        const populatedBooking = await BookingModel.findById(BookingCreate._id).populate("Property", "Title Location Images")

        const BookingTemplate = BookingConformationTemplate(
            req.user.username,
            populatedBooking.Property.Location,
            Checkin_date,
            Checkout_date,
            RazorpayOrder,
        );

        await sendMail(process.env.EMAIL_SEND_USER, "Booking conformed", BookingTemplate);

        res.status(200).json({ success: true, data: populatedBooking, amount: TotalPrice });
        
    } catch (error) {
        next (new CustomError(error.message, 500));
    }
};

const BookingViewController = async function(req, res, next){
    const {id} = req.params;

    try {
        if(!id) return next(new CustomError("Booking id not found !", 404));

        const BookingView = await BookingModel.findOne({user_id: id}).populate(
            "user_id",
            "username email"
        );
        if(!BookingView){
            return next(new CustomError("Bookings details not found", 404));
        }

        res.status(200).json({message: "Booking details fetched", Viewdata: BookingView});
    } catch (error) {
        next (new CustomError(error.message, 500));
    }
};

const BookingCancelController = async function(req, res, next){
    try {
       const {id} = req.params;
       if(!id) return next(new CustomError("Booking Id not found !", 404));

       const BookingDelete = await BookingModel.findById(id).populate("Property");
       if(!BookingDelete){
        return next(new CustomError("Booking not Found !", 404));
       }
       
       if(BookingDelete.user_id.toString() !== req.user._id.toString()){
        return next(new CustomError("Don't Matched User, so Unauthorized User", 401));
       }

       BookingDelete.Status = "Cancelled";
       await BookingDelete.save();

       res.status(200).json({success: true, message: "Booking Cancelled Successfully", bookingCancelData: BookingDelete});

    } catch (error) {
        next (new CustomError(error.message, 500));
    }
};


module.exports = {
    BookingCreateController,
    BookingViewController,
    BookingCancelController,
};
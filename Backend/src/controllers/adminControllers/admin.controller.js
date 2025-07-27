const UserModel = require("../../models/userModels/user.model.js");
const CustomError = require("../../utils/customError.js");
const PropertyModel = require("../../models/propertyModels/property.model.js");
const BookingModel = require("../../models/bookingModels/booking.model.js");

const GetAllUserController = async function (req, res, next) {
  try {
    const allUser = await UserModel.find();
    res.status(200).json({ success: true, message: "Users fetched successfully", AllUserdata: allUser });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const DeleteAllUserController = async function(req, res, next){
  try {
    const {id} = req.params;
    const allUser = await UserModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted successfully"});
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const GetAllPropertyController = async function(req, res, next){
  try {
    const allProperties = await PropertyModel.find();
    res.status(200).json({ success: true, message: "All Properties fetched", AllPropertyData: allProperties });
  } catch (error) {
   next(new CustomError(error.message, 500)); 
  }
};

const DeleteAllPropertyController = async function(req, res, next){
  try {
    const {id} = req.params;
    const allProperties = await PropertyModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Property Deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const GetAllBookingController = async function(req, res, next){
  try {
    const allbookings = await BookingModel.find();
    res.status(200).json({success: true, message: "All Bookings fetched successfully", AllBookingData: allbookings});

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const DeleteAllBookingController = async function(req, res, next){
  try {
    const {id} = req.params;
    const allbookings = await BookingModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Booking Deleted succesfully" });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
    GetAllUserController,
    DeleteAllUserController,
    GetAllPropertyController,
    DeleteAllPropertyController,
    GetAllBookingController,
    DeleteAllBookingController,
};
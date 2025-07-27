const ReviewModel = require("../../models/reviewModels/review.model.js");
const PropertyModel = require("../../models/propertyModels/property.model.js");
const BookingModel = require("../../models/bookingModels/booking.model.js");
const CustomError = require("../../utils/customError.js");


const CreateReviewController = async function(req, res, next){
    try {
        const{ Ratings, Comment, Property_id } = req.body;
        if(!Ratings || !Comment || !Property_id){
            return next(new CustomError("All Fields are required", 400));
        }

        const BookingFind = await BookingModel.findOne({ user_id: req.user._id });
        if(!BookingFind){
            return next(new CustomError("Booking not fount", 400));
        }

        const ReviewCreate = await ReviewModel.create({
            Property: Property_id,
            User: req.user._id,
            Ratings,
            Comment,
        });
        if(!ReviewCreate){
            return next(new CustomError("Error in review create", 400));
        }

        res.status(200).json({ success: true, message: "Review create successfully", ReviewCreatedata: ReviewCreate });
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const ReadReviewController = async function(req, res, next){
    try {
        const { id } = req.params;
        if(!id){
            return next(new CustomError("Review id not fount", 400));
        }

        const ReviewShowing = await ReviewModel.findById(id);
        if(!ReviewShowing){
            return next(new CustomError("Error in Review Showing", 400));
        }

        res.status(200).json({ success: true, message: "Review showing successfully", ReviewShowingdata: ReviewShowing });

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const UpdateReviewController = async function(req, res, next){
    try {
        const { id } = req.params;
        if (!id){
            return next(new CustomError("Review id not fount", 400));
        }

        const ReviewUpdate = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate("Property");
        if (!ReviewUpdate){
            return next(new CustomError("Error in Updating Review", 400));
        }

        res.status(200).json({ success: true, message: "Review Updated successfully", data: ReviewUpdate });

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const DeleteReviewController = async function(req, res, next){
    try {
        const { id } = req.params;
        if(!id){
            return next(new CustomError("Review id not fount", 400));
        }

        const ReviewDelete = await ReviewModel.findByIdAndDelete(id);
        if (!ReviewDelete){
            return next(new CustomError("Error in Review Delete", 400));
        }

        res.status(200).json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const AllReadReviewController = async function(req, res, next){
    try {
        const { id } = req.params;
        if(!id){
            return next(new CustomError("Review id not fount", 400));
        }

        const AllReviewShowing = await ReviewModel.find({Property: id}).populate("User", "username email");
        if(!AllReviewShowing){
            return next(new CustomError("Error in Review Showing", 400));
        }

        res.status(200).json({ success: true, message: "Review showing successfully", AllReviwData: AllReviewShowing });

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

module.exports = {
    CreateReviewController,
    ReadReviewController,
    UpdateReviewController,
    DeleteReviewController,
    AllReadReviewController,
};
const PropertyModel = require("../../models/propertyModels/property.model.js");
const CustomError = require("../../utils/customError.js");


const PropertyCreateController = async function(req, res, next){

    try {
        const {Title, Description, Location, Price, Amenities, Images} = req.body;

        if(!Title && !Description && !Location && !Price && !Amenities && ! Images){
            return next(new CustomError("All fields are required", 400));
        }

        const createProperty = await PropertyModel.create({ 
            Title,
            Description, 
            Location, 
            Price, 
            Amenities, 
            Images,
            Host: req.user._id, 
        });

        if(!createProperty){
            return next(new CustomError("Error in Creating Property", 400));
        }

        res.status(201).json({message: "Property Created Successfully", Createdata: createProperty});
        
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};


const PropertyViewController = async function(req, res, next){

    try {
        const {id} = req.params;

        if(!id) return next(new CustomError("Property id is required", 400));

        const PropertyView = await PropertyModel.findById(id);
        if(!PropertyView){
            return next(new CustomError("Error in Fetching PropertyView", 400));
        }

        res.status(200).json({message: "PropertyView Fetched successfully", Viewdata: PropertyView});
        
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};


const PropertyUpdateController = async function(req, res, next){

    try {
        const {id} = req.params;

        if(!id) return next(new CustomError("Property id is required", 400));

        const PropertyUpdate = await PropertyModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!PropertyUpdate){
            return next(new CustomError("Error in Updating Property", 400));
        }

        res.status(200).json({message: "Property Updated successfully", Updatedata: PropertyUpdate});

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const PropertyDeleteController = async function(req, res, next){

    try {
        const {id} = req.params;

        if(!id) return next(new CustomError("Property id is required", 400));

        const PropertyDelete = await PropertyModel.findByIdAndDelete(id);

        if(!PropertyDelete){
            return next(new CustomError("Error in Deleting Property", 400));
        }

        res.status(200).json({message: "Property Deleted successfully"});

    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};

const PropertySearchController = async function(req, res, next){

    try {
        const { Location, MinPrice, MaxPrice } = req.body;

        const query = {
            ...(Location && { Location: {$regex: Location, $options: "i"}}),
            ...(MinPrice && { Price: {$gte: MinPrice}}),
            ...(MaxPrice && {Price: {$lte: MaxPrice}}),
        }

        const PropertySearch = await PropertyModel.find(query);

        if(!PropertySearch || PropertySearch.length === 0){
            return next(new CustomError("No Valid Propert name and price", 400));
        }

        res.status(200).json({message: "Property Searching Successfully", Searchdata: PropertySearch});

    } catch (error) {
        return next(new CustomError(error.message, 500)); 
    }
};


const PropertyAllViewController = async function(req, res, next){

    try {
        const PropertyView = await PropertyModel.find();
        if(!PropertyView){
            return next(new CustomError("Error in Fetching All PropertyView", 400));
        }

        res.status(200).json({message: "PropertyView Fetched successfully", AllViewdata: PropertyView});
        
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

module.exports = {
    PropertyCreateController,
    PropertyViewController,
    PropertyUpdateController,
    PropertyDeleteController,
    PropertySearchController,
    PropertyAllViewController,
};
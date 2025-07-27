const Logger = require("../utils/logger.js");

const ErrorHandler = async function (err, req, res, next) {
    Logger.error(`${err.status || 500} - ${err.message} - ${req.method} - ${req.originalUrl} - ${req.ip}`);
    res.status(err.status || 500).json({success: false, message: err.message || "Internal server error"});
};

module.exports = ErrorHandler;
const ErrorHander = require('../utils/errorhander');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // WRONG MONGODB ID ERROR
    if (err.name === "CastError") {
        const message = `resource not found. Invalid ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // MONGOOSE DUPLICATE KEY ERROR

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHander(message, 400);
    }

    // WRONG JWT ERROR
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web token is Invalid, Try Again`;
        err = new ErrorHander(message, 400);
    }

    // JWT EXPIRE ERROR
    if (err.name === "TokenExpiredError") {
        const message = `Json Web token is Expired, Try Again`;
        err = new ErrorHander(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })


}
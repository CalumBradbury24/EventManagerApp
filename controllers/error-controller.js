const globalErrorHandler = ((error, req, res, next) => {
    let statusCode;
    if (error.statusCode >= 100 && error.statusCode < 600) statusCode = error.statusCode || 500;
    else statusCode =  500;//Deal with pug error codes
    console.log('global error handler says->', error.message)
    res.status(statusCode).json({
        status: error.status,
        message: error.message
    });
    next();
});

module.exports = globalErrorHandler; 
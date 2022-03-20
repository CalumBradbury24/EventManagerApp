const logger = require('../utils.js/logger');
const globalErrorHandler = ((error, req, res, next) => {
    let statusCode;

    if (error.statusCode >= 100 && error.statusCode < 600) statusCode = error.statusCode || 500;
    else statusCode = 500;//Deal with pug error codes
    
    res.status(statusCode).json({
        status: error.status,
        message: error.message
    });

    logger.http({"Route": `${req.method} ${req.originalUrl}`, "Response Code": statusCode, "Response message": error.fullError});
    next();
});

module.exports = globalErrorHandler; 
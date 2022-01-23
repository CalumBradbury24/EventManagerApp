const AppError = require('../utils.js/app-error');
const connection = require('../utils.js/sql-config');

//EVENTS SEARCH ONLY RETURNS EVENTS NOT MARKED AS PUBLIC UNLESS USER IS LOGGED IN?
const getRecommendedEvents = (req, res, next) => {
    connection.query(`select * from eventifyEvents`, (err, rows) => {
        if(err) return next(new AppError('Error fetching recommended events', 400));
        res.json({success: true, data: rows || []});
    });
}

module.exports = {
    getRecommendedEvents
}
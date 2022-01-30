const AppError = require('../utils.js/app-error');
const connection = require('../utils.js/sql-config');

//EVENTS SEARCH ONLY RETURNS EVENTS NOT MARKED AS PUBLIC 


const getRecommendedEvents = (req, res, next) => {
    const countryID = +req.user?.country || 0; //Maybe include state and city ?
    const where = [], params = [];
    if(countryID){
        where.push('and countryID = ?');
        params.push(countryID);
    } 
    connection.query(`select * from eventifyEvents where ifnull(deleted, 0) = 0 and publicEvent = 1 ${where ? where.join() : ''} order by rand() limit 5;`, params, (err, rows) => {
        if(err) return next(new AppError('Error fetching recommended events', 400));
        res.json({success: true, data: rows || []});
    });
}

module.exports = {
    getRecommendedEvents
}
const AppError = require('../utils.js/app-error');
const connection = require('../utils.js/sql-config');
//EVENTS SEARCH ONLY RETURNS EVENTS NOT MARKED AS PUBLIC 


const getEventTypes = (req, res, next) => {
    connection.query(`select * from eventTypes`, (err, rows) => {
    if(err) return next(new AppError(err, 'Error fetching event types', 400));
    res.json({success: true, data: rows || []});
});
}

const getRecommendedEvents = (req, res, next) => {
    const countryID = +req.user?.country || 0; //Maybe include state and city ?
    const where = [], params = [];
    // if(countryID){
    //     where.push('and countryID = ?');
    //     params.push(countryID);
    // } 
    connection.query(`select eventifyEvents.*, eventTypes.eventTypeName, eventTypes.image, countries.countryName, states.stateName, currency.name currencyName, 
        currency.symbol currencySymbol, currency.code currencyCode
        from eventifyEvents
        left join eventTypes on eventTypes.eventTypeID = eventifyEvents.eventTypeID
        left join countries on countries.countryID = eventifyEvents.countryID
        left join states on states.stateID = eventifyEvents.stateID
        left join currency on currency.currencyID = eventifyEvents.currencyID
        where ifnull(eventifyEvents.deleted, 0) = 0 and eventifyEvents.publicEvent = 1 ${where ? where.join() : ''} 
        -- order by rand() limit 10;`, params, (err, rows) => {
        if(err) return next(new AppError(err, 'Error fetching recommended events', 400));
        
        res.json({success: true, data: rows || []});
    });
}

module.exports = {
    getEventTypes,
    getRecommendedEvents
}
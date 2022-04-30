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
    const where = [], params = [req.user.userID];
    // if(countryID){
    //     where.push('and countryID = ?'); //comment in when done teesting recommended events
    //     params.push(countryID);
    // } 
    connection.query(`select eventifyEvents.*, eventTypes.eventTypeName, eventTypes.image, countries.countryName, states.stateName, currency.name currencyName, 
        currency.symbol currencySymbol, currency.code currencyCode,
        (select 1 from favouriteEvents where favouriteEvents.eventID = eventifyEvents.eventID and userID = ?) as favouriteEvent
        from eventifyEvents
        left join eventTypes on eventTypes.eventTypeID = eventifyEvents.eventTypeID
        left join countries on countries.countryID = eventifyEvents.countryID
        left join states on states.stateID = eventifyEvents.stateID
        left join currency on currency.currencyID = eventifyEvents.currencyID
        where ifnull(eventifyEvents.deleted, 0) = 0 and eventifyEvents.publicEvent = 1 ${where ? where.join() : ''} 
        order by rand() limit 10;`, params, (err, rows) => {
        if(err) return next(new AppError(err, 'Error fetching recommended events', 400));
        
        res.json({success: true, data: rows || []});
    });
}

const updateFavouriteEvent = (req, res, next) => {
    const eventID = +req.body.eventID || 0;

    if(!eventID) return next(new AppError('', 'Error updating event', 400));

    connection.query(`select * from favouriteEvents where eventID = ? and userID = ?`, [eventID, req.user.userID], (err, rows) => {
        if (err) return next(new AppError(err, 'Error updating favourite event', 400));
        if(rows && rows.length){
            connection.query(`insert into favouriteEvents (userID, eventID) values (?, ?)`, [req.user.userID, eventID], (err) => {
                if(err) return next(new AppError(err, 'Error adding favourite event', 400));
                res.json({success: true});
            });
        }
        else {
            connection.query(`delete from favouriteEvents where userID = ? and eventID = ?`, [req.user.userID, eventID], (err) => {
                if(err) return next(new AppError(err, 'Error deleting favourite event', 400));
                res.json({success: true});
            });
        }
    });
}

module.exports = {
    getEventTypes,
    getRecommendedEvents,
    updateFavouriteEvent
}
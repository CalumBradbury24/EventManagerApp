const express = require("express");
const eventsRouter = express.Router();
const eventsController = require('../controllers/events-controller');
const authController = require('../controllers/auth-controller');

eventsRouter.use(authController.isLoggedIn);//Apply middleware to all routes below
eventsRouter.route('/types').get(eventsController.getEventTypes);
eventsRouter.route('/recommended').get(eventsController.getRecommendedEvents);
eventsRouter.route('/favourite').put(eventsController.updateFavouriteEvent);
eventsRouter.route('/upcoming').get(eventsController.getUpcomingEvents);

module.exports = eventsRouter;
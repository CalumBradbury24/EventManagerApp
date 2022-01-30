const express = require("express");
const eventsRouter = express.Router();
const eventsController = require('../controllers/events-controller');
const authController = require('../controllers/auth-controller');

eventsRouter.route('/recommended').get(authController.isLoggedIn, eventsController.getRecommendedEvents);

module.exports = eventsRouter;
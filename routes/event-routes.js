const express = require("express");
const eventsRouter = express.Router();
const eventsController = require('../controllers/events-controller');

eventsRouter.route('/recommended').get(eventsController.getRecommendedEvents);

module.exports = eventsRouter;
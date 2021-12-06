const express = require("express");
const FAQsRouter = express.Router();
const FAQsController = require('../controllers/faqs-controller');

FAQsRouter.route('/common').get(FAQsController.getGeneralFAQs);
FAQsRouter.route('/search/:search').get(FAQsController.getFAQsSearch);

module.exports = FAQsRouter;
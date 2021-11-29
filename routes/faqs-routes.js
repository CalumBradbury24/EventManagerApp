const express = require("express");
const FAQsRouter = express.Router();
const FAQsController = require('../controllers/faqs-controller');

FAQsRouter.route('/common').get(FAQsController.getGeneralFAQs);

module.exports = FAQsRouter;
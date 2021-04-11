const express = require("express");
const router = express.Router();
const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');

router.route('/').get(authController.isLoggedIn, viewController.getSplashPage);
router.route('/login').get(viewController.getLoginForm);
router.route('/home').get(authController.isLoggedIn, viewController.getHomePage);

module.exports = router;
const express = require("express");
const router = express.Router();
const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');


router.route('/login').get(viewController.getLoginForm);

router.use(authController.isLoggedIn);//Apply middleware to all routes below
router.route('/').get(viewController.getSplashPage);
router.route('/home').get(viewController.getHomePage);
router.route('/my-account').get(viewController.getMyAccount);

module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');

//These are routes  related to user activities such as logging in and changing password etc
//protect function is middleware for adding current user to req to be used in backend queries

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signUp);
router.route('/logout').get(authController.logout);

router.route('/update-profile').patch(
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUserProfile) //patch is for updating a resource

    module.exports = router;
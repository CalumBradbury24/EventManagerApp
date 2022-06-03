const jwt = require('jsonwebtoken');
const { promisify } = require("util"); //Node built in function that contains the promisify method to make a method return a promise, thus can use async/await
const AppError = require('./app-error');

//arguments- users id, Secret for encrypting the signiture, object of options
exports.signJWT = (userID, options = {}) => { //Create a jwt out of the user id and the secret
    return jwt.sign({id: userID}, process.env.JWT_SECRET, {
        ...(options && options), //Options could be undefined so this ensures its only spread in if it is defined
        expiresIn: process.env.JWT_COOKIE_EXPIRES_IN
    });
}

exports.verifyJWT = async (token) => {
    try{
        //Promisify makes jwt.verify return a promise which can be awaited (rather than having to use a callback function as the third argument)
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        return decoded;
    }catch(err){
        return next(new AppError('Error validating user', 401))
    }
}

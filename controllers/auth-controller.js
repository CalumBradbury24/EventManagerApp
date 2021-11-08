const connection = require('../utils.js/sql-config');
const { catchAsyncErrors } = require('../utils.js/utilities');
const jwt = require('jsonwebtoken');
const AppError = require('../utils.js/app-error');
const { promisify } = require("util"); //Node built in function that contains the promisify method to make a method return a promise, thus can use async/await
const bcrypt = require('bcryptjs');
const validate = require('../utils.js/validator');
//Authentication with jwt
//1)User logs in with email/password with POST request
//2)If user and password are valid, server sends back to client a newly created jwt
//3)User can then access protected routes with valid jwt token in the header or cookies e.g GET /someProtectedRoute
//4)If jwt in request is valid, server sends back protected data to client

const signToken = (userID) => {
    //arguments- users id, Secret for encrypting the signiture, object of options
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }); //Create a jwt out of the user id and the secret
};

const createAndSendJWT = (user, statusCode, req, res) => {
    const jwt = signToken(user.userID);

    //Can see this in the cookie tab in postman
    const cookieOptions = {
        //set config options for jwt cookie
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ), //Convert to milliseconds
        httpOnly: true, //Cookie cannot be accessed or modified in any way by the browser
    };
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;  //Send on encrypted connection (using HTTPS), - only want this when in production
    //Send JWT as a cookie - A cookie is a small piece of text that a server can send to clients,
    //when the client's browser receives the cookie it will automatically be stored and sent back in all future requests to the server it came from
    res.cookie("jwt", jwt, cookieOptions); //Send jwt as cookie to browser

    //Remove password from the response output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        jwt, //Give the user a new jwt so that they are allowed access to protected routes
        user,
    });
}

const login = catchAsyncErrors(async (req, res, next) => {
    let { email, password } = req.body;
    email = '' + email || '';
    password = '' + password || '';
    if (!email || !password) return next(new AppError('Please provide a username and password', 400))

    const user = await loginPromise(email);

    //if user logged in successfully, send jwt
    if(await bcrypt.compare(password, user.password)) createAndSendJWT(user, 200, req, res);
    else return next(new AppError('Incorrect email or password', 401))

}, 'login');

const loginPromise = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from users where email = ?`, [email], (error, rows) => {
            if (error) {
                reject(new AppError('Login error', 400))
                return
            } else if (!rows.length) {
                reject(new AppError('Incorrect email or password', 401))
                return
            }
            else resolve(rows[0])
        })
    })
}

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
};

const signUp = catchAsyncErrors( async (req, res, next) => {
    let { fname, lname, email, password, passwordConfirm } = req.body;
    if (!fname || !lname || !email || !password || !passwordConfirm) return next(new AppError('Missing required details', 401));
    if(password !== passwordConfirm) return next(new AppError('Passwords do not match', 401));

    if(!validate.validatePassword(password, passwordConfirm)) return next(new AppError('Password is not strong enough', 400))
    if(!validate.validateEmail(email)) return next(new AppError('Email is not valid', 400))
    fname = fname.trim(); //remove whitespace
    lname = lname.trim();

    password = await bcrypt.hash(password, 12);
    //check email used to sign up does not already have an account
    connection.query(`select * from users where email = ?`, email, (err, rows) => {
        if (err) return next(new AppError(err, 400));
            if(rows && rows.length) return next(new AppError('There already exists a user under this email address', 400));
                connection.query(`insert into users set firstName = ?, lastName = ?, email = ?,
                    password = ?, created = ?`, [fname, lname, email, password, '20/02/1995'], (error) => {
                    if (error){
                        console.log(error);
                        return next(new AppError('Error creating new user :(', 400));
                    }
                    res.status(200).json({
                        status: 'success',
                        message: 'User created!'
                    });
                });
    });
}, 'signup');

//Gets jwt from cookie in browser to validate current user before letting the user access pages in the website
//If user is logged in then the user object is created for the pug files, otherwise there will be no user for pug files
const isLoggedIn = catchAsyncErrors(async (req, res, next) => {
    console.log('checking user is logged in...')

    //verify jwt
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        ); //Promisify makes jwt.verify return a promise which can be awaited (rather than having to use a callback function as the third argument)

        console.log('decoded jwt->', decoded)

        //check if user still exists and hasn't been deleted, decoded.iat is issued at time
        let validatedCurrentUser = await validateUser(decoded.id);
        if (!validatedCurrentUser) return next(new AppError('User does not exist', 401))

        //TODO: Check if user changed password after the jwt was issued to make sure they have to log back in again and get a new jwt

        /*res.locals contains response local variables scoped to the request, they are available only to the view(s) 
        rendered during the request / response cycle (if any)*/
        res.locals.user = validatedCurrentUser;

        /*res.locals.user looks like ->
        {
        userID: 1,
        userTypeID: 1,
        firstName: 'Calum',
        lastName: 'Bradbury',
        email: 'cs.bradbury@outlook.com',
        password: '$2a$12$LkSMsz96DkoVa2xU8UJP3uH6EM3O9eM9lhkkchXX6SyMFf54EgeCS',
        created: '20/02/1995',
        deleted: 0,
        deletedAt: null,
        contactNumber: '7383514483',
        address: '58 Priory Walk',
        city: 'LEICESTER',
        state: 'Leicestershire',
        country: 'LE3 3PP',
        postCode: 'United Kingdom',
        userImage: default.jpeg
        } and is accessible in all pug files*/

        return next();
    }
    next(); //This allows for rendering the page just without user details applied etc
}, 'isLoggedIn')

const validateUser = (decodedUserID) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from users where deleted = 0 and userID = ?`, decodedUserID, (error, rows) => {
            if (error) reject(new AppError('Error finding user', 404));
            else resolve(rows[0])
        })
    })
}
//Middleware to validate current user and add him to the req object
const protect = catchAsyncErrors(async (req, res, next) => {
    // 1) Get jwt token and check it exists
    let token = req.cookies.jwt;

    //If there is no token then the user hasn't logged in and received one
    if (!token) {
      return next(new AppError("You are not logged in.", 401)); //401 - unauthorized
    }

    //2) validate jwt token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //Promisify makes jwt.verify return a promise which can be awaited (rather than having to use a callback function as the third argument)

    //3) Check if user still exists
    //If user has been deleted but the jwt still exists, we don't want to log the user in!
    //Or if the user has changed his password after the jwt has been issued, the old token should no longer be valid!
    //Check user still exists
    const validatedUser = await validateUserOnLoginPromise(decoded.id);
    if (!validatedUser) return next(new AppError("The user belonging to this token no longer exists", 401));

    // //4) Check if user changed password after the jwt was issued
    // if (freshUser.changedPasswordAfterJWTSent(decoded.iat)) {
    //   //iat = issued at
    //   return next(
    //     new AppError("User recently changed password! Please log in again", 401)
    //   );
    // }

    //GRANT ACCESS TO PROTECTED ROUTE
    //If user has valid jwt token then go to next middleware 
    req.user = validatedUser; //Store current user details in req.user
    next();
}, 'authController.protect');

const fetchValidUser = catchAsyncErrors(async (req, res, next) => {
     // 1) Get jwt token and check it exists
        let token = req.cookies.jwt;
console.log('token->', token);
        //If there is a token then the user is logged in
        if (!!token) {
            //2) validate jwt token
            const decodedJWT = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //Promisify makes jwt.verify return a promise which can be awaited (rather than having to use a callback function as the third argument)
            const validatedUser = await validateUser(decodedJWT.id);
            if (!validatedUser) return next(new AppError("The user belonging to this token no longer exists", 401));

            //TODO: Check if user changed password after the jwt was issued to make sure they have to log back in again and get a new jwt
            delete validatedUser.password;
            res.status(200).json({
                status: "success",
                validatedUser: validatedUser,
            });
        } else { //If no token send back no user data
            console.log('sending response');
            res.status(200).json({});
        }
}, 'authController.fetchValidUser');


module.exports = {
    login,
    signUp,
    isLoggedIn,
    logout,
    protect,
    fetchValidUser
}

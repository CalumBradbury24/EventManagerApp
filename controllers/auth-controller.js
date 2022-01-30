const connection = require('../utils.js/sql-config');
const { catchAsyncErrors } = require('../utils.js/utilities');
const AppError = require('../utils.js/app-error');
const bcrypt = require('bcryptjs');
const validate = require('../utils.js/validator');
const { signJWT, verifyJWT } = require('../utils.js/jwt-utils');
//Authentication with jwt
//1)User logs in with email/password with POST request
//2)If user and password are valid, server sends back to client a newly created jwt
//3)User can then access protected routes with valid jwt token in the header or cookies e.g GET /someProtectedRoute
//4)If jwt in request is valid, server sends back protected data to client

const createAndSendJWT = (user, statusCode, req, res) => {
    const jwt = signJWT(user.userID);

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

    //If user logged in successfully, send jwt
    if(await bcrypt.compare(password, user.password)) createAndSendJWT(user, 200, req, res);
    else return next(new AppError('Incorrect email or password', 401))

}, 'login');

const loginPromise = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from users where email = ?`, [email], (error, rows) => {
            if (error) return reject(new AppError('Login error', 400));
            else if (!rows.length) return reject(new AppError('Incorrect email or password', 401));
            resolve(rows[0])
        });
    });
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
        //1) Get jwt token and check it exists
        let token = req.cookies.jwt;

        //If there is no token then the user hasn't logged in and received one
        if (!token) return next(); //401 - unauthorized, just go back to home page?
        
        //2) validate jwt token
        const decoded = await verifyJWT(req.cookies.jwt);

        //3) Check if user still exists
        //If user has been deleted but the jwt still exists, we don't want to log the user in!
        //Or if the user has changed his password after the jwt has been issued, the old token should no longer be valid!
        const validatedUser = await validateUser(decoded.id);
        if (!validatedUser) return next(new AppError("The user belonging to this token no longer exists", 401));

        // //4) Check if user changed password after the jwt was issued
        // if (freshUser.changedPasswordAfterJWTSent(decoded.iat)) {
        //   //iat = issued at
        //   return next(
        //     new AppError("User recently changed password! Please log in again", 401)
        //   );
        // }

        /*res.locals contains response local variables scoped to the request, they are available only to the view(s) 
        rendered during the request / response cycle (if any)*/
        res.locals.user = validatedUser;

        //GRANT ACCESS TO PROTECTED ROUTE
        //If user has valid jwt token then go to next middleware 
        req.user = validatedUser; //Store current user details in req.user
        next();
}, 'isLoggedIn')


const validateUser = (decodedUserID) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from users where deleted = 0 and userID = ?`, decodedUserID, (error, rows) => {
            if (error) return reject(new AppError('Error finding user', 404));
            resolve(rows[0]);
        })
    })
}

const fetchValidUser = catchAsyncErrors(async (req, res, next) => {
     // 1) Get jwt token and check it exists
        let token = req.cookies.jwt;
console.log('token->', token);
        //If there is a token then the user is logged in
        if (!!token) {
            //2) validate jwt token
            const decodedJWT = await verifyJWT(req.cookies.jwt);
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
    fetchValidUser
}

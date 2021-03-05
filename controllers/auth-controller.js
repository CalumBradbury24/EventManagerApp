const connection = require('../sql-config');
const { catchAsyncErrors } = require('../utilities');
const jwt = require('jsonwebtoken');
const AppError = require('../Utils.js/app-error');
const { promisify } = require("util"); //Node built in function that contains the promisify method to make a method return a promise, thus can use async/await

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
        //secure: true, //Send on encrypted connection (using HTTPS), - only want this when in production
        httpOnly: true, //Cookie cannot be accessed or modified in any way by the browser
        //secure: (req.secure || req.headers('x-forwarded-proto' === 'https'))//If secure header is set to https set secure=true
    };

    //Send JWT as a cookie - A cookie is a small piece of text that a server can send to clients,
    //when the client's browser receives the cookie it will automatically be stored and sent back in all future requests to the server it came from
    res.cookie("jwt", jwt, cookieOptions); //Send jwt as cookie to browser

    //Remove password from the response output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        jwt, //Give the user a new jwt so that they are allowed access to protected routes
        data: {
            user
        },
    });
}

const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please provide a username and password', 400))

    const user = await loginPromise(email, password);

    //if user logged in successfully, send jwt
    createAndSendJWT(user, 200, req, res);

}, 'login');

const loginPromise = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from Users where email = ? and password = ?`, [email, password], (error, rows) => {
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
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

const signUp = catchAsyncErrors(async (req, res, next) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) next(new AppError('Missing required details', 401));

    await signupPromise(fname, lname, email, password);
    res.status(200).json({
        status: 'success',
        message: 'User created!'
    })
    next();
});

const signupPromise = (fn, ln, email, pass) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into Users set firstName = ?, lastName = ?, email = ?,
        password = ?`, [fn, ln, email, pass], (error) => {
            if (error) {
                reject(new AppError('Sign up error'), 400)
                return
            } else resolve()
        })
    })
}

//Gets jwt from cookie in browser to validate current user before letting the user access pages in the website
const isLoggedIn = catchAsyncErrors(async (req, res, next) => {
    console.log('checking user is logged in...', req.cookies.jwt)

    //verify jwt
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        ); //Promisify makes jwt.verify return a promise which can be awaited (rather than having to use a callback function as the third argument)

        console.log('decoded jwt->', decoded)

        //check if user still exists and hasn't been deleted, decoded.iat is issued at time
        let validatedCurrentUser = await validateUserOnLoginPromise(decoded.id);
        if (!validatedCurrentUser) return next(new AppError('User does not exist', 401))

        //TODO: Check if user changed password after the jwt was issued to make sure they have to log back in again and get a new jwt

        /*res.locals contains response local variables scoped to the request, they are available only to the view(s) 
        rendered during the request / response cycle (if any)*/
        res.locals.user = validatedCurrentUser;
        /*res.locals.user looks like ->
        {
            userID: 1,
            firstName: 'Calum',
            lastName: 'Bradbury',
            email: 'c@b.com',
            password: 'admin123',
            deleted: 0,
            deletedAt: null
        } and is accessible in all pug files*/

        return next()
    }
    //  return next(new AppError('Failed to authorise user', 401)) 
    next()
}, 'isLoggedIn')

const validateUserOnLoginPromise = (decodedUserID) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from Users where deleted = 0 and userID = ?`, decodedUserID, (error, rows) => {
            if (error) reject(new AppError('Error finding user', 404));
            else resolve(rows[0])
        })
    })
}

module.exports = {
    login,
    signUp,
    isLoggedIn,
    logout
}

//TODO
//build log out functionality
//A nice splashscreen that renders depending on whether user is logged in or not
//Build out the tables, probably use laravel for database
//
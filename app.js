const express = require('express');
const morgan = require("morgan");
const path = require('path');
//const cors = require('cors');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require("./controllers/error-controller");
const viewRouter = require('./routes/view-routes');
const userRouter = require('./routes/user-routes');
const AppError = require('./Utils.js/app-error');

// Start express app
const app = express(); //express methods added to app


//Pug config
app.set("view engine", "pug"); //pug is automatically contained in node, doesn't need to be installed
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")));

//Middlewares
//app.use(cors()); //Allow cross origin resource sharing
//app.options('*', cors()); //Do this on all routes *
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "10kb" })); 
app.use(cookieParser()); //Parses data from cookies

console.log("Current environment is:", process.env.NODE_ENV);

//Development logging
if (process.env.NODE_ENV === "development") {
    //USE THESE MIDDLEWARES DURING PRODUCTION ONLY
    app.use(morgan("dev")); //Logs the incoming request method and route, response code, time it took to send back the response and size of the response in bytes
}

app.use((req, res, next) => { res.setHeader( 'Content-Security-Policy', "script-src 'self' cdnjs.cloudflare.com" ); return next(); })

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);

app.all("*", (req, res, next) => {
  //Express assumes next called with an argument is an error and goes to the error handling middleware*/
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); //* means all routes

app.use(globalErrorHandler);

module.exports = app;


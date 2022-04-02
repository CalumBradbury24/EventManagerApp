const express = require('express');
const morgan = require("morgan");
const path = require('path');
//const cors = require('cors');
const cookieParser = require('cookie-parser');
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require('compression');
const logger = require('./utils.js/logger');

const globalErrorHandler = require("./controllers/error-controller");
const viewRouter = require('./routes/view-routes');
const userRouter = require('./routes/user-routes');
const eventsRouter = require('./routes/event-routes');
const FAQsRouter = require('./routes/faqs-routes');

// Start express app
const app = express(); //express methods added to app

//Pug config
app.set("view engine", "pug"); //pug is automatically contained in node, doesn't need to be installed
app.set("views", path.join(__dirname, "views"))

//Use parcel bundler for serving the bundled front end files
app.use(express.static(path.join(__dirname, 'dist')));//where bundled files are served from. in pug this is referenced as /index.js as the /dist part is already referenced here
app.use(express.static(path.join(__dirname, "public"))); //where front end static data is served from

//-----MIDDLEWARES-----

// Set some security HTTP headers
app.use(helmet());

//Rate-limiting middleware to count number of requests from an IP address and block these requests when too many have been received
//Helps protect against DOS and brute force attacks
//if (process.env.NODE_ENV !== "development") {
	const limiter = rateLimit({
		max: 150, //Max number of requests allowed from an IP address in a given time window
		windowMs: 60 * 1000, //1 minute
		message: "Too many requests from this IP, please try again in 1 minute!",
	});
	app.use('/', limiter);
//}
//Data sanitisation against cross-site scripting attacks(XSS)
app.use(xss());

//Prevent parameter pollution - clears up query string with duplicate properties, for example: {{URL}}api/v1/tours?sort=price&sort=duration (will select the last sort and ignore the first one)
app.use(
	hpp({
		whitelist: [
			//Array of properties that are allowed to be duplicated in the query string
			//     "duration",
			//    "ratingsQuantity",
			//    "ratingsAverage",
		],
	})
);

//Middleware to compress all text that is sent to clients on api responses
app.use(compression());

//app.use(cors()); //Allow cross origin resource sharing
//app.options('*', cors()); //Do this on all routes *
app.use(express.urlencoded({ extended: true, limit: '10kb' })) //Parse data from url encoded forms (login etc)
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser()); //Parses data from cookies

console.log("Current environment is:", process.env.NODE_ENV);

//Development logging
// if (process.env.NODE_ENV === "development") {
// 	//USE THESE MIDDLEWARES DURING DEVELOPMENT ONLY
// 	app.use(morgan("dev")); //Logs the incoming request method and route, response code, time it took to send back the response and size of the response in bytes
// } else {
	app.use(morgan(':method :url HTTP/:http-version :status :res[content-length] :response-time ms', { stream: { write: message => logger.log('info', message.trim(), { tags: ['http'] }) } }));
//}

app.use((req, res, next) => {res.setHeader('Content-Security-Policy', "script-src 'self' cdnjs.cloudflare.com"); return next();}) //is this needed?

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/faqs', FAQsRouter);

app.all("*", (req, res, next) => {
	res.status(404).render('page-not-found', {
		title: 'Oops!',
		url: req.originalUrl
	})
	next();
}); //* means all routes

app.use(globalErrorHandler);

module.exports = app;


require("dotenv").config({ path: "./config.env" });
const connection = require('./utils.js/sql-config');
const logger = require('./utils.js/logger');
const https = require('https');
const fs = require('fs')

//HANDLE UNCAUGHT EXCEPTIONS -synchronous errors such as console.log(undefinedVariable) - at top of code so that all errors that come after are caught (otherwise errors before this will be missed/uncaught!)
//Listen to uncaughtException event
process.on("uncaughtException", (error) => {
    logger.error(`Uncaught exception event ocurred: ${error.stack}`);
    process.exit(1);
});

const app = require('./app');

connection.connect((error) => {
    if(error) return logger.error(error);
    logger.info('Connected to mysql server!')
});

const port = process.env.port || 5000;
const server = app.listen(port, () => { //HTTP
    if(process.env.NODE_ENV === 'production') return logger.info(`Server started running on port ${port}`)
    logger.info(`Server running on port ${port}`);
});

// const server = https.createServer( //Requests must be made over https not http
//     {
//         cert: fs.readFileSync('tls-certificates/server.cert'),
//         key: fs.readFileSync('tls-certificates/server.key'),
//     },
//     app).listen(port, () => {
//         logger.info(`Server running on port ${port}`);
//     });

//HANDLE UNHANDLED PROMISE REJECTIONS/asynchronous errors - Deal with unhandled promise rejections such as a failure to connect to the database etc
//subscribe to the unhandledRejection event listener
process.on("unhandledRejection", (error) => {
    logger.error(`Unhandled rejection event ocurred: ${error.stack}`);
    server.close(() => {
        //Server.close gives the server time to finish all the requests that are still processing/pending before closing
        process.exit(1); //Kill server with error code 1(uncaught exception)
    });
});

//An event that can be emmited by heroku and cause the app to close
process.on("SIGTERM", () => {
    logger.error(`SIGTERM RECEIVED. Shutting down gracefully`);
    server.close(() => process.exit(1));
});



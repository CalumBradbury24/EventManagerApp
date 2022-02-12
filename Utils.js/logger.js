const winston = require('winston');

let fomatConsoleLog = winston.format.combine(
	winston.format.colorize({
		all:true
	}),
	winston.format.label({
		label:'[LOGGER]'
	}),
	winston.format.timestamp({
		format:"YY-MM-DD HH:MM:SS"
	}),
	winston.format.printf(
		info => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
	)
);

const AppLogger = winston.createLogger({
	level: 'http', //log only if info.level is less than or equal to this level where 0 = error and 6 = silly log level
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	defaultMeta: { service: 'app-service' }, //Default meta data for logger
	transports: [
		new (winston.transports.Console)({ //log to console too
			format: fomatConsoleLog
		})
	],
});

if (process.env.NODE_ENV === 'production') {
	AppLogger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' })); //Write all logs with importance level of `error` or less to `error.log` (which is only error as this is lowest log level
	AppLogger.add(new winston.transports.File({ filename: 'logs/combined.log', level: 'http' })); //Write all logs with importance level of `http` or less to `combined.log`
}


module.exports = AppLogger;

/* levels:
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');
*/
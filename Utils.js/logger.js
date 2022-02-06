const winston = require('winston');

const AppLogger = winston.createLogger({
	level: 'http', //log only if info.level is less than or equal to this level where 0 = error and 6 = silly log level
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	defaultMeta: { service: 'app-service' }, //Default meta data for logger
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), //Write all logs with importance level of `error` or less to `error.log` (which is only error as this is lowest log level)
		new winston.transports.File({ filename: 'logs/combined.log', level: 'http' }), //Write all logs with importance level of `http` or less to `combined.log`
		new winston.transports.Console() //log to console too
	],
});

module.exports = AppLogger;

/* levels:
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');
*/
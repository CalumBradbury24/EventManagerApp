class AppError extends Error {
    //AppError class inherits from built in error class
    constructor(fullError, message, statusCode) {
        //super(fullError, message); //Super calls the parent constructor of the parent Error class, statusMessage is the only argument the built in error class accepts
        super();

        //Don't need to initialise this.statusMessage as it is passed in super()
        this.fullError = fullError || message; //These properties are used in the error-controller controller function
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
        //this.isOperational = true; //All errors in this class are operational errors (e.g invalid path accessed, invalid user input etc), all errors we create ourselves in the code

        Error.captureStackTrace(this, this.constructor); //Gives where the error was created/occurred. constructor in second argument prevents constructor method from appearing in stack trace when logged
    }
}

module.exports = AppError;
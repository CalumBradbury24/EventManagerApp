exports.catchAsyncErrors = (func, funcThatErrored) => {
    return (req, res, next) => {
        func(req, res, next).catch(error => {
            console.log(`Error occurred in ${funcThatErrored} function. ${error}`);
            next(error);
        })
    }
}


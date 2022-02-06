const connection = require('../utils.js/sql-config');
const { catchAsyncErrors } = require('../utils.js/utilities');
const AppError = require('../utils.js/app-error');
const bcrypt = require('bcryptjs'); //need for updating password functionality
const validator = require('../utils.js/validator')
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage(); //Keep image in memory rather than writing to the disk so that it can be easily accessed in the resizing middleware (doesnt require a read from the disk)

//Only allow user to upload images
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){ //if the mimetype of the file is an image
        cb(null, true);
    } else {
        cb(new AppError('', 'Not an image! Please only upload images', 400), false);
    }
}
const upload = multer( { 
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = (req, res, next) => {
    if(!req.file) return next();
    req.file.filename = `user-${req.user.userID}-${Date.now()}.jpeg`;
    sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }) //Make image a square and reduce quality to 90% to save some storage space
    .toFile(`public/img/users/${req.file.filename}`) //Write image to disk
    next()
}

const updateUserProfile = catchAsyncErrors(async(req, res, next) => {
  //  console.log(req.file)
    console.log(req.body)
    const validatedData = {
        fname: ('' + req.body.fname).trim(), //Cast to string in the case a number is entered and remove whitespace
        lname: ('' + req.body.lname).trim(),
        email: ('' + req.body.email).trim(),
        contactNumber: req.body.contactNumber ? ('' + req.body.contactNumber).trim() : '',
        address: req.body.address ? ('' + req.body.address).trim() : '',
        city: req.body.city ? ('' + req.body.city).trim() : '',
        state: req.body.state ? ('' + req.body.state).trim() : '',
        postcode: req.body.postcode ? ('' + req.body.postcode).trim() : '',
        country: req.body.country ? ('' + req.body.country).trim() : '',
        userPhoto: req.file ? req.file.filename : 'default.jpeg'
    }

    if(!validatedData.fname || !validatedData.lname || !validatedData.email) return next(new AppError('', 'Missing parameters', 400));
    if(!validator.validateEmail(validatedData.email)) return next(new AppError('', 'The entered email is invalid', 400));
    if(validatedData.postcode){
        if(!validator.validatePostCode(validatedData.postcode)) return next(new AppError('', 'The entered postcode is invalid', 400));
    }

    let query = `update users set firstName = ?, lastName = ?, email = ?, contactNumber = ?, address = ?, city = ?, state = ?, country = ?, postCode = ?`
    let params = [validatedData.fname, validatedData.lname, validatedData.email, validatedData.contactNumber, validatedData.address, validatedData.city,
                validatedData.state, validatedData.country, validatedData.postcode,]
    if(req.file){
        query = query.concat(`, userImage = ?`)
        query = query.concat(` where userID = ?`)
        params.push(req.file.filename)
        params.push(req.user.userID)
    } else {
        query = query.concat(` where userID = ?`)
        params.push(req.user.userID)
    }
    console.log(query, params)
    connection.query(query, params, (error) => {
        if(error)return next(new AppError(error, 'Failed to update user details', 500));
        else res.status(200).json({status: 'success', message: 'Details updated successfully!'});
    })
}, 'updateUserProfile')

module.exports = {
    updateUserProfile,
    uploadUserPhoto,
    resizeUserPhoto,
}
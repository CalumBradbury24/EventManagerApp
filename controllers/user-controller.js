const connection = require('../utils.js/sql-config');
const { catchAsyncErrors } = require('../utils.js/utilities');
const AppError = require('../utils.js/app-error');
const bcrypt = require('bcryptjs');

const updateUserProfile = catchAsyncErrors(async(req, res, next) => {
    const validatedData = {
        fname: req.body.fname || '',
        lname: req.body.lname || '',
        email: req.body.email || '',
        contactNumber: req.body.contactNumber || 0,
        address: req.body.address || '',
        city: req.body.city || '',
        state: req.body.state || '',
        postcode: req.body.postcode || '',
        country: req.body.country || '',
    }

    if(!validatedData.fname || !validatedData.lname || !validatedData.email) return next(new AppError('Missing parameters', 400));


    connection.query(`update users set firstName = ?, lastName = ?, email = ?, contactNumber = ?, address = ?, city = ?, state = ?, country = ?, postCode = ?
    where userID = ?`,
    [validatedData.fname, validatedData.lname, validatedData.email, validatedData.contactNumber, validatedData.address, validatedData.city,
    validatedData.state, validatedData.country, validatedData.postcode, req.user.userID], (error) => {
        if(error)return next(new AppError(error, 500));
        else res.status(200).json({status: 'success', message: 'Details updated successfully!'});
    })
}, 'updateUserProfile')


module.exports = {
    updateUserProfile
}
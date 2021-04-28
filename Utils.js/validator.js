const validator = require('validator');

const validateEmail = (e) => {
    console.log(validator.isEmail(e))
    let email = validator.isEmail(e)

    if(email) return true
    else return false
}

const validatePassword = (p, pc) => {
    console.log(validator.isStrongPassword(p, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))
    console.log(validator.isStrongPassword(pc, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))
    let password = validator.isStrongPassword(p, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
    let passwordConfirm = validator.isStrongPassword(pc, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})

    if(password && passwordConfirm) return true
    else return false
}

const validateNames = (fname, lname) => {
    console.log(validator.isEmail(e))
    let email = validator.isEmail(e)
}

//validateSignUpCredentials('Avengedvanhal3n5150!')

module.exports = {
    validateEmail,
    validatePassword
}
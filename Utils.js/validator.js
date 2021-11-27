const validator = require('validator');

const validateEmail = (e) => {
    const email = validator.isEmail(e);
    if(email) return true;
    else return false;
}

const validatePassword = (p, pc) => {
    const password = validator.isStrongPassword(p, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});
    const passwordConfirm = validator.isStrongPassword(pc, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});
    if(password && passwordConfirm) return true;
    else return false;
}

const validatePostCode = (postcode) => validator.isPostalCode(postcode, 'any');

module.exports = {
    validateEmail,
    validatePassword,
    validatePostCode,
}
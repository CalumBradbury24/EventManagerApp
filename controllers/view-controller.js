const connection = require('../utils.js/sql-config');

const getLoginForm = (req, res) => {
    res.status(200).render('login-signup',{
        title: 'Log In or Sign Up'
    })
}

const getHomePage = (req, res) => {
    res.status(200).render('homepage', {
        title: 'Home'
    })
}

const getSplashPage = (req, res) => {
    res.status(200).render('splashpage', {
        title: 'Home'
    })
}

const getMyAccount = (req, res) => {
    res.locals.user.password = ''; //Don't send user password to this page
    res.status(200).render('my-account', {
        title: 'My Account',
    })
}

const getFAQs = (req, res) => {
    res.status(200).render('faqs', {
        title: 'FAQs'
    })
}

module.exports = {
    getLoginForm,
    getHomePage,
    getSplashPage,
    getMyAccount,
    getFAQs
}
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
    res.status(200).render('my-account', {
        title: 'My Account',
    })
}

const getEditProfile = (req, res) => {
    res.status(200).render('edit-profile', {
        title: 'edit-profile'
    })
}

module.exports = {
    getLoginForm,
    getHomePage,
    getSplashPage,
    getMyAccount,
    getEditProfile
}
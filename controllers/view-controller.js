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

const getLandingPage = (req, res) => {
    res.status(200).render('landingpage', {
        title: 'Home'
    })
}


const getSplash = (req, res) => {
    res.status(200).render('splash', {
        title: 'Home'
    })
}


module.exports = {
    getLoginForm,
    getHomePage,
    getLandingPage,
    getSplash
}
import { showAlert, makeAxiosPostRequest, makeAxiosGetRequest } from '../front-end-utilities';

const userState = {}

const login = async (email, password) => {
	try {
        const response = await makeAxiosPostRequest('users/login', { email: email, password: password });

		if(response.data.status === 'success') {
            userState.user = {
                userID : response.data.user.userID,
                userTypeID: response.data.user.userTypeID,
                userImage: response.data.user.userImage,
                firstName : response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                address: response.data.user.address,
                contactNumber: response.data.user.contactNumber,
                city: response.data.user.city,
                country: response.data.user.country,
                created: response.data.user.created,
                postCode: response.data.user.postCode,
                state: response.data.user.state,
                isLoggedIn: true
            }
         //   window.localStorage.setItem('user', JSON.stringify(user));
            return response.data.status;
		}

	} catch (error) {
		console.log('Sign in failed', error); //Message property of response
		showAlert('error', error.response?.data?.message || 'Unknown Error occurred, please try again.');
	}
};

const signUp = async (fname, lname, email, password, passwordConfirm) => {
	try {
		console.log(fname, lname, email, password, passwordConfirm)
		const response = await makeAxiosPostRequest("users/signup", { fname, lname, email, password, passwordConfirm });

		if(response.data.status === 'success') return response.data.status;

	} catch (error) {
		console.log('Sign up failed', error);
		showAlert('error',  error.response.data.message); //Message property of response (with axios error is essentially just the response)
	}
}

const logout = async () => {
	try {
        userState.user = {};
		const response = await makeAxiosGetRequest( 'users/logout');
        if(response.data.status === 'success') return response.data.status;
	} catch (err) {
		console.log('Sign out failed', err); //Message property of response
		showAlert('error', 'Error logging out :(. Please try again.');
	}
};

module.exports = {
    login,
    signUp,
    logout,
    userState
}
import { showAlert, makeAxiosPostRequest, makeAxiosGetRequest } from '../front-end-utilities';

const userState = { user: {} }

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
		console.error('Sign in failed'); //Message property of response
		showAlert('error', error.response?.data?.message || 'Unknown Error occurred, please try again.');
	}
};

const signUp = async (fname, lname, email, password, passwordConfirm) => {
	try {
		console.log(fname, lname, email, password, passwordConfirm)
		const response = await makeAxiosPostRequest("users/signup", { fname, lname, email, password, passwordConfirm });

		if(response.data.status === 'success') return response.data.status;

	} catch (error) {
		console.error('Sign up failed');
		showAlert('error',  error.response.data.message); //Message property of response (with axios error is essentially just the response)
	}
}

const logout = async () => {
	try {
        userState.user = { isLoggedIn: false };
		const response = await makeAxiosGetRequest('users/logout');
        if(response.data.status === 'success') return response.data.status;
	} catch (err) {
		console.error('Sign out failed'); //Message property of response
		showAlert('error', 'Error logging out :(. Please try again.');
	}
};

const fetchValidUser = async() => {
    try {
        const response = await makeAxiosGetRequest('users/fetch-user');

		if(response.data.status === 'success') {
            userState.user = {
                userID : +response.data.validatedUser.userID || 0,
                userTypeID: +response.data.validatedUser.userTypeID || 0,
                userImage: response.data.validatedUser.userImage || '',
                firstName : response.data.validatedUser.firstName || 'Undefined',
                lastName: response.data.validatedUser.lastName || 'Undefined',
                email: response.data.validatedUser.email || 'Undefined',
                address: response.data.validatedUser.address || 'Undefined',
                contactNumber: response.data.validatedUser.contactNumber || 'Undefined',
                city: response.data.validatedUser.city || 'Undefined',
                country: response.data.validatedUser.country || 'Undefined',
                created: response.data.validatedUser.created || 'Undefined',
                postCode: response.data.validatedUser.postCode || 'Undefined',
                state: response.data.validatedUser.state || 'Undefined',
                isLoggedIn: true
            }
            return response.data.status;
		} else {
            userState.user = { isLoggedIn: false };
            return 'success'; //If no user is logged in
        }
	} catch (error) {
		console.error('Fetch valid user details failed'); //Message property of response
		showAlert('error', error.response?.data?.message || 'Unknown Error occurred, please try again.');
        throw new Error('Failed to validate user')
	}
}

module.exports = {
    login,
    signUp,
    logout,
    fetchValidUser,
    userState
}
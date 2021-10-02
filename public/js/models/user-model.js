import { showAlert, makeAxiosPostRequest } from '../front-end-utilities';

const userState = {
    user: {
        userID : 0,
        userTypeID: 0,
        userImage: '',
        firstName : '',
        lastName: '',
        email: '',
        address: '',
        contactNumber: '',
        city: '',
        country: '',
        created: '',
        postCode: '',
        state: ''
    }
}

const login = async (email, password) => {
	try {
        const response = await makeAxiosPostRequest('users/logn', { email: email, password: password });

		if(response.data.status === 'success') {
            console.log(response)
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
                state: response.data.user.state
            }
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


module.exports = {
    login,
    signUp,
    userState
}
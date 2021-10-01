import { showAlert, spinner, makeAxiosPostRequest } from '../front-end-utilities';

export const userState = {
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

const loginContainer = document.querySelector('.login-container-body');
export const login = async (email, password) => {
	spinner(loginContainer); //Maybe move in refactor
	try {
        const response = await makeAxiosPostRequest('users/login', { email: email, password: password });

		if(response.data.status === 'success') {
			showAlert('success', 'Logged in sucessfully!');
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

			//If the response status from the http request is a success
			window.setTimeout(() => {
				//After 1 second load the home page
				location.assign("/home");
			}, 1000);
		}

	} catch (error) {
		console.log('Sign in failed', error); //Message property of response
		showAlert('error', error.response?.data?.message || 'Unknown Error occurred, please try again.');
	}
};


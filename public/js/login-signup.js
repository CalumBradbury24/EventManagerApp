import axios from 'axios';
import { showAlert, spinner } from './Utils'

const loginContainer = document.querySelector('.login-container-body');

export const login = async (email, password) => {
	spinner(loginContainer);
	try {
		const result = await axios({
			method: "POST",
			url: "http://localhost:5000/api/v1/users/login",
			data: {
				email: email,
				password: password,
			},
		});

		if (result.data.status === 'success') {
			showAlert('success', 'Logged in sucessfully!')

			//if the response status from the http request is a success
			window.setTimeout(() => {
				//After 1.5 seconds load the home page
				location.assign("/home");
			}, 1000);
		}
		console.log(result)

	} catch (error) {
		console.log('Sign in failed', error); //Message property of response
		showAlert('error', error.response.data.message);
	}
};

export const signUp = async (fname, lname, email, password, passwordConfirm) => {
	try {
		console.log(fname, lname, email, password, passwordConfirm)
		const result = await axios({
			method: 'POST',
			url: "http://localhost:5000/api/v1/users/signup",
			data: {
				fname,
				lname,
				email,
				password,
				passwordConfirm
			},
		})
		if(result.data.status === 'success'){
			showAlert('success', 'Account created! Please log in.')
			//if the response status from the http request is a success
			window.setTimeout(() => {
				//After 1 second load the login page to ask user to sign in with newly created credentials
				location.assign("/login");
			}, 1000);
			console.log(result)
		}
	} catch (error) {
		console.log('Sign up failed', error);
		showAlert('error',  'User could not be created at this time'); //Message property of response
	}
}


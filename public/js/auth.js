import axios from 'axios';
import { showAlert, spinner } from './front-end-utilities'

export const logout = async () => {
	spinner(document.body) //TODO: Change to actual page element?
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/v1/users/logout'
		});
		if ((res.data.status === 'success')) {
			showAlert('success', 'Logged out sucessfully!');
			window.setTimeout(() => {
				//After 1 second load landing page
				location.assign('/');
			}, 500);
		}

	} catch (err) {
		console.log('Sign out failed', error); //Message property of response
		showAlert('error', 'Error logging out! Try again.');
	}
};

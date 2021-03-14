const logout = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/v1/users/logout'
		});
		if ((res.data.status = 'success')) {
			window.alert('Log out successful!');
			window.setTimeout(() => {
				//After 1 second load landing page
				location.assign('/');
			}, 500);
		}

	} catch (err) {
		console.log(err.response);
		showAlert('error', 'Error logging out! Try again.');
	}
};
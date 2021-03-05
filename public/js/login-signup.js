const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
////////////////form styling stuff^^/////////////////////
const login = async (email, password) => {
	try {
		const result = await axios({
			method: "POST",
			url: "http://localhost:5000/api/v1/users/login",
			data: {
				email: email,
				password: password,
			},
		});


		//if the response status from the http request is a success
		window.setTimeout(() => {
			//After 1.5 seconds load the home page
			location.assign("/");
		}, 1500);
		console.log(result)


	} catch (error) {
		console.log(error); //Message property of response
	}
};

const signUp = async (fname, lname, email, password) => {
	try {
		const result = await axios({
			method: 'POST',
			url: "http://localhost:5000/api/v1/users/signup",
			data: {
				fname,
				lname,
				email,
				password
			},
		})

		window.alert('Account created! Please log in.')
		//if the response status from the http request is a success
		window.setTimeout(() => {
			//After 1 second load the login page
			location.assign("/login");
		}, 1000);
		console.log(result)

	} catch (error) {
		console.log(error); //Message property of response
	}
}


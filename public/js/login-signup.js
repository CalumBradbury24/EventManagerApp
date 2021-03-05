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

// DOM elements
const loginForm = document.querySelector(".loginForm");
const signInForm = document.querySelector('.signUpForm');

//If the login form exists
if (loginForm) {
	loginForm.addEventListener("submit", (event) => {
		//QuerySelector allows selecting elements based on its class
		event.preventDefault(); //Prevent the form from loading any other page

		//Get data from input fields
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		login(email, password);
	});
}

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

if (signInForm) {
	signInForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const firstName = document.getElementById('fName').value;
		const lastName = document.getElementById('lName').value;
		const email = document.getElementById('signUpEmail').value;
		const password = document.getElementById('signUpPassword').value;
		signUp(firstName, lastName, email, password);
	})
}

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
		console.log(error);
	}
}


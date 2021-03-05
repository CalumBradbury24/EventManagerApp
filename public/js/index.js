
//import "@babel/polyfill"; //for older browser compatibility


// DOM elements
const loginForm = document.querySelector(".loginForm");
const signInForm = document.querySelector('.signUpForm');
const logoutButton = document.getElementById('logout');


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

if(signInForm){
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        signUp(firstName, lastName, email, password);
    })
}

if(logoutButton){
  logoutButton.addEventListener('click', () => {
    console.log('logout button clicked')
    logout();
  })
}
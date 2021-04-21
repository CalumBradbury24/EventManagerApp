//All js files that are bundled together by parcel are imported here
import 'regenerator-runtime/runtime'
import { logout } from './logout';
import { login, signUp } from './login-signup';
import { updateUserDetails } from './save-account-details';
import '@babel/polyfill'; //For older browser compatibility
console.log('hello from parcel')

// DOM elements
const loginForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector('.signUpForm');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signupcontainer = document.getElementById('signupcontainer');
const arrowScrollButton = document.getElementById('arrow-wrapper');
const overviewContainer = document.querySelector('.overview-container');
const accountEdit = document.getElementById('edit');
const editProfileContainer = document.querySelector('.edit-profile-container');
const securityOptions = document.getElementById('security');
const securityContainer = document.querySelector('.security-container');
const userDetailsForm = document.querySelector('.my-account-details-form')

if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        signupcontainer.classList.add("right-panel-active");
    });
}

if (signInButton) {
    signInButton.addEventListener('click', () => {
        signupcontainer.classList.remove("right-panel-active");
    });
}

//When the user clicks on the button, toggle between hiding and showing the dropdown content 
const dropdownButton = document.querySelector('.dropdown-button');
if (dropdownButton) {
    dropdownButton.addEventListener('click', () => {
        document.querySelector(".dropdown-content ").classList.toggle("show");
    })

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = (event) => {
        if (!event.target.matches('.dropdown-button')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

//Handle sign in
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

//Handle sign up
if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const passwordConfirm = document.getElementById('signUpPasswordConfirm').value;
        signUp(firstName, lastName, email, password, passwordConfirm);
    })
}

//logout 
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        logout();
    })
}

//scroll down on splashscreen
if(arrowScrollButton && overviewContainer){
    arrowScrollButton.addEventListener('click', () => {
        overviewContainer.scrollIntoView({behavior: 'smooth'});
    })
}

//Account settings page
if(accountEdit && securityOptions){
    accountEdit.addEventListener('click', () => {
        securityContainer.classList.remove('js-show-widget')
        editProfileContainer.classList.add('js-show-widget')
    })
}
if(securityOptions && accountEdit){
    securityOptions.addEventListener('click', () => {
        editProfileContainer.classList.remove('js-show-widget')
        securityContainer.classList.add('js-show-widget')
    })
}
//Save details
if(userDetailsForm){
    userDetailsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fname = document.getElementById('fname').value
        const lname = document.getElementById('lname').value
        const email = document.getElementById('email').value
        const contactNum = document.getElementById('contact-num').value
        const address = document.getElementById('address').value
        const city = document.getElementById('city').value
        const state = document.getElementById('state').value
        const postcode = document.getElementById('postcode').value
        const country = document.getElementById('country').value
        updateUserDetails(fname, lname, email, contactNum, address, city, state, postcode, country);
    })
}
//All js files that are bundled together by parcel are imported here
import 'regenerator-runtime/runtime'
import { login, signUp, logout } from './auth';
import { updateUserDetails } from './save-account-details';
import { openModal, customButton } from './front-end-utilities';
import { Modal } from './views/modal';
import '@babel/polyfill'; //For older browser compatibility
console.log('hello from parcel')
console.trace()
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
const manageEvents = document.getElementById('myeventsmanager');
const manageMyEventsContainer = document.getElementById('manageMyEvents');

//Signup/in form animations
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
        manageMyEventsContainer.classList.remove('js-show-widget')
    })
}
if(securityOptions && accountEdit){
    securityOptions.addEventListener('click', () => {
        editProfileContainer.classList.remove('js-show-widget')
        securityContainer.classList.add('js-show-widget')
        manageMyEventsContainer.classList.remove('js-show-widget')
    })
}
if(manageEvents){
    manageEvents.addEventListener('click', () => {
        editProfileContainer.classList.remove('js-show-widget')
        securityContainer.classList.remove('js-show-widget')
        manageMyEventsContainer.classList.add('js-show-widget')
    })
}

//Save details
const userDetailsForm = document.querySelector('.my-account-details-form');
if(userDetailsForm){
    const buttonMarkup =`<div style="display:flex"> 
                            ${customButton('#23e8fa', '#6ef3ff', '#CF0E0E', '&#x2716', 'Save Details', 'save-account-details')}
                        </div>`
    userDetailsForm.insertAdjacentHTML('beforeend', buttonMarkup)

    userDetailsForm.addEventListener('submit', (event) => {
        event.preventDefault();
       // openModal('Are you sure you want to update your details?');
        const modal = new Modal('Are you sure you want to update your details?')
        const cancel = document.getElementById('cancel');
        const accept = document.getElementById('accept');

        if(cancel) cancel.addEventListener('click', () => modal.closeModal())
        
        if(accept) accept.addEventListener('click', () => {
            const form = new FormData();
            form.append('fname', document.getElementById('fname').value)
            form.append('lname', document.getElementById('lname').value)
            form.append('email', document.getElementById('email').value)
            form.append('contactNumber', document.getElementById('contact-num').value)
            form.append('address', document.getElementById('address').value)
            form.append('city', document.getElementById('city').value)
            form.append('state', document.getElementById('state').value)
            form.append('postcode', document.getElementById('postcode').value)
            form.append('country', document.getElementById('country').value)
            form.append('photo', document.getElementById('photo').files[0])
            updateUserDetails(form);
        })
    })
}
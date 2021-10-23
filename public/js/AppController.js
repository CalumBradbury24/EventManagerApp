//All js files that are bundled together by parcel are imported here
import 'regenerator-runtime/runtime';
import '@babel/polyfill'; //For older browser compatibility

import userModel from './models/user-model';
import { updateUserDetails } from './save-account-details';
import { customButton, showAlert } from './front-end-utilities';
import { Modal } from './views/Modal';

import HeaderView from './views/HeaderView';
import LoginView from './views/LoginView';
import HomePageView from './views/HomePageView';

console.log('hello from parcel')
//console.trace()


// automatically update modules in the browser at runtime without needing a whole page refresh
if(module.hot) module.hot.accept(); //Parcel

const accountEdit = document.getElementById('edit');
const editProfileContainer = document.querySelector('.edit-profile-container');
const securityOptions = document.getElementById('security');
const securityContainer = document.querySelector('.security-container');
const manageEvents = document.getElementById('myeventsmanager');
const manageMyEventsContainer = document.getElementById('manageMyEvents');



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

const controlHeaderSearchBar = (search) => {
    console.log(search)
    if(!search) HeaderView.renderError('Please enter some keywords to search for events.');
}

const controlLogin = async (email, password) => {
    LoginView.renderSpinner();
    const response = await userModel.login(email, password);
    console.log(response)
    //If the response status from the http request is a successs
    if(response === 'success'){
        showAlert('success', 'Logged in sucessfully!');
        window.setTimeout(() => {
            //refresh header and page
            HeaderView.refreshHeader(userModel.userState.user);
            HeaderView.handleLogOut(controlLogOut);
            HomePageView.render(userModel.userState.user);
        }, 300)
    } else {
        window.setTimeout(() => {
            LoginView.removeSpinner();
        }, 2000)
    } 
}

const controlRenderLogin = () => {
    //render the signin view
    LoginView.render();
    LoginView.handleLogin(controlLogin);
}

const controlSignUp = async (firstName, lastName, email, password, passwordConfirm) => {
    LoginView.renderSpinner();
    const response = await userModel.signUp(firstName, lastName, email, password, passwordConfirm);

    //If the response status from the http request is a success
    if(response === 'success'){
        showAlert('success', 'Account created! Please log in.');
        window.setTimeout(() => {
            location.assign("/home");
        }, 1000)
    } else {
        window.setTimeout(() => {
            location.reload();
        }, 1500)
    } 
}

const controlLogOut = async() => {
    HomePageView.renderSpinner();
    const response = await userModel.logout();
    if (response === 'success') {
        showAlert('success', 'Logged out sucessfully!');

        window.setTimeout(() => location.assign('/'), 500);
    } //else window.setTimeout(() => location.reload(), 1500);
}

//Publisher-Subscriber pattern
const init = () => { //Add required event listeners
    console.log('init')

    LoginView.handleSignUp(controlSignUp);
    LoginView.handleFormAnimations();


    HeaderView.handleLogOut(controlLogOut);
    HeaderView.handleHeaderDropDown();
    HeaderView.handleRenderLogin(controlRenderLogin);
    HomePageView.addSignUpSplashButtonHandler(controlRenderLogin);
    HeaderView.handleSearchBarOnSubmit(controlHeaderSearchBar);
}

init();
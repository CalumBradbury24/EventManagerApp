import View from './View';
import { removeAllChildNodes } from '../front-end-utilities';

class HeaderView extends View {
    _parentElement = document.querySelector('.header');
    _errorMessage = 'Invalid text entered. Please try again!';

    handleSearchBarOnSubmit(handler){
        const searchBar = document.querySelector('.event-search-form');
        searchBar.addEventListener(('submit'), (e) => {
            e.preventDefault(); //Prevent refresh for now
            const search = searchBar.children[0].value; //the input is a child of the event-search-form form element
            handler(search);
        })
    }

    handleRenderLogin(handler){
        const signInUpButton = document.querySelector('.signIn-container');
        if (signInUpButton) signInUpButton.addEventListener('click', () => handler());
    }

    handleLogOut(handler){
         console.log('here');
        const logoutButton = document.getElementById('logout');
        if (logoutButton) logoutButton.addEventListener('click', () => handler());
    }

    //When the user clicks on the button, toggle between hiding and showing the dropdown content 
    handleHeaderDropDown(){
        const dropdownButton = document.querySelector('.dropdown-button');
        if (dropdownButton) {
            dropdownButton.addEventListener('click', () => document.querySelector(".dropdown-content ").classList.toggle("show"));

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
    }

    refreshHeader(user){
        const userContainer = document.querySelector('.user-container');

        if(userContainer)removeAllChildNodes(userContainer); //Remove current children of the container and replace it with relevant elements
        else return;

        const userImage = user.userImage || 'User.svg';
        let markup = '';
        if(user.isLoggedIn && +user.userID){
            markup = `
                    <div class="dropdown">
                        <img class="dropdown-button" src="/img/users/${userImage}"></img> 
                        <div class="dropdown-content"> 
                            <a class="dropdown-link" href="/my-account">
                                <h3 class="link-text">My Account</h3>
                            </a>
                            <a class="dropdown-link" id="logout">
                                <h3 class="link-text">Sign Out</h3>
                            </a>
                        </div>
                    </div>
            `
        } else {
            markup = `
                <a class="link sign-in-text">
                    <h3 class="link-text">Sign In/Up</h3>
                </a> 
            `
        }   

        userContainer.insertAdjacentHTML('beforeend', markup);
        if(user.isLoggedIn && +user.userID) this.handleHeaderDropDown(); //add event listener
    }
}

export default new HeaderView(); //export invoked function rather than exporting it and then having to invoke it externally
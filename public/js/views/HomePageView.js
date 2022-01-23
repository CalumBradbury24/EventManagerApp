import View from './View.js';
import { fetchUserTimeMessage } from '../front-end-utilities';
class HomePageView extends View {
    _parentElement = document.querySelector('.home-page'); //This div is rendered by the pug template

    addSignUpSplashButtonHandler(handler){
        const signUp = document.querySelector('.splash-sign-up');
        if(signUp) signUp.addEventListener('click', () => handler());
    }

    _generateHTMLMarkup(){
        return `
                ${
                    this._data.isLoggedIn ?
                        `
                        <div class="logged-in-home">
                            <div class="upcoming-events"></div>
                            <div class="recommended-events"> <h1 class = "welcome-message">Good ${fetchUserTimeMessage()} ${this._data.firstName}! Can we interest you in some events?</h1></div>
                        </div>
                        ` 
                        : 
                        `
                        <div class="splash-screen">
                            <div class="landing-container">
                                <div class="title-container">
                                    <h1 class="title">Your Next Social Event Awaits...
                                        <p class="subtitle">With plenty of free and paid events all over the world, there is something for everyone!</p>
                                    </h1>
                                    <button class= "splash-sign-up">Sign up for Eventify</Button>
                                </div>
                            </div>
                        </div>
                        `
                }                     
        `
    }
}

export default new HomePageView();
import View from './View.js';

class HomePageView extends View {
    _parentElement = document.querySelector('.home-page');

    addSignUpSplashButtonHandler(handler){
        const signUp = document.querySelector('.splash-sign-up');
        if(signUp) signUp.addEventListener('click', () => handler());
    }

    _generateHTMLMarkup(){
        return `
            <div class="home-page">
                ${
                    this._data.isLoggedIn ?
                        `
                        <h1>Home page</h1>
                        <h1>You are logged in ${this._data.firstName}</h1>
                        ` 
                        : 
                        `
                        <div class="splash-screen"
                            <div class="landing-container"
                                <div class="title-container"
                                    <h1 class="title">Your Next Social Event Awaits...
                                        <p class="subtitle">With plenty of free and paid events all over the world, there is something for everyone!</p>
                                    </h1>
                                    <button class= "splash-sign-up">Sign up for Eventify</Button>
                                </div>
                            </div>
                        </div>
                        `
                }
            </div>                        
        `
    }
}

export default new HomePageView();
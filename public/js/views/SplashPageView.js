import View from './View.js';

class SplashPageView extends View{
    _parentElement = document.querySelector('.title-container');

    handleSplashPage(subscriber){
        subscriber();
    }

    addButtonOnClickHandler(){
        const signUp = document.querySelector('.splash-sign-up');
        if(signUp) signUp.addEventListener('click', () => location.assign('/login'));
    }

    _generateHTMLMarkup(){
        return `
            <button class= "splash-sign-up">Sign up for Eventify</Button>
        `
    }
}

export default new SplashPageView();
import View from './View.js';

class LoginView extends View {
    _parentElement = document.querySelector('.login-container-body');
    _loginForm = document.querySelector(".loginForm");
    _signUpForm = document.querySelector('.signUpForm');
    _signUpButton = document.getElementById('signUp');
    _signInButton = document.getElementById('signIn');
    _signupcontainer = document.getElementById('signupcontainer');

    //Signup/in form animations
    handleFormAnimations(){
        if (this._signUpButton) {
            this._signUpButton.addEventListener('click', () => {
                this._signupcontainer.classList.add("right-panel-active");
            });
        }
        
        if (this._signInButton) {
            this._signInButton.addEventListener('click', () => {
                this._signupcontainer.classList.remove("right-panel-active");
            });
        }
    }

    handleLogin(handler){
        if(this._loginForm){
            this._loginForm.addEventListener("submit", (event) => {
                event.preventDefault(); //Prevent the form from loading any other page or refreshing page
                const email = document.getElementById("signInEmail").value;
                const password = document.getElementById("signInPassword").value;
                handler(email, password);
            });
        }
    }

    handleSignUp(handler){
        if (this._signUpForm) {
            this._signUpForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const firstName = document.getElementById('signUpFName').value;
                const lastName = document.getElementById('signUpLName').value;
                const email = document.getElementById('signUpEmail').value;
                const password = document.getElementById('signUpPassword').value;
                const passwordConfirm = document.getElementById('signUpPasswordConfirm').value;
                handler(firstName, lastName, email, password, passwordConfirm);
            })
        }
    }
}

export default new LoginView();
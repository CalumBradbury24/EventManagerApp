import View from './View.js';

class LoginView extends View {
    _parentElement = document.querySelector('.home-page');

    //Signup/in form animations
    handleFormAnimations(){
        const signUpButton = document.getElementById('signUp');
        const signupcontainer = document.getElementById('signupcontainer');
        const signInButton = document.getElementById('signIn');

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
    }

    handleLogin(handler){
        const loginForm = document.querySelector(".loginForm");
        if(loginForm){
            loginForm.addEventListener("submit", (event) => {
                console.log('handling log in')
                event.preventDefault(); //Prevent the form from loading any other page or refreshing page
                const email = document.getElementById("signInEmail").value;
                const password = document.getElementById("signInPassword").value;
                handler(email, password);
            });
        }
    }

    handleSignUp(handler){
        const signUpForm = document.querySelector('.signUpForm');
        if (signUpForm) {
            signUpForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const firstName = document.getElementById('signUpFName').value;
                const lastName = document.getElementById('signUpLName').value;
                const email = document.getElementById('signUpEmail').value;
                const password = document.getElementById('signUpPassword').value;
                const passwordConfirm = document.getElementById('signUpPasswordConfirm').value;
                handler(firstName, lastName, email, password, passwordConfirm);
            });
        }
    }

    _generateHTMLMarkup(){
        return `
            <div class="login-container-body">
                <div class="container" id="signupcontainer">
                    <div class="form-container sign-up-container">
                        <form class="signUpForm" method="post">
                            <h1>Create Account</h1>
                            <span>Please use your email for registration</span>
                            <input id="signUpFName" autocomplete="given-name" type="First Name" placeholder="First Name" required></input>
                            <input id="signUpLName" autocomplete="family-name" type="Last Name" placeholder="Last Name" required></input>
                            <input id="signUpEmail" autocomplete="email" type="email" placeholder="you@example.com" required></input>
                            <input id="signUpPassword" autocomplete="new-password" type="password" placeholder="password" required minlength='8'></input>
                            <input id="signUpPasswordConfirm" autocomplete="new-password" type="password" placeholder="confirm password" required minlength="8"></input>
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form class="loginForm"/>
                            <h1>Sign In</h1>
                            <input id="signInEmail" autocomplete="email" type="email" name="email" placeholder="you@example.com" required></input>
                            <input id="signInPassword"  autocomplete="current-password" type="password" name="password" placeholder="password" required minlength='8'></input>
                            <a href="/api/v1/users/resetpassword">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-container"> 
                        <div class="overlay"> 
                            <div class="overlay-panel overlay-left"
                                <h1>Welcome Back!</h1> 
                                <p>Please log in</p>
                                <button class="ghost" id="signIn">Sign In</button> 
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>Hello friend!</h1> 
                                <p>Enter your personal details and start your journey with us!</p> 
                                <button class="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

export default new LoginView();
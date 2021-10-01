import View from './View';

class HeaderView extends View {
    _parentElement = document.querySelector('.header');
    _errorMessage = 'Invalid text entered. Please try again!';

    addHandlerMutateHeaderOnUrlChange = (windowLocation) => {
        console.log(this._parentElement.children[0])
        if(this._parentElement.children[0].children[0]) this._parentElement.children[0].children[0].remove(); //Remove current logo
        let route = windowLocation.pathname; //Get the '/xyz' part of the url
        if(route === '/' || route === '/login'){
            this._parentElement.classList.add('header-splash-grey');
            this.insertLogo('dark');
        } 
        if(route === '/home'){
            this._parentElement.classList.add('header-splash-purple');
            this.insertLogo('light');
        }  
    }

    handleSearchBarOnSubmit(handler){
        const searchBar = document.querySelector('.event-search-form');
        searchBar.addEventListener(('submit'), (e) => {
            e.preventDefault(); //Prevent refresh for now
            const search = searchBar.children[0].value; //the input is a child of the event-search-form form element
            handler(search);
        })
    }

    insertLogo(colour){
        const logo = `<img class="logo" src='../../assets/Eventify-${colour}.png' alt="Eventify Logo"></img>`; //Logo
        this._parentElement.children[0].insertAdjacentHTML('afterbegin', logo); //Insert logo into anchor tag in header
    }
}

export default new HeaderView(); //export invoked function rather than exporting it and then having to invoke it externally
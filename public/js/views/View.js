export default class View{ //Singleton class
    #data;

    render(data = undefined, position = 'afterbegin'){
        this.#data = data;
        const markup = this._generateHTMLMarkup();

       // this._clear();
        if(this._parentElement)this._parentElement.insertAdjacentHTML(position, markup); 
    }

    renderError(message = this._errorMessage){
        this.hideAlert(); //Hide alert if it currently exists
        const markup = `<div class='alert alert--error'>${message}</div>`; //Build alert container
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup); //insert alert container inside of the body, right at the beginning
        window.setTimeout(this.hideAlert, 2000); //Hide alert after 5 seconds
    }

    hideAlert(){
        const alert = document.querySelector('.alert');
        if(alert) alert.parentElement.removeChild(alert); //remove the alert element from its parent element
    }
}
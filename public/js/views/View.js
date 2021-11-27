import { hideAlert, showAlert } from '../front-end-utilities';
export default class View{ //Singleton class
    _data;

    render(data = undefined, position = 'afterbegin'){
        this._data = data;
        const markup = this._generateHTMLMarkup();

        this._clear();
        if(this._parentElement) this._parentElement.insertAdjacentHTML(position, markup); 
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage, timeoutSeconds = 3000){
        hideAlert(); //Hide alert if it currently exists
        showAlert('error', message);
        window.setTimeout(hideAlert, timeoutSeconds); //Hide alert after 5 seconds
    }

    renderSpinner(){
        console.log('adding spinner')
        const markup = `
                        <div class ="spinner-container">
                            <div class="spinner">
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                                <div class='spinner-section'></div>
                            </div>
                        </div>`
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    removeSpinner(){
        const spinnerContainer = document.querySelector('.spinner-container');
        spinnerContainer.remove();
    }
}
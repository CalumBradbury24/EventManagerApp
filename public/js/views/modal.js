import { customButton } from "../front-end-utilities";

//Modal provides generic modal with generic buttons but can accept a custom element that will be used instead
class Modal {
    constructor(message = 'Are you sure?', cancelButtonText = 'No', okButtonText = 'Yes', customElement = undefined){
        this.message = message;
        this.cancelButtonText = cancelButtonText;
        this.okButtonText = okButtonText;
        this.customElement = customElement;

        this.render();
    }

    render(){
        console.log('opening decision modal');
        const modalElement = this.customElement || `<div class = "modal">
                                                    <h4 class = "modal-message">${this.message}</h4>
                                                    <div class = "buttons-container"> 
                                                        ${customButton('#FE7B5E', '#FF9B85', '#CF0E0E', '&#x2716', this.cancelButtonText, 'cancel')}
                                                        ${customButton('#48F92B', '#82FF26', 'green', '&#10004', this.okButtonText, 'accept')}
                                                    </div>
                                                </div>`;

        const modalContainer = `<div class = "modal-container">
                                    ${modalElement}
                                </div>`
        document.querySelector('body').insertAdjacentHTML('beforeend', modalContainer) //insert as last child of body
    }

    closeModal(){
        document.querySelector('.modal-container').remove();
    }
}

module.exports = {Modal}
export const hideAlert = () => {
    const alert = document.querySelector('.alert');
    if(alert) alert.parentElement.removeChild(alert); //remove the alert element from its parent element
}

export const showAlert = (type, message) => {
    hideAlert(); //Hide alert if it currently exists
    const markup = `<div class='alert alert--${type}'>${message}</div>`; //Build alert container
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup); //insert alert container inside of the body, right at the beginning
    window.setTimeout(hideAlert, 5000); //Hide alert after 5 seconds
}

//Modal provides generic modal with generic buttons but can accept a custom element that will be used instead
export const openModal = (message = 'Are you sure?', cancelButtonText = 'No', okButtonText = 'Yes', customElement = undefined) => {
    console.log('opening decision modal');

    const modalElement = customElement || `<div class = "modal">
                                                <h4 class = "modal-message">${message}</h4>
                                                <div class = "button-container"> 
                                                    ${customButton('#FE7B5E', '#FF9B85', '#CF0E0E', '&#x2716', cancelButtonText, 'cancel')}
                                                    ${customButton('#48F92B', '#82FF26', 'green', '&#10004', okButtonText, 'accept')}
                                                </div>
                                            </div>`;

    const modal = `<div class = "modal">
                        ${modalElement}
                    </div>`

    const modalContainer = `<div class = "modal-container">
                                ${modal}
                            </div>`
    document.querySelector('body').insertAdjacentHTML('beforeend', modalContainer) //insert as last child of body
}

//function that returns a button based on passed text, icon and colours
export const customButton = (iconBackgroundColour, backgroundColour, colour, icon, text, buttonID) => {
    return `<button id=${buttonID} class="button" style="background-color: ${backgroundColour}">
                <div style="background-color: ${iconBackgroundColour}" class="button-icon-container">
                    <i style="color: ${colour}">${icon}</i>
                </div>
                <p class="button-text">${text}</p>
            </button>`
}

export const spinner = (element) => {
    console.log('adding spinner')
    const markup = `<div class="spinner">
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                        <div class='spinner-section'></div>
                    </div>`
    element.innerHTML = '';
    element.insertAdjacentHTML('afterbegin', markup);
}
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

//function that returns a button based on passed text, icon and colours
export const customButton = (iconBackgroundColour, backgroundColour, iconColour, icon, text, buttonID) => {
    return `<button id=${buttonID} class="button" style="background-color: ${backgroundColour}">
                <div style="background-color: ${iconBackgroundColour}" class="button-icon-container">
                    <i style="color: ${iconColour}">${icon}</i>
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
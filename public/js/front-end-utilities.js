import { API_URL, TIMEOUT_SECONDS } from '../config';
import axios from 'axios';

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
                    </div>`;
    element.innerHTML = '';
    element.insertAdjacentHTML('afterbegin', markup);
}

export const timeout = () => {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${TIMEOUT_SECONDS} seconds`));
        }, TIMEOUT_SECONDS * 1000); //60 seconds
    });
};

export const makeAxiosPostRequest = async(url, data) => {
    try {
        const response = await Promise.race( //Resolves/rejects to the first promise that finishes
            [
                axios({
                    method: "POST",
                    url: `${API_URL}${url}`,
                    data: data
                }),
                timeout()
            ]
        )

        return response;
    } catch(err){
        throw err; //Causes this promise that is returned to reject
    }
}

export const makeAxiosGetRequest = async(url) => {
    try {
        const response = await Promise.race( //Resolves/rejects to the first promise that finishes
            [
                axios({
                    method: "GET",
                    url: `${API_URL}${url}`,
                }),
                timeout()
            ]
        );

        return response;
    } catch(err){
        throw err; //Causes this promise that is returned to reject
    }
}

export const removeAllChildNodes = (parent) => {
    console.log(parent);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
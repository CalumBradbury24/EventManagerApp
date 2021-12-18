import View from './View.js';
import { fetchUserTimeMessage } from '../front-end-utilities';

class RecomendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view

    _generateHTMLMarkup(){ //10 recommended events based on user location and maybe other stats?
        console.log(this._data);
        return `
            <h1 class = "welcome-message">Good ${fetchUserTimeMessage()} ${this._data.firstName}! Can we interest you in some events?</h1>
            <div class = "recommended-events-container">
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
                <div class="recommended-event-container"></div>
            </div>
        `
    }
}

export default RecomendedEventsView;
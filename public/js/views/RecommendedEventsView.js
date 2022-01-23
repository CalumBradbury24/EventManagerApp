import View from './View.js';

class RecommendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view

    _generateHTMLMarkup(){ //10 recommended events based on user location and maybe other stats?
        console.log(this._data);
        return `
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

export default RecommendedEventsView;
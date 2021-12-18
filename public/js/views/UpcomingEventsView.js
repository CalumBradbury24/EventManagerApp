import View from './View.js';

class UpcomingEventsView extends View {
    _parentElement = document.querySelector('.upcoming-events'); //This div is rendered in the home page view

    _generateHTMLMarkup(){
        console.log(this._parentElement);
        return `
        <div class='upcoming-title-container'>
            <h1 class="upcoming-events-title">Upcoming Events</h1>
        </div>

        `
    }
}

export default UpcomingEventsView;
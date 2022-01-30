import View from './View.js';

class RecommendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view

    _generateHTMLMarkup(){ //10 recommended events based on user location and maybe other stats?
        console.log(this._data);
        const markup =
        `
            <div class = "recommended-events-container">
                ${this._data.length ? 
                    this._data.map(event => {
                        console.log(event);
                        return `<div class="recommended-event-container">
                            <h4>${event.eventName}</h4>
                        </div>`
                    }).join('')
                :
                    `<p>Sorry we have not found any recommended events for you :(. If you would like to see some recommended events please ensure you have provided 
                        your basic location details in 'My Account'.</p>`
                }
            </div>
        `
        return markup;
    }
}

export default RecommendedEventsView;
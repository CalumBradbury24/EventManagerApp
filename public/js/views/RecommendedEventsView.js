import View from './View.js';

class RecommendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view

    _generateHTMLMarkup(){ //10 recommended events based on user location and maybe other stats?
        const markup =
        `
            <div class = "recommended-events-container">
                ${this._data.length ? 
                    this._data.map(event => {
                        return `<div class="recommended-event-container">
                                    <img class="event-type-image" src="/img/events/${event.image}.jpg"></img>
                                    <div class="event-info-container">
                                        <h4 class="event-info-title">${event.eventName}</h4>
                                            <div class="event-info">
                                        </div>
                                    <div class="event-buttons">

                                    </div>
                                    </div>

                                </div>`
                    }).join('') //.map results in an array of each string so need to .join()
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
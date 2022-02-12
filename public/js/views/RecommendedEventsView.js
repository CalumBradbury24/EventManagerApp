import View from './View.js';
import { UTCtoLocaleTime, formatMoney } from '../front-end-utilities';

class RecommendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view

    initSaveToFavourites(){
        console.log('here');
        let h1 = document.querySelector('.heartOne');
        let _svg1 = document.querySelector('svg.one');
        
        h1.addEventListener('click',e=>{
          _svg1.classList.toggle('on');
        },false);
    }

    _generateHTMLMarkup(){ //10 recommended events based on user location and maybe other stats?
        const markup =
        `
            <div class = "recommended-events-container">
                ${this._data.length ? 
                    this._data.map(event => {
                        return `<div class="recommended-event-container">
                                    <img class="event-type-image" src="/img/events/${event.image}.jpg"></img>
                                    <div class="event-info-container">
                                        <h4 class="event-info-title">${event.eventName || 'Undefined Event Name'} (${event.eventTypeName})</h4>
                                        <div class="event-info">
                                            <p class='event-date'>${(UTCtoLocaleTime(event.startDate) || '')} - ${(UTCtoLocaleTime(event.endDate) || '')}</p>
                                            <p class='event-meta-data'>${event.address + ',' || ''} ${event.city + ',' || ''} ${event.countryName || ''}</p>
                                            <p class='event-meta-data'>${formatMoney(event.currencySymbol, event.currencyCode, event.cost)}</p>
                                        </div>
                                    </div>
                                    <div class="event-buttons">
                                        <svg class="one" viewBox="0 0 100 100">
                                            <g class="heartOne">
                                            <path  class="heartEX" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                            <path class="heart"    d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                            </g>
                                        </svg>
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
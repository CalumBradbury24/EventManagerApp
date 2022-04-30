import View from './View.js';
import { UTCtoLocaleTime, formatMoney } from '../front-end-utilities';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

class RecommendedEventsView extends View {
    _parentElement = document.querySelector('.recommended-events'); //This div is rendered in the home page view
   // constructor(){
        // super(); //must call before using 'this' in derived classed
        // this.favouritesButtonIsLocked = [];
   // }

    initSaveToFavourites(saveToFavourites){
        const svgNodeList = document.querySelectorAll('.heart-svg'); //Nodelist of all svgs with this class

        svgNodeList.forEach(svg => { //Iterate through node list
            let currentSvg = document.getElementById(svg.id);
            let g = document.getElementById(`heart-${svg.id}`);
         //   const isFavourited = !currentSvg.classList.contains('on');

            g.addEventListener('click', () => {
                currentSvg.classList.toggle('on');
                saveToFavourites(svg.id); //svg.id is the event id
            });

            tippy(g, {
                content: `Remove from/add event to my favourites`,
                placement: 'bottom',
                animation: 'scale-extreme'
            });
        })
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
                                        <svg id=${event.eventID} class="heart-svg ${!!event.favouriteEvent ? 'on' : ''}" viewBox="0 0 100 100">
                                            <g id=heart-${event.eventID}>
                                                <path class="heartEX" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                                <path class="heart" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>`
                    }).join('') //.map results in an array of each string so need to .join()
                :
                    `<p>Sorry we have not found any recommended events near your saved location :(. If you would like to see some recommended events please ensure you have provided 
                        your basic location details in 'My Account'.</p>`
                }
            </div>
        `
        return markup;
    }
}

export default RecommendedEventsView;
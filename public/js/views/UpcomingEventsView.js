import { renderLocalSpinner, UTCtoLocaleTime, formatMoney } from '../front-end-utilities';
import { fetchUpcomingEvents } from '../models/events-model';

class UpcomingEventsView {
    _parentElement = document.querySelector('.upcoming-events'); //This div is rendered in the home page view
    _upcomingEvents = [];
    constructor(){
     //  super(); //must call before using 'this' in derived classed
        const markup = this._generateHTMLMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup); 
        this.initUpcomingEventsSearch();
        this.fetchEvents();
    }

    async fetchEvents(){
        if(this._eventsList) this._eventsList.innerHTML = '';
       // renderLocalSpinner(this._eventsList);
        this.renderSkeletonLoader();
        this._upcomingEvents = await fetchUpcomingEvents();
        this.renderEventsList();
    }

    renderSkeletonLoader(){
        for(let x = 0; x < 7; ++x){
            const markup =
            `<div class="upcoming-event-container skeleton-container">
                <div class="skeleton-title skeleton"></div>
                <div class="upcoming-event-details-container-skeleton">
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                <div/>
            </div>`
            this._eventsList.insertAdjacentHTML('afterbegin', markup);
        }
    }

    initUpcomingEventsSearch(){
        const searchBar = document.querySelector('.event-search-form.upcoming-events-search');
        this._eventsList = document.querySelector('.upcoming-events-list');
        renderLocalSpinner(this._eventsList); //Initially append spinner whilst waiting for data to load

        searchBar.addEventListener(('submit'), (e) => {
            e.preventDefault(); //Prevent refresh
            const search = searchBar.children[0].value; //the input is a child of the event-search-form form element
            this.handleUpComingEventsSearch(search);
        })
    }

    handleUpComingEventsSearch = async(search) => {
        if(!search || search.length > 250) return; //HomePageView.renderError(!search ? 'Please enter some keywords to search for FAQs.' : 'Please enter fewer search terms.');
        this.fetchEvents();
    }

    _generateHTMLMarkup(){
        return `
            <div class='upcoming-title-container'>
                <h1 class="upcoming-events-title">Upcoming Events</h1>
            </div>
            <div class="event-keyword-search-container">
                <form class="event-search-form upcoming-events-search" role="search">
                    <input class="event-search-input upcoming-events-search" type="search" placeholder="Search events" autofocus></input>
                    <button class="event-search-button upcoming-events-search" type="submit">
                        <img class="event-search-icon" src='../assets/search-icon.svg'></img>
                    </button>
                </form>
            </div>
            <div class="upcoming-events-list"></div>
            <div>
            <div>
        `
    }// ?

    renderEventsList(){
        if(this._eventsList) this._eventsList.innerHTML = '';
        console.log(this._upcomingEvents);
        const markup = !this._upcomingEvents.length 
            ? 
            '<div>No results found.</div>' 
            :
            this._upcomingEvents.map(event => {
                return `
                    <div class="upcoming-event-container">
                        <h6 class="event-title">${event.eventName}</h6>
                        <div class="upcoming-event-details-container">
                            <span class="upcoming-event-detail"><p>Start date: </p>${(UTCtoLocaleTime(event.startDate) || '')}</span>
                            <span class="upcoming-event-detail"><p>Location: </p>${event.city}, ${event.countryName}</span>
                            <span class="upcoming-event-detail"><p>Price: </p>${formatMoney(event.currencySymbol, event.currencyCode, event.cost)}</span>
                            <span class="upcoming-event-detail"><p>Event owner: </p>${event.eventOwner}</span>
                        </div>
                    </div>
                `
            }).join('');

        this._eventsList.insertAdjacentHTML('afterbegin', markup);
    }
}

export default UpcomingEventsView;
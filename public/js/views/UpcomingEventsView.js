import View from './View.js';
import { renderLocalSpinner } from '../front-end-utilities';

class UpcomingEventsView extends View {
    _parentElement = document.querySelector('.upcoming-events'); //This div is rendered in the home page view

    initUpcomingEventsSearch(){
        const searchBar = document.querySelector('.event-search-form.upcoming-events-search');
        const eventsList = document.querySelector('.upcoming-events-list');

        searchBar.addEventListener(('submit'), (e) => {
            e.preventDefault(); //Prevent refresh
            renderLocalSpinner(eventsList);
            const search = searchBar.children[0].value; //the input is a child of the event-search-form form element
            this.handleUpComingEventsSearch(search);
        })
    }

    handleUpComingEventsSearch = async(search) => {
        if(!search || search.length > 250) return //HomePageView.renderError(!search ? 'Please enter some keywords to search for FAQs.' : 'Please enter fewer search terms.');
    
        FAQsView.renderSpinner('.common-faqs');
        const searchedFAQs = await FAQsModel.searchFAQs(search);
        FAQsView.removeSpinner();
        FAQsView.renderFAQs(searchedFAQs, true); //Refresh FAQs
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
        <div class = "upcoming-events-list">

        </div>

        </div>
        `
    }
}

export default UpcomingEventsView;
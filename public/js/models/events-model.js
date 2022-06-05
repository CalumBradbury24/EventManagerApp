import { makeAxiosGetRequest, showAlert, makeAxiosRequest } from '../front-end-utilities';

const eventsState = {
    recommendedEvents: {},
	eventTypes: {}
}

const fetchEventTypes = async() => {
	//dont need to try, catch as errors are caught in function where this function is called from
	const response = await makeAxiosGetRequest('events/types');
	eventsState.eventTypes = response.data?.data || [];
}

const fetchRecommendedEvents = async() => {
    try {
		const response = await makeAxiosGetRequest('events/recommended');
        console.log(response.data.data);
        eventsState.recommendedEvents = response.data?.data || [];
	} catch (err) {
		console.log(err); //TODO: remove log
		console.error('Failed to fetch recommended events'); //Message property of response
	}
} 

const updateFavouriteEvent = async(data) => {
	try{
		await makeAxiosRequest('PUT', 'events/favourite', data);
		showAlert('success', 'Event Updated!');
	} catch(err){
		console.log(err); //TODO: remove log
		console.error('Failed to update event'); //Message property of response
		showAlert('error', err.response?.data?.message || 'Unknown Error occurred, please try again.');
	}
}

const fetchUpcomingEvents = async() => {
	try{
		const response = await makeAxiosRequest('GET', 'events/upcoming');
		return response.data?.data || [];
	} catch(err){
		console.log(err); //TODO: remove log
		console.error('Failed to fetch upcoming events'); //Message property of response
		showAlert('error', err.response?.data?.message || 'Unknown Error occurred when fetching upcoming events.');
	}
}

module.exports = {
	fetchRecommendedEvents,
	fetchEventTypes,
    eventsState,
	updateFavouriteEvent,
	fetchUpcomingEvents
}
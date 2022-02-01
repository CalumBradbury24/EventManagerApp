import { makeAxiosGetRequest } from '../front-end-utilities';

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
        console.log(response);
        eventsState.recommendedEvents = response.data?.data || [];
	} catch (err) {
		console.log(err); //TODO: remove log
		console.error('Failed to fetch recommended events'); //Message property of response
	}
} 

module.exports = {
	fetchRecommendedEvents,
	fetchEventTypes,
    eventsState
}
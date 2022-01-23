import { makeAxiosGetRequest } from '../front-end-utilities';

const eventsState = {
    recommendedEvents: {}
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
    eventsState
}
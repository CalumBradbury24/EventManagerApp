import { makeAxiosGetRequest } from '../front-end-utilities';

const fetchCommonFAQs = async() => {
    try {
		const response = await makeAxiosGetRequest('faqs/common');
        if(response.data.status === 'success') return response.data.data || [];
		else return [];
	} catch (err) {
		console.log(err); //TODO: remove log
		console.error('Failed to fetch common FAQs'); //Message property of response
	}
} 

const searchFAQs = async(search) => {
	try{
		const response = await makeAxiosGetRequest(`faqs/search/${search}`);
		return response.data.data || [];
	} catch (err) {
		console.log(err); //TODO: remove log
		console.error('Failed to fetch common FAQs'); //Message property of response
	}
}

module.exports = {
	fetchCommonFAQs,
	searchFAQs
}
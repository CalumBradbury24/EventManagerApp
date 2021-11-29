import { makeAxiosGetRequest } from '../front-end-utilities';

const fetchCommonFAQs = async() => {
    try {
		const response = await makeAxiosGetRequest('faqs/common');
        if(response.data.status === 'success') return response.data.data || [];
		else return [];
	} catch (err) {
		console.log(err);
		console.error('Failed to fetch common FAQs'); //Message property of response
	}
} 

module.exports = {
	fetchCommonFAQs
}
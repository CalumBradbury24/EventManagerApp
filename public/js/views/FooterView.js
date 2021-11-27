import View from './View.js';

class FooterView extends View {
    _errorMessage = 'Unable to render request. Please try again!';
    
    initFooterEventListeners(handler){
        const howItWorks = document.getElementById('howItWorks');
        const contactUs = document.getElementById('contactUs');
        const findEvents = document.getElementById('findEvents');
        const faqs = document.getElementById('faqs');

        howItWorks.addEventListener('click', () => handler('howItWorks'));
        contactUs.addEventListener('click', () => handler('contactUs'));
        findEvents.addEventListener('click', () => handler('findEvents'));
        faqs.addEventListener('click', () => handler('faqs'));
    }

}

export default new FooterView();
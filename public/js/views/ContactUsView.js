import View from './View';

class ContactUsView extends View {
    _parentElement = document.querySelector('.home-page');

    _generateHTMLMarkup(){
        return `
            <div>Contact Us</div>
        
        `
    }

}


export default new ContactUsView();
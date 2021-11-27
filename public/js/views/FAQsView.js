import View from './View';
class FAQView extends View {
    _parentElement = document.querySelector('.home-page');

    _generateHTMLMarkup(){
        return `
            <div>FAQs</div>
        
        `
    }

}

export default new FAQView();
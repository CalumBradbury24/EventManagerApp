import View from './View';

class FindEventsView extends View {
    _parentElement = document.querySelector('.home-page');

    _generateHTMLMarkup(){
        return `
            <div>Find events</div>
        
        `
    }

}


export default new FindEventsView();
import View from './View';
class HowItWorksView extends View {
    _parentElement = document.querySelector('.home-page');

    _generateHTMLMarkup(){
        return `
            <div>How it works</div>
        
        `
    }

}

export default new HowItWorksView();
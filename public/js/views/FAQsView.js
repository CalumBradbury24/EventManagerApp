import View from './View';
class FAQView extends View {
    _parentElement = document.querySelector('.home-page');

    init(){
        //add event listeners
    }

    _generateHTMLMarkup(){
        console.log(this._data);
        return `
        <div class='FAQs'>
            <div class='title-container'>
                <h3 class="generic-title">FAQs</h3>
                <h6 class="subtext">Here are some frequently asked questions about Eventify.</h6>
            </div>
            <div class="search-form-container">
                <p class="FAQs-text">Search for commonly asked questions?</p>
                <form class="event-search-form" role="search">
                    <input class="event-search-input" type="search" placeholder="Search FAQs" autofocus></input>
                    <button class="event-search-button" type="submit">
                        <img class="event-search-icon" src='../assets/search-icon.svg'></img>
                    </button>
                </form>
            </div>
            <div class="common-faqs">
                <p class='general-questions-title'>General Questions</p>
                <div class="common-questions-container">
                    ${
                        this._data.map((question, i) => {
                            console.log(question);
                            return `
                                <div class="general-question-container">
                                    <div class="general-question ${i === this._data.length - 1 ? 'last-el' : ''}">
                                        <h6 class="question">${question.faqQuestion}</h6>
                                        <span class='plus'>+</span>
                                    </div>
                                    <p class="faq-answer">An answer</p>
                                </div>
                            `
                        }).join('')
                    }
                </div>
            </div>
            <div class="further-questions-container">
                <div class = "further-questions-text-container">
                    <p class="FAQs-text getInTouch">Still need help? Get in touch!</p>
                    <p style="color: antiquewhite">For any further questions please write to us at lorem@ipsum.com.</p>
                </div>
            </div>
        </div>
        `
    }

}

export default new FAQView();
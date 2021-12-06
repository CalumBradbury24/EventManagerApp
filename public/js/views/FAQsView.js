import View from './View';
class FAQView extends View {
    _parentElement = document.querySelector('.home-page');

    init(handleFAQSearch){
        const questionsContainer = document.querySelector('.common-questions-container');
        const questionsContainerChildren = questionsContainer.children;

        //Add toggle answer event listener to every question
        Object.values(questionsContainerChildren).forEach(generalQuestionEl => {
            const answerEl = generalQuestionEl.children[1];
            generalQuestionEl.addEventListener('click', () => {
                answerEl.classList.toggle('hidden');
            });
        })

        //Init search bar
        if(handleFAQSearch) this.handleSearchBarOnSubmit(handleFAQSearch)
    }

    handleSearchBarOnSubmit(handleFAQSearch){
        const searchFAQsEl = document.getElementById('faq-search');
        searchFAQsEl.addEventListener(('submit'), (e) => {
            e.preventDefault(); //Prevent refresh
            const search = searchFAQsEl.children[0].value; //the input is a child of the event-search-form form element
            handleFAQSearch(search);
        })
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
                <form id="faq-search" class="event-search-form large" role="search">
                    <input class="event-search-input" type="search" placeholder="Search FAQs" autofocus></input>
                    <button class="event-search-button" type="submit">
                        <img class="event-search-icon" src='../assets/search-icon.svg'></img>
                    </button>
                </form>
            </div>
            <div class="common-faqs">
                <p class='general-questions-title'>General Questions</p>
                    ${this.renderFAQs()}
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

    renderFAQs(data = this._data, refresh = false){
        const faqs = document.querySelector('.common-questions-container');
        if(faqs) faqs.remove();

        const markup = `
            <div class="common-questions-container">
                ${data.length ?
                    data.map((question) => {
                        return `
                            <div class="general-question-container">
                                <div id="question-${question.FaqID}" class="general-question">
                                    <h6 class="question">${question.faqQuestion}</h6>
                                    <span class='plus'>+</span>
                                </div>
                                <p class="faq-answer hidden" id="answer-${question.FaqID}">${question.faqAnswer}</p>
                            </div>
                        `
                    }).join('')
                    :
                    '<p class="faq-answer">Unfortunately no FAQs were found for this search. If you still need further help please contact us at lorem@ipsum.com</p>'
                }
            </div>
        `

        if(!refresh) return markup;

        const containerEl = document.querySelector('.common-faqs');
        containerEl.insertAdjacentHTML('beforeend', markup);
        if(data.length) this.init(undefined); //re init necessary event listeners
    }

}

export default new FAQView();
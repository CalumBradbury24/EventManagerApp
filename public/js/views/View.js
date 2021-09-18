export default class View{ //Singleton class
    #data;

    render(data = undefined, position = 'afterbegin'){ //calls the current 'this' class's render method
        this.#data = data;
        const markup = this._generateHTMLMarkup();

       // this._clear();
        this._parentElement.insertAdjacentHTML(position, markup); 
    }
}
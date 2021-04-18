

console.log('hello')

class NYT_SearchAPI {

    API_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    API_KEY = 'CdyLSaf5xyJlIpqFXkXyEAbZ3E9h9iTS'

    constructor(){

        this.messageEl = document.querySelector('p.message')
        this.setUpListener()
    }

    setUpListener(){
        const form = document.querySelector('form[name="article_search"]')
        form.addEventListener('submit', this.handleSearch)

    }

    showMessage = (message) => {
        this.messageEl.innerHTML = message
    
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value
        const data = {
            q: term, 
            'api-key': this.API_KEY

        }
        axios.get(this.API_BASE_URL, {params: data}).then(this.processResults)
        
    }

    processResults = (response) => {
        console.log('got results!', response)

        // parent container
        const articleContainer = document.createElement('div');
        articleContainer.setAttribute('class', 'article-Container');
        resultsLi.appendChild.setAttribute( articleContainer);

        //title
        const title = document.createElement('h2');
        articleContainer.appendChild(title);

         //photo
         const photo = document.createElement('img');
         articleContainer.appendChild(photo);


        //about/abstract
        const abstractEl = document.createElement('p');
        abstractEl.setAttribute('class', 'abstract-container');
        articleContainer.appendChild(abstractEl);

         // creating <li>
         const resultsLi = document.createElement('li');
         articleContainer.appendChild(resultsLi);

         // anchor-link
         const linkEl = document.createElement('a');
         articleContainer.appendChild(linkEl);
         const headline = document.createElement('h3');
         linkEl.appendChild(headline);
         linkEl.setAttribute('href');
         linkEl.setAttribute('target', 'blank');



        // for loop for abstracts
        var abstracts = response.data.response.docs
        console.log(abstracts.length)
        for (let i =0; i < abstracts.length; i++){
            this.showMessage(abstracts[i].byline.original)
            console.log(abstracts[i].byline)
        }




        

        // const results = response.data.response.docs
        // results.forEach(////) HOMEWORK GET IT ON THE DOM
        // show more input fields 
    }
}

new NYT_SearchAPI()
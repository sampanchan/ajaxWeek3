

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
    reformatDate = (str) => {
        let dateRegex = /(\d{1,2}/)\/(\d{1,2}/)\/?(\d{2,4})?/
        let dateParts = str.match(dateRegex)
        console.log('reformatDate', str, dateParts, dateRegex)
        let dateStr = ''
        let curYY = (newDate()).getFullYear()
        let year = dateParts[3]
        if (!year) {
            year = curYY
        } else if (year.length == 2){
            year = '20' + year
        }

        let month = dateParts[1]
        if(month.lefth == 1){
            month = '0' + month 
        }

        let day = dateParts[2]
        if(day.lefth == 1){
            day = '0' + day 
        }


        dateStr = `${year}${month}${day}`
        console.log('reformated', dateStr)

        return dateStr


    }
    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value
        const beginDate = this.reformatDate(document.querySelector('input[name="begin_date"]').value)
        const endDate = this.reformatDate(document.querySelector('input[name="end_date"]').value)
        const data = {
            q: term, 
            begin_date: beginDate,
            end_date: endDate,
            'api-key': this.API_KEY

        }
        axios.get(this.API_BASE_URL, {params: data}).then(this.processResults)
        
    }

    processResults = (response) => {
        console.log('got results!', response)

        // parent container
        const articleContainer = document.createElement('div');
        articleContainer.setAttribute('class', 'article-Container');
        const classResults = document.querySelector('.classResults')
        classResults.appendChild( articleContainer);

       



        // for loop for abstracts
        var abstracts = response.data.response.docs
        console.log(abstracts.length)
        for (let i =0; i < abstracts.length; i++){
            // this.showMessage(abstracts[i].byline.original)
            // console.log(abstracts[i].byline)

            const doc = abstracts[i]
            const headline = doc.headline.main
            const webUrl = doc.web_url
            const photoUrl = doc.multimedia[0].url
            const summary =  doc.snippet
            const sectionName = doc.section_name
            const author = abstracts[i].byline.original
            const pubDate = new Date(doc.pub_date).toLocaleString()
        
        //Article Item
        const articleItemEl = document.createElement('div');
        articleItemEl.setAttribute('class', 'article-item');
        articleContainer.appendChild(articleItemEl);

         //title
        const titleEl = document.createElement('h2');
        articleItemEl.appendChild(titleEl);

         //photo
         const photoEl = document.createElement('img');
         articleItemEl.appendChild(photoEl);
        photoEl.setAttribute('src',  'https://www.nytimes.com/' + photoUrl);

        //date
        
        const dateEl = document.createElement('p');
        dateEl.setAttribute('class', '.article-date');
        articleItemEl.appendChild(dateEl);
        dateEl.textContent = pubDate;
        
        

        //about/abstract
        const abstractEl = document.createElement('p');
        abstractEl.setAttribute('class', 'abstract-container');
        articleItemEl.appendChild(abstractEl);
        abstractEl.textContent = summary;

        //section_name
        const sectionNameEl = document.createElement('p');
        articleItemEl.appendChild(sectionNameEl);
        sectionNameEl.textContent = sectionName;

        //by line

        const authorEl = document.createElement('p');
        articleItemEl.appendChild(authorEl);
        authorEl.textContent = author;

         // anchor-link
         const linkEl = document.createElement('a');
         articleItemEl.appendChild(linkEl);
         const headlineEl = document.createElement('h3');
         headlineEl.textContent = headline;
         linkEl.appendChild(headlineEl);
         linkEl.setAttribute('href', webUrl);
         linkEl.setAttribute('target', '_blank');


         
        }
    }

}


new NYT_SearchAPI()

console.log("hi");class NYT_SearchAPI{API_BASE_URL="https://api.nytimes.com/svc/search/v2/articlesearch.json";API_KEY="CdyLSaf5xyJlIpqFXkXyEAbZ3E9h9iTS";constructor(){this.messageEl=document.querySelector("p.message"),this.setUpListener()}setUpListener(){document.querySelector('form[name="article_search"]').addEventListener("submit",this.handleSearch)}showMessage=e=>{this.messageEl.innerHTML=e};handleSearch=e=>{e.preventDefault(),console.log("searching....");const t={q:document.querySelector('input[name="term"]').value,"api-key":this.API_KEY};axios.get(this.API_BASE_URL,{params:t}).then(this.processResults)};processResults=e=>{console.log("got results!",e);const t=document.createElement("div");t.setAttribute("class","article-Container"),c.appendChild.setAttribute(t);const s=document.createElement("h2");t.appendChild(s);const n=document.createElement("img");t.appendChild(n);const a=document.createElement("p");a.setAttribute("class","abstract-container"),t.appendChild(a);const c=document.createElement("li");t.appendChild(c);const o=document.createElement("a");t.appendChild(o);const l=document.createElement("h3");o.appendChild(l),o.setAttribute("href"),o.setAttribute("target","blank");var r=e.data.response.docs;console.log(r.length);for(let e=0;e<r.length;e++)this.showMessage(r[e].byline.original),console.log(r[e].byline)}}new NYT_SearchAPI;
//# sourceMappingURL=main.js.map
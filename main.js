const API_KEY = '7d5487fec0cc40a5a42dbcd87743f25f';
        let newsList = [];
        const menus = document.querySelectorAll(".menus button");
        menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

        const getLatesNews = async () => {
            const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
            const response = await fetch(url);
            const data = await response.json();
            newsList = data.articles;
            render();
            console.log('Latest news', newsList);
        };

        const getNewsByCategory = async (event) => {
            const category = event.target.textContent.toLowerCase();
            console.log("category", category);
            const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
            const response = await fetch(url);
            const data = await response.json();
            console.log("Category data", data);
            newsList = data.articles;
            render();
        };

        const getNewsByKeyword = async () => {
            const keyword = document.getElementById("search-input").value;
            console.log("keyword", keyword);
            const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
            const response = await fetch(url);
            const data = await response.json();
            console.log("Keyword data", data);
            newsList = data.articles;
            render();
        };

        const render = () => {
            const newsHTML = newsList.map(news => 
                `<div class="row news">
                    <div class="col-lg-4">
                        <img class="news-img-size" src="${news.urlToImage}" />
                    </div>
                    <div class="col-lg-8">
                        <h2>${news.title}</h2>
                        <p>${news.description}</p>
                        <div>${news.source.name} * ${new Date(news.publishedAt).toLocaleDateString()}</div>
                    </div>
                </div>`
            ).join("");
            document.getElementById('news-board').innerHTML = newsHTML;
        };

        getLatesNews();
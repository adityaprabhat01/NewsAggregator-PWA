console.log('script loaded')
const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology']

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log('service worker registered', reg)
            loadHeadlines();
            loadCategories()
        })
        .catch(err => console.log('service worker not registered', err));
}

console.log('outside register')

async function loadHeadlines() {
    // http://localhost:3001
    await fetch('/topHeadlines').then((response) => {
        console.log(response)
        response.json().then((data) => {
            const newsImageCol1 = document.getElementsByClassName('news-image-col-1-url-image')
            const newsContentCol1 = document.getElementsByClassName('news-content-col-1')

            const newsImageCol2 = document.getElementsByClassName('news-image-col-2-url-image')
            const newsContentCol2 = document.getElementsByClassName('news-content-col-2')

            //const coverMain = document.getElementById('cover-main')
            const rowsCol1 = document.getElementsByClassName('rows-col-1')
            const rowsCol2 = document.getElementsByClassName('rows-col-2')
            //coverMain.src = data.urlToImage[0]
        
            var i = 1, j = 0

            for (i, j; j < 3; i += 1, j += 1) {

                if (data.description[i] === "" ||
                    data.title[i] === "" ||
                    data.url[i] === "" ||
                    data.urlToImage === null
                ) {
                    j -= 1
                }
                else {
                    rowsCol1[j].href = data.url[i]
                    newsContentCol1[j].innerHTML = data.title[i]
                    newsImageCol1[j].src = data.urlToImage[i]
                }


            }

            for (i, j = 0; j < 4; i += 1, j += 1) {
                if (data.description[i] === "" ||
                    data.title[i] === "" ||
                    data.url[i] === "" ||
                    data.urlToImage === null
                ) {
                    j -= 1
                }

                else {
                    rowsCol2[j].href = data.url[i]
                    newsContentCol2[j].innerHTML = data.title[i]
                    newsImageCol2[j].src = data.urlToImage[i]
                }

            }
        })
    })
}

async function loadCategories() {
    for (category of categories) {
        const fetchCategory = category
        // http://localhost:3001
        await fetch('/category?category=' + fetchCategory).then((response) => {
            response.json().then((data) => {

                cat = document.getElementById(fetchCategory)

                const newsCol = document.getElementById(fetchCategory)


                newsCol.children[0].href = data.url[0]
                cat.children[0].children[0].children[0].src = data.urlToImage[0]
                cat.children[0].children[1].innerHTML = data.title[0]

                newsCol.children[1].children[0].href = data.url[1]
                cat.children[1].children[0].children[0].children[0].src = data.urlToImage[1]
                cat.children[1].children[0].children[1].innerHTML = data.title[1]
                newsCol.children[1].children[1].href = data.url[2]
                cat.children[1].children[1].children[0].children[0].src = data.urlToImage[2]
                cat.children[1].children[1].children[1].innerHTML = data.title[2]
                newsCol.children[1].children[2].href = data.url[3]
                cat.children[1].children[2].children[0].children[0].src = data.urlToImage[3]
                cat.children[1].children[2].children[1].innerHTML = data.title[3]
            })
        })
    }
}

document.getElementById('sidebar-headline').addEventListener('click', (e) => {
    loadHeadlines()
})

// window.onload = loadHeadlines()
// window.onload = loadCategories()


function openNav() {
    document.getElementById("sidebar").style.width = "400px";
}


function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}
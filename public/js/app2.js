if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('service worker registered', reg) 
        loadNews()
      })
      .catch(err => console.log('service worker not registered', err));
}

console.log('outside register')
function loadNews() {

    const cat = location.href.split('/')[3]
    // http://localhost:3001
    fetch('/category?category=' + cat).then((response) => {
        response.json().then((data) => {
            console.log(data)
            
            var content = document.getElementById("content")
            for (var i=0;i<data.description.length;i+=1) {
                if(
                    data.url[i] !== "" &&
                    data.urlToImage[i] !== null &&
                    data.title[i] !== "" &&
                    data.description[i] !== ""
                ) {
                    var newsRow = document.createElement("a")
                    newsRow.setAttribute("class", "news-row")
                    newsRow.href = data.url[i]

                    var imageCol1 = document.createElement("div")
                    imageCol1.setAttribute("class", "image-col-1")
                    var img = document.createElement("img")
                    img.src = data.urlToImage[i]
                    img.setAttribute("class", "categorical-news-image-col-1-url-image")
                    imageCol1.appendChild(img)

                    
                    var titleCol2 = document.createElement("span")
                    titleCol2.setAttribute("class", "title-col-2")
                    titleCol2.innerHTML = data.title[i]

                    var desriptionCol3 = document.createElement("span")
                    desriptionCol3.setAttribute("class", "description-col-3")
                    desriptionCol3.innerHTML = data.description[i]

                    const hr = document.createElement("hr")

                    newsRow.append(imageCol1, titleCol2, desriptionCol3)
                    content.appendChild(newsRow)
                    content.appendChild(hr)
                }
            }
        })
    })
}

// window.onload = loadNews()

document.getElementById('sidebar-headline').addEventListener('click', (e) => {
    loadHeadlines()
})

function openNav() {
    document.getElementById("sidebar").style.width = "400px";
}


function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}
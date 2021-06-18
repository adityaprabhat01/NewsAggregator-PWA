// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => {
//         console.log('service worker registered', reg)
//       })
//       .catch(err => console.log('service worker not registered', err));
// }

function loadNews() {
  const pathname = window.location.pathname;
  const cat = pathname.slice(1, pathname.length);
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&category=" +
    cat +
    "&apiKey=add814b0c6064962826dc0a66259776e";
  fetch(url)
    .then((res) => res.json())
    .then((body) => {
      if (body.status != "ok") {
        res.send("Unable to fetch news data");
      } else {
        let sources = [];
        let titles = [];
        let descriptions = [];
        let urls = [];
        let urlToImages = [];

        for (var i = 0; i < body.articles.length; i += 1) {
          sources[i] = body.articles[i].source.name;
          titles[i] = body.articles[i].title;
          descriptions[i] = body.articles[i].description;
          urls[i] = body.articles[i].url;
          urlToImages[i] = body.articles[i].urlToImage;
        }
        var content = document.getElementById("content");
        const data = {
          sources,
          titles,
          descriptions,
          urls,
          urlToImages,
        };
        for (var i = 0; i < data.descriptions.length; i += 1) {
          if (
            data.urls[i] !== "" &&
            data.urlToImages[i] !== null &&
            data.urlToImages[i] !== "" &&
            data.titles[i] !== "" &&
            data.descriptions[i] !== ""
          ) {
            var newsRow = document.createElement("a");
            newsRow.setAttribute("class", "news-row");
            newsRow.href = data.urls[i];

            var imageCol1 = document.createElement("div");
            imageCol1.setAttribute("class", "image-col-1");
            var img = document.createElement("img");
            img.src = data.urlToImages[i];
            img.setAttribute("class", "categorical-news-image-col-1-url-image");
            imageCol1.appendChild(img);

            var titleCol2 = document.createElement("span");
            titleCol2.setAttribute("class", "title-col-2");
            titleCol2.innerHTML = data.titles[i];

            var desriptionCol3 = document.createElement("span");
            desriptionCol3.setAttribute("class", "description-col-3");
            desriptionCol3.innerHTML = data.descriptions[i];

            const hr = document.createElement("hr");

            newsRow.append(imageCol1, titleCol2, desriptionCol3);
            content.appendChild(newsRow);
            content.appendChild(hr);
          }
        }
      }
    })
    .catch(() => {
      res.status(404).render("fallback", {});
    });
}

window.onload = loadNews();

document.getElementById("sidebar-headline").addEventListener("click", (e) => {
  loadHeadlines();
});

function openNav() {
  document.getElementById("sidebar").style.width = "400px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

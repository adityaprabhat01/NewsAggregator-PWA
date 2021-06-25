// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js")
//     .then((reg) => {
//       console.log("service worker registered");
//     })
//     .catch((err) => console.log("service worker not registered", err));
// }

function loadHeadlines() {
  const newsImageCol1 = document.getElementsByClassName(
    "news-image-col-1-url-image"
  );
  const newsContentCol1 = document.getElementsByClassName("news-content-col-1");

  const newsImageCol2 = document.getElementsByClassName(
    "news-image-col-2-url-image"
  );
  const newsContentCol2 = document.getElementsByClassName("news-content-col-2");

  const rowsCol1 = document.getElementsByClassName("rows-col-1");
  const rowsCol2 = document.getElementsByClassName("rows-col-2");

  var i = 1,
    j = 0;

  for (i, j; j < 3; i += 1, j += 1) {
    if (
      descriptions[i] === "" ||
      titles[i] === "" ||
      urls[i] === "" ||
      urlToImages[i] === null ||
      urlToImages[i] === ""
    ) {
      j -= 1;
    } else {
      rowsCol1[j].href = urls[i];
      newsContentCol1[j].innerHTML = titles[i];
      newsImageCol1[j].src = urlToImages[i];
    }
  }

  for (i, j = 0; j < 4; i += 1, j += 1) {
    if (
      descriptions[i] === "" ||
      titles[i] === "" ||
      urls[i] === "" ||
      urlToImages[i] === null ||
      urlToImages[i] === ""
    ) {
      j -= 1;
    } else {
      rowsCol2[j].href = urls[i];
      newsContentCol2[j].innerHTML = titles[i];
      newsImageCol2[j].src = urlToImages[i];
    }
  }
}

async function loadCategories(category) {
  const url = "/category_headline" + "?category=" + category;
  await fetch(url)
    .then((res) => {
      res.json().then((body) => {
        const data = body;

        cat = document.getElementById(category);

        const newsCol = document.getElementById(category);

        var i = 0;

        i = getData(data, i);
        newsCol.children[0].href = data.urls[i];
        cat.children[0].children[0].children[0].src = data.urlToImages[i];
        cat.children[0].children[1].innerHTML = data.titles[i];

        i = getData(data, i);
        newsCol.children[1].children[0].href = data.urls[i];
        cat.children[1].children[0].children[0].children[0].src =
          data.urlToImages[i];
        cat.children[1].children[0].children[1].innerHTML = data.titles[i];

        i = getData(data, i);
        newsCol.children[1].children[1].href = data.urls[i];
        cat.children[1].children[1].children[0].children[0].src =
          data.urlToImages[i];
        cat.children[1].children[1].children[1].innerHTML = data.titles[i];

        i = getData(data, i);
        newsCol.children[1].children[2].href = data.urls[i];
        cat.children[1].children[2].children[0].children[0].src =
          data.urlToImages[i];
        cat.children[1].children[2].children[1].innerHTML = data.titles[i];
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

function showMore() {
  var content = document.getElementById("content-more");
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
      newsRow.setAttribute("class", "news-row-more");
      newsRow.href = data.urls[i];

      var imageCol1 = document.createElement("div");
      imageCol1.setAttribute("class", "image-col-1-more");
      var img = document.createElement("img");
      img.src = data.urlToImages[i];
      img.setAttribute("class", "categorical-news-image-col-1-url-image-more");
      imageCol1.appendChild(img);

      var titleCol2 = document.createElement("span");
      titleCol2.setAttribute("class", "title-col-2-more");
      titleCol2.innerHTML = data.titles[i];

      var desriptionCol3 = document.createElement("span");
      desriptionCol3.setAttribute("class", "description-col-3-more");
      desriptionCol3.innerHTML = data.descriptions[i];

      const hr = document.createElement("hr");

      newsRow.append(imageCol1, titleCol2, desriptionCol3);
      content.appendChild(newsRow);
      content.appendChild(hr);
    }
  }
  document.getElementById("show-more-headline").style.display = "none";

  var show_less = document.createElement("button");
  show_less.setAttribute("class", "show-less");
  show_less.setAttribute("id", "show-less-headline");
  show_less.innerHTML = "Show less";
  show_less.addEventListener("click", showLess);
  document.getElementById("more").appendChild(show_less);
  //document.getElementById("show-less-headline").style.display = "inline"
}

function showLess() {
  var myNode = document.getElementById("content-more");
  var fc = myNode.firstChild;
  while (fc) {
    myNode.removeChild(fc);
    fc = myNode.firstChild;
  }
  document.getElementById("show-less-headline").remove()
  document.getElementById("show-more-headline").style.display = "inline-block";
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
}

document.getElementById("sidebar-headline").addEventListener("click", (e) => {
  loadHeadlines();
});

document
  .getElementById("show-more-headline")
  .addEventListener("click", showMore);

window.onload = loadHeadlines();
window.onload = loadCategories("business");
window.onload = loadCategories("entertainment");
window.onload = loadCategories("health");
window.onload = loadCategories("science");
window.onload = loadCategories("sports");
window.onload = loadCategories("technology");

function openNav() {
  document.getElementById("sidebar").style.width = "400px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

function getData(data, i) {
  i++;
  while (
    data.descriptions[i] === "" ||
    data.titles[i] === "" ||
    data.urls[i] === "" ||
    data.urlToImages[i] === null ||
    data.urlToImages[i] === ""
  )
    i++;
  return i;
}

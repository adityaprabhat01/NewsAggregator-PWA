if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("service worker registered");
    })
    .catch((err) => console.log("service worker not registered", err));
}

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

document.getElementById("sidebar-headline").addEventListener("click", (e) => {
  loadHeadlines();
});

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

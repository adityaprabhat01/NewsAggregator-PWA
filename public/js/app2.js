if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('service worker registered', reg)
      })
      .catch(err => console.log('service worker not registered', err));
}

var count = 0;

async function clear_cache(loadNews) {
  caches.keys().then(async function(names) {
    for (let name of names) {
      console.log("Deleted ", name)
      if(name !== "NewsApp") {
        caches.delete(name).then(found => {
          count++;
          console.log(count)
          if(count === 3) {
            setLastOnline();
            loadNews();
          }
        })
      }
    }
});
}

var isCacheExpired;

function setLastOnline() {
  console.log("setLastOnline")
  fetch("/lastOnline").then(res => {
    caches.open("last-time-online").then(cache => {
      cache.put("last-time-online", res);
    })
  })
}


function verifyCache(loadNews, setLastOnline) {
  caches.match("last-time-online").then(cacheRes => {
    if(cacheRes) {
      cacheRes.json().then(data => {
        fetch("/verifyCache", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: data.timestamp
          })
        }).then(res => {
          return res.json()
        }).then(async (res) => {
          const { isExpired } = res;
          console.log(isExpired)
          if(isExpired) {
            await clear_cache(loadNews, setLastOnline);
            
          } else {
            console.log("hi")
            loadNews();
          }
        })
        .catch(err => {})
      })
    } else {
      setLastOnline();
      loadNews();
    }
    
  })
}

window.onload = verifyCache(loadNews, setLastOnline);

// window.onload = clear_cache();

function loadNews() {

  console.log("load news")
  const pathname = window.location.pathname
  const cat = pathname.slice(1, pathname.length)  
  fetch('/category?category=' + cat).then(res => {
    res.json().then((data) => {
      var content = document.getElementById("content");
      document.getElementById("loader").style.visibility = "hidden"
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
    });
  })
}

//window.onload = loadNews();

document.getElementById("sidebar-headline").addEventListener("click", (e) => {
  loadHeadlines();
});

function openNav() {
  document.getElementById("sidebar").style.width = "400px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

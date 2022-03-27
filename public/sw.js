const str = now();
const staticCacheName = "NewsApp";
const dynamicCacheName = "NewsApp-dynamic-" + str;
const imageCache = "Image-Cache-" + str;
const lastTimeOnline = "last-time-online";
const imageTypes = ["jpg", "png", "jpeg", "apng", "avif", "gif", "svg", "webp"];
console.log(str);
/*
  The assets will be fetched from the server and doesn't
  depend whether these assets are received at that route.
  A list of local resources we always want to be cached.
  Add urls to js, icons, css etc
*/
const assets = [
  "/sw.js",
  "/fallback",
  "/js/app.js",
  "/js/app2.js",
  "/css/style.css",
  "/css/style1.css",
  "/css/style3.css",
  "/manifest.json",
  "/img/close.png",
  "/img/favicon.png",
  "https://fonts.gstatic.com/s/oswald/v36/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZosUZiZQ.woff2",
  "https://fonts.gstatic.com/s/lateef/v18/hESw6XVnNCxEvkb8oR2F.woff2",
  "https://fonts.gstatic.com/s/worksans/v9/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K-DQBi8Jpg.woff2",
  "https://fonts.gstatic.com/s/newscycle/v17/CSR54z1Qlv-GDxkbKVQ_dFsvWNReuQ.woff2",
  "https://fonts.gstatic.com/s/muli/v22/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk30eg.woff2",
  "https://fonts.googleapis.com/css?family=Muli&display=swap",
  "https://fonts.googleapis.com/css2?family=News+Cycle:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Work+Sans:wght@900&display=swap",
  "https://fonts.googleapis.com/css2?family=Lateef&display=swap",
];

var lastOnline = ""

function limitCacheSize(name, size) {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

function isExpired(lastOnline) {
  if (!lastOnline) return true;
  if ((30000) + parseFloat(lastOnline) > new Date().getTime()) return false;
  return true;
};
//1000 * 60 * 60 * 2
function now() {
  return new Date().valueOf().toString();
}

async function checkLastTimeOnline() {
  caches.match(lastTimeOnline).then(cacheRes => {
    let x;
    if(cacheRes) {
      cacheRes.json().then(body => {
        console.log(body)
        x = body.timestamp;
      })
      return cacheRes;
    } else {
      return null;
    }
  })
}

function setLastOnline() {
  console.log("setLastOnline")
  fetch("/lastOnline").then(res => {
    caches.open(lastTimeOnline).then(cache => {
      cache.put(lastTimeOnline, res);
    })
  })
}

/*
  install handler precaches all the resources that we always need.
  those files are cached that are always needed.
*/
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(assets);
      })
      // forces the waiting service worker to get activated
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", (evt) => {
  console.log("activated");
  // clean up resources
  evt.waitUntil(
    /*
      Names of the different caches are fetched which
      returns an array of promises having name as cache name.
      Each promise in the array is resolved by matching the
      name of old cache with the updated cache name i.e., if
      the cache name is not equal to the static cache name then
      that cache is filtered out in the new array which is then
      mapped again and each of the old cache is deleted. Activation and
      installation only happens after sw is modified.
    */
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => {
            console.log(key);
            caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  event.respondWith(

    caches.match(event.request).then(async function(cacheRes) {


          return cacheRes || fetch(event.request).then(fetchRes => {
            const url = event.request.url;
            if(url.includes("/lastOnline") || url.includes("/verifyCache")) {
              console.log(event.request.url)
              return fetchRes;
            }
            console.log("fetch")
            if(event.request.destination === "image") {
              return caches.open(imageCache).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                return fetchRes;
              })
            }
    
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(event.request.url, fetchRes.clone());
              return fetchRes;
            })
          });

    }).catch(function() {
      return caches.match('/offline.html');
    })
  );





  // event.respondWith(

  //   caches.match(event.request).then(async function(response) {
  //     caches.match(lastTimeOnline).then(lastCacheStatus => {
  //       if(!lastCacheStatus) {
  //         setLastOnline();

  //         return response || fetch(event.request).then(fetchRes => {
  //           if(event.request.destination === "image") {
  //             return caches.open(imageCache).then(cache => {
  //               cache.put(event.request.url, fetchRes.clone());
  //               return fetchRes;
  //             })
  //           }
    
  //           return caches.open(dynamicCacheName).then(cache => {
  //             cache.put(event.request.url, fetchRes.clone());
  //             return fetchRes;
  //           })
  //         });


  //       } else {
  //         lastCacheStatus.json().then(body => {
  //           const timestamp = body.timestamp;
  //           const expired = isExpired(timestamp);
  //           if(expired) {
  //             //setLastOnline();

  //             // delete all cache
  //             // caches.keys().then((keys) => {
  //             //   return Promise.all(
  //             //     keys
  //             //       .filter((key) => key !== staticCacheName && (key === dynamicCacheName || key === imageCache || key === lastTimeOnline))
  //             //       .map((key) => {
  //             //         console.log("Deleted ", key);
  //             //         caches.delete(key);
  //             //       }),
  //             //   );
  //             // })
  //           }
  //         })
  //       }        
  //     })
  //     console.log("Fetched")
  //     return response || fetch(event.request).then(fetchRes => {
  //       if(event.request.destination === "image") {
  //         return caches.open(imageCache).then(cache => {
  //           cache.put(event.request.url, fetchRes.clone());
  //           return fetchRes;
  //         })
  //       }

  //       return caches.open(dynamicCacheName).then(cache => {
  //         cache.put(event.request.url, fetchRes.clone());
  //         return fetchRes;
  //       })
  //     });


  //   }).catch(function() {
  //     return caches.match('/offline.html');
  //   })
  // );
});

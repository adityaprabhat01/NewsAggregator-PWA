const staticCacheName = "NewsApp";
const dynamicCacheName = "NewsApp-dynamic";

/*
  The assets will be fetched from the server and doesn't
  depend whether these assets are received at that route.
  A list of local resources we always want to be cached.
  Add urls to js, icons, css etc.
*/
const assets = [
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
  "/"
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

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
      mapped again and each of the old cache is deleted.
    */
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  
  caches
    .match(evt.request)
    .then((cacheRes) => {
      console.log(evt.request.url, cacheRes);
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            //limitCacheSize(dynamicCacheName, 10)
            return fetchRes;
          });
        })
      );
    })
    .catch(() => {
      if (evt.request.url.indexOf(".html") > -1) {
        return caches.match("/fallback");
      }
    });
});

// indexedDB for saving the api fetched data

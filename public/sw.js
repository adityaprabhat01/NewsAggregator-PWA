const staticCacheName = 'NewsApp'
const dynamicCacheName = 'NewsApp-dynamic'

/*
  The assets will be fetched from the server and doesn't
  depend whether these assets are received at that route.
  A list of local resources we always want to be cached.
  Add urls to js, icons, css etc.
*/
const assets = [
  '/fallback',
  './js/app.js',
  './js/app2.js',
  './css/style.css',
  './css/style1.css',
  '/manifest.json',
]

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

/*
  install handler precaches all the resources that we always need.
  those files are cached that are always needed.
*/
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName)
      .then(cache => { cache.addAll(assets) })
      // forces the waiting service worker to get activated
      .then(self.skipWaiting())
  )
})


self.addEventListener('activate', evt => {
  console.log('activated')
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
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
})


self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cacheRes => {
        return cacheRes || fetch(evt.request)
          .then(fetchRes => {
            return caches.open(dynamicCacheName)
              .then(cache => {
                cache.put(evt.request.url, fetchRes.clone())
                limitCacheSize(dynamicCacheName, 10)
                return fetchRes
              })
          })
      })
      .catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/fallback')
        }
      }
    )
  )
})

// indexedDB for saving the api fetched data
const staticCacheName = 'NewsApp'
const dynamicCacheName = 'NewsApp-dynamic'

// A list of local resources we always want to be cached.
const assets = [
  '/fallback',
  './js/app.js',
  './js/app2.js',
  './css/style.css',
  './css/style1.css',
  '/manifest.json'
]

/*
// install handler precaches all the resources that we always need.
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
  evt.waitUntil()
  // evt.waitUntil(
  //   caches.keys().then(keys => {
  //     return Promise.all(keys
  //       .filter(key => key !== staticCacheName && key !== dynamicCacheName)
  //       .map(key => caches.delete(key)) //
  //     )
  //   })
  // )
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cacheRes => {
        return cacheRes || fetch(evt.request)
          .then(fetchRes => {
            //return caches.open(dynamicCacheName)
              //.then(cache => {
                //cache.put(evt.request.url, fetchRes.clone())
                return fetchRes
              //})
          })
      })
      .catch(() => {
        return caches.match('/fallback')
      }
    )
  )
})

*/
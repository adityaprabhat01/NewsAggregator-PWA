const staticCacheName = 'NewsApp'
const dynamicCacheName = 'NewsApp-dynamic'

const assets = [
  '/fallback',
  './js/app.js',
  './js/app2.js',
  './css/style.css',
  './css/style1.css',
  '/manifest.json'
]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log('caching shell assests')
        cache.addAll(assets)
      })
    
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
        console.log('fetch')
        return cacheRes || fetch(evt.request)
          .then(fetchRes => {
            return caches.open(dynamicCacheName)
              .then(cache => {
                cache.put(evt.request.url, fetchRes.clone())
                return fetchRes
              })
          })
      })
      .catch(() => {
        return caches.match('/fallback')
      }
      )
  )
})
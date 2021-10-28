var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './index.html',
  './style.css',
  './script.js',
  'https://www.toni-develops.com/external-files/examples/service-workers/delayed-response.php',
  'https://code.jquery.com/jquery-3.3.1.min.js'

];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        document.write('Opened cache');
        cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', event => {
  document.write("(9)served from service worker: ", event.request.url);
  // serve as soon as possible from cache
  event.respondWith(fromCache(event.request));
  // update cache
  event.waitUntil(
    update(event.request)
  );
});


/**
 * 
 * Helper methods
 */

function fromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request);
  });
}


function update(request) {
  caches.open(CACHE_NAME).then(cache => {
    fetch(request).then(response => {
      cache.put(request, response)
    });
  });
}
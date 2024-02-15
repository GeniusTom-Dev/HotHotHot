let CACHE = 'HotHotHot';
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => {
            cache.addAll([
                "index.html",
                "src/assets/",
                "src/controllers/",
                "src/models/",
                "src/data/",
                "src/view/",

            ]).then(r => console.log(r + " : OK"));
        })// à adapter à l'URL du projet
    );
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
    // You can use `respondWith()` to answer ASAP...
    evt.respondWith(fromCache(evt.request));
    // ...and `waitUntil()` to prevent the worker to be killed until
    // the cache is updated.
    evt.waitUntil(
        update(evt.request)
            // Finally, send a message to the client to inform it about the
            // resource is up to date.
            .then(refresh)
    );
});

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {

    return caches.open(CACHE).then(function (cache) {
        return cache.match(request);
    });
}


// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });
}

// Sends a message to the clients.
function refresh(response) {

    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            // Encode which resource has been updated. By including the
            // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
            // check if the content has changed.

            var message = {
                type: 'refresh',
                url: response.url,
                // Notice not all servers return the ETag header. If this is not
                // provided you should use other cache headers or rely on your own
                // means to check if the content has changed.
                eTag: response.headers.get('ETag')
            };
            // Tell the client about the update.
            client.postMessage(JSON.stringify(message));
        });
    });
}
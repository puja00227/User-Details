let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/index.html',
                '/users/create',
                '/'
                // '/favicon.ico',
                // '/manifest.json',
                // '/users/alluser',
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request).then((resp) => {
            if (resp) {
                return resp
            }
            let requestUrl = event.request.clone();
            fetch(requestUrl)
        })
    )
    }
})
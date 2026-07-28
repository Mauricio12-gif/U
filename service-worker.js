const CACHE_NAME = "our-story-v2";

const FILES_TO_CACHE = [
    "./",
    "index.html",
    "style.css",
    "script.js",
    "firebase.js",
    "manifest.json",
    "icon.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
        .then(response => {

            return caches.open(CACHE_NAME)
            .then(cache => {

                cache.put(event.request, response.clone());

                return response;

            });

        })
        .catch(() => {

            return caches.match(event.request);

        })

    );

});
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

});

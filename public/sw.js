const CACHE = "2048-v1";
const ASSETS = [
    "/2048game/",
    "/2048game/index.html"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached ?? fetch(e.request))
    );
});
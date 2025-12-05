const CACHE_NAME = 'skener-app-v4';
const FILES_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// 1. INSTALACIJA: Keširaj fajlove odmah
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// 2. AKTIVACIJA: Obriši stare kešove ako promeniš verziju
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// 3. FETCH: Presretni svaki zahtev
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Ako je fajl u kešu, vrati ga odatle (OFFLINE RADI!)
            if (response) {
                return response;
            }
            // Ako nije, probaj da ga skineš sa neta (npr. tvoj logo sa Postimage)
            return fetch(event.request);
        })
    );
});




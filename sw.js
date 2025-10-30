const CACHE_NAME = 'vtwpw-cache-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // HTML (navigation) -> Network-first
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).then((res)=>{
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c)=>c.put(request, copy));
        return res;
      }).catch(() => caches.match(request).then((r)=> r || caches.match('./index.html')))
    );
  } else {
    // Others -> Cache-first
    e.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached || fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy));
            return res;
          })
        );
      })
    );
  }
});
// Offline cache so the home-screen app opens without network (HTTPS hosting only)
const CACHE = 'anneal-v6';
const FILES = ['./', 'index.html', 'manifest.json', 'icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// network first, fall back to cache. 'no-cache' revalidates with the server every time
// (cheap 304) instead of trusting GitHub Pages' 10-minute max-age, so updates show up at once.
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});

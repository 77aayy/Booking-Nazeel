// sw.js — Instant Update Mode

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  clients.claim();
});

// منع أي كاش نهائياً — كل طلب يجيب أحدث ملف من السيرفر
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
  );
});

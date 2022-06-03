const CACHE_NAME = "offline";

const BASE_URL = "http://localhost:8000";
const URLS_TO_SAVE = ["/index.html", "/dist/main.js", "/favicon.ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.all(
        URLS_TO_SAVE.map((url) => {
          return cache.add(new Request(url, { cache: "reload" }));
        })
      );
    })()
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      if (event.request.url === `${BASE_URL}/`) {
        return await cache.match("/index.html");
      }
      for (url of URLS_TO_SAVE) {
        if (event.request.url === `${BASE_URL}${url}`) {
          return await cache.match(url);
        }
      }
    })()
  );
});

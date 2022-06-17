const CACHE_NAME = "offline";

const BASE_URL = "https://raydzast.github.io/studytime";
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
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        // First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        // Always try the network first.
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log("Fetch failed; returning offline page instead.", error);

        const cache = await caches.open(CACHE_NAME);

        if (event.request.url === `${BASE_URL}/`) {
          return await cache.match("/index.html");
        }
        for (url of URLS_TO_SAVE) {
          if (event.request.url === `${BASE_URL}${url}`) {
            return await cache.match(url);
          }
        }
      }
    })()
  );
});

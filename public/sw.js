self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("fetch", () => {
  // network-first, no caching strategy for now
});

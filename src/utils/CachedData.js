export const addCachedData = (cacheName, request, response) => {
  const data = new Response(JSON.stringify(response));

  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      cache.put(request, data);
    });
  }
};

export const removeCachedData = (cacheName, request) => {
  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      cache.delete(request);
    });
  }
};

export const getCachedData = async (cacheName, request) => {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(request);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
};

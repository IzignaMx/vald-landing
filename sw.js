const CACHE_NAME = 'vald-v2.0';
const STATIC_CACHE = 'vald-static-v2.0';
const DYNAMIC_CACHE = 'vald-dynamic-v2.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/images/VALD.png',
  '/vald.jpg',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/site.webmanifest'
];

// Resources to cache on demand (PSD-extracted layers — will be added as they appear)
const CACHE_ON_DEMAND = [
  '/images/layer-ornaments.png',
  '/images/layer-mountains.png',
  '/images/layer-vald-lettering.png',
  '/images/layer-cyclist.png',
  '/images/layer-flames.png',
  '/images/layer-cloud.png',
  '/images/layer-landscape.png',
  '/images/layer-temple.png',
  '/images/paper-texture.jpg',
  '/corredores.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('vald-') &&
                     cacheName !== STATIC_CACHE &&
                     cacheName !== DYNAMIC_CACHE;
            })
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  // Handle different types of requests
  if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.url.includes('.css') || request.url.includes('.js')) {
    event.respondWith(handleStaticRequest(request));
  } else {
    event.respondWith(handleOtherRequest(request));
  }
});

// Handle document requests (HTML)
async function handleDocumentRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      updateCacheInBackground(request);
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Handle image requests
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Image not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Handle static assets (CSS, JS)
async function handleStaticRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return caches.match(request);
  }
}

// Handle other requests (JSON, etc.)
async function handleOtherRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Content not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Update cache in background
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    // Silently fail
  }
}

// Clean up old cache entries periodically
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanupCache();
  }
});

async function cleanupCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  if (requests.length > 50) {
    const requestsToDelete = requests.slice(0, requests.length - 50);
    await Promise.all(
      requestsToDelete.map(request => cache.delete(request))
    );
  }
}
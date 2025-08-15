const CACHE_NAME = 'vald-v1.2';
const STATIC_CACHE = 'vald-static-v1.2';
const DYNAMIC_CACHE = 'vald-dynamic-v1.2';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/corredores.html',
  '/styles.min.css',
  '/images/VALD.png',
  '/images/valley.jpg',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/site.webmanifest',
  '/rey-de-la-montana.svg'
];

// Resources to cache on demand
const CACHE_ON_DEMAND = [
  '/images/ruta-completa.png',
  '/images/altimetria.png',
  '/data/sponsors.json',
  '/route/vald.gpx',
  '/corredores.txt'
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
    // HTML pages - cache first with network fallback
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'image') {
    // Images - cache first with network fallback
    event.respondWith(handleImageRequest(request));
  } else if (request.url.includes('.css') || request.url.includes('.js')) {
    // CSS/JS - cache first
    event.respondWith(handleStaticRequest(request));
  } else {
    // Other resources - network first with cache fallback
    event.respondWith(handleOtherRequest(request));
  }
});

// Handle document requests (HTML)
async function handleDocumentRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Serve from cache and update in background
      updateCacheInBackground(request);
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try to serve offline page or cached version
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

// Handle other requests (JSON, GPX, etc.)
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
    // Silently fail - we're already serving from cache
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
  
  // Keep only the 50 most recent dynamic cache entries
  if (requests.length > 50) {
    const requestsToDelete = requests.slice(0, requests.length - 50);
    await Promise.all(
      requestsToDelete.map(request => cache.delete(request))
    );
  }
}
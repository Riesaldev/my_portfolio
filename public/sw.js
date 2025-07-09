// Service Worker para el portfolio
const CACHE_NAME = 'portfolio-cache-v1';
const RESOURCES_CACHE = 'portfolio-resources-v1';

// Recursos críticos para cachear inmediatamente
const CRITICAL_RESOURCES = [
  '/',
  '/precarga',
  '/menu',
  '/assets/logo2.svg',
  '/assets/LOGO.svg',
  '/assets/menu-hamburguesa.svg',
  '/assets/cruz.svg',
  '/dragon/dragon.html',
  '/dragon/dragon.css',
  '/dragon/dragon.js'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        // Activar inmediatamente
        return self.skipWaiting();
      })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RESOURCES_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Solo cachear GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia cache-first para recursos estáticos
  if (request.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|webm|mp4|mp3|woff|woff2|ttf|eot)$/)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request).then((response) => {
            // Solo cachear responses válidas
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(RESOURCES_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          });
        })
    );
  }
  // Estrategia network-first para páginas
  else if (request.url.match(/\/(about|contact|portfolio|farewell|menu|precarga)?$/)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  const { type, resources } = event.data;
  
  switch (type) {
    case 'PRELOAD_RESOURCES':
      if (resources && Array.isArray(resources)) {
        preloadResources(resources);
      }
      break;
    
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
    
    case 'GET_CACHE_STATUS':
      getCacheStatus().then((status) => {
        event.ports[0].postMessage(status);
      });
      break;
  }
});

// Función para precargar recursos
async function preloadResources(resources) {
  try {
    const cache = await caches.open(RESOURCES_CACHE);
    
    for (const resource of resources) {
      try {
        const response = await fetch(resource);
        if (response.ok) {
          await cache.put(resource, response);
        }
      } catch (error) {
        console.error(`Error preloading resource ${resource}:`, error);
      }
    }
  } catch (error) {
    console.error('Error preloading resources:', error);
  }
}

// Función para limpiar todas las caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
  } catch (error) {
    console.error('Error clearing caches:', error);
  }
}

// Función para obtener estado de cache
async function getCacheStatus() {
  try {
    const cacheNames = await caches.keys();
    const status = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      status[cacheName] = keys.length;
    }
    
    return status;
  } catch (error) {
    console.error('Error getting cache status:', error);
    return {};
  }
}

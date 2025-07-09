import { useState, useEffect } from 'react';

export const useResourceCache = () => {
  const [cacheStatus, setCacheStatus] = useState({
    supported: false,
    initialized: false,
    error: null
  });

  // Inicializar cache
  useEffect(() => {
    const initializeCache = async () => {
      try {
        if ('caches' in window) {
          setCacheStatus(prev => ({ ...prev, supported: true }));
          
          // Crear cache para recursos del portfolio
          await caches.open('portfolio-resources-v1');
          
          setCacheStatus(prev => ({ ...prev, initialized: true }));
        } else {
          setCacheStatus(prev => ({ 
            ...prev, 
            supported: false,
            error: 'Cache API not supported' 
          }));
        }
      } catch (error) {
        setCacheStatus(prev => ({ 
          ...prev, 
          error: error.message 
        }));
      }
    };

    initializeCache();
  }, []);

  // Función para cachear un recurso
  const cacheResource = async (url, resourceType = 'generic') => {
    if (!cacheStatus.supported || !cacheStatus.initialized) {
      return false;
    }

    try {
      const cache = await caches.open('portfolio-resources-v1');
      const cachedResponse = await cache.match(url);
      
      if (cachedResponse) {
        return true; // Ya está cacheado
      }

      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response.clone());
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Error caching ${resourceType}:`, error);
      return false;
    }
  };

  // Función para cachear múltiples recursos
  const cacheMultipleResources = async (resources, resourceType = 'generic') => {
    if (!cacheStatus.supported || !cacheStatus.initialized) {
      return { success: [], failed: resources };
    }

    const results = { success: [], failed: [] };
    
    for (const resource of resources) {
      try {
        const cached = await cacheResource(resource, resourceType);
        if (cached) {
          results.success.push(resource);
        } else {
          results.failed.push(resource);
        }
      } catch (error) {
        results.failed.push(resource);
      }
    }

    return results;
  };

  // Función para obtener un recurso del cache
  const getCachedResource = async (url) => {
    if (!cacheStatus.supported || !cacheStatus.initialized) {
      return null;
    }

    try {
      const cache = await caches.open('portfolio-resources-v1');
      const cachedResponse = await cache.match(url);
      return cachedResponse;
    } catch (error) {
      console.error('Error getting cached resource:', error);
      return null;
    }
  };

  // Función para limpiar cache antiguo
  const clearOldCache = async () => {
    if (!cacheStatus.supported) return;

    try {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith('portfolio-resources-') && name !== 'portfolio-resources-v1'
      );

      await Promise.all(oldCaches.map(name => caches.delete(name)));
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  };

  return {
    cacheStatus,
    cacheResource,
    cacheMultipleResources,
    getCachedResource,
    clearOldCache
  };
};

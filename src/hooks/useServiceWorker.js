import { useState, useEffect } from 'react';

export const useServiceWorker = () => {
  const [swStatus, setSwStatus] = useState({
    supported: false,
    registered: false,
    error: null,
    worker: null
  });

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        setSwStatus(prev => ({ ...prev, supported: true }));
        
        try {
          // Registrar service worker si existe
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          setSwStatus(prev => ({ 
            ...prev, 
            registered: true,
            worker: registration 
          }));

          // Escuchar actualizaciones
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                console.log('Service Worker actualizado');
              }
            });
          });

        } catch (error) {
          setSwStatus(prev => ({ 
            ...prev, 
            error: error.message 
          }));
        }
      } else {
        setSwStatus(prev => ({ 
          ...prev, 
          supported: false,
          error: 'Service Worker not supported' 
        }));
      }
    };

    registerServiceWorker();
  }, []);

  // Función para enviar mensajes al service worker
  const sendMessage = async (message) => {
    if (!swStatus.supported || !swStatus.registered) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        registration.active.postMessage(message);
      }
    } catch (error) {
      console.error('Error sending message to service worker:', error);
    }
  };

  // Función para precargar recursos usando service worker
  const preloadWithSW = async (resources) => {
    if (!swStatus.supported || !swStatus.registered) {
      return false;
    }

    try {
      await sendMessage({
        type: 'PRELOAD_RESOURCES',
        resources
      });
      return true;
    } catch (error) {
      console.error('Error preloading with service worker:', error);
      return false;
    }
  };

  return {
    swStatus,
    sendMessage,
    preloadWithSW
  };
};

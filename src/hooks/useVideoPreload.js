import { useState, useEffect } from 'react';
import { preloadConfig } from '@/data/portalConfig';

export const useVideoPreload = () => {
  const [videosLoaded, setVideosLoaded] = useState(preloadConfig.initialVideoStates);
  const [videoLoadProgress, setVideoLoadProgress] = useState(preloadConfig.initialProgressStates);

  // Función para precargar videos usando la API Cache
  const preloadVideos = async () => {
    try {
      // Intentar abrir o crear una caché específica para los videos
      const videoCache = await caches.open('video-cache-v1');
      
      // Para cada video, verificar si ya está en caché, y si no, añadirlo
      for (const { url, key } of preloadConfig.videos) {
        try {
          // Convertir el import a string para obtener la URL real
          const videoUrl = url.toString();
          
          // Verificar si el video ya está en caché
          const cachedResponse = await videoCache.match(videoUrl);
          
          if (!cachedResponse) {
            // Hacer una solicitud para el video
            const response = await fetch(videoUrl);
            
            if (response.ok) {
              // Guardar en caché
              await videoCache.put(videoUrl, response.clone());
              
              // Marcar como completamente cargado
              setVideosLoaded(prev => ({
                ...prev,
                [key]: true
              }));
              
              setVideoLoadProgress(prev => ({
                ...prev,
                [key]: 100
              }));
            } else {
              console.error(`Error cargando ${key}: ${response.statusText}`);
            }
          } else {
            // Si ya está en caché, marcarlo como cargado
            setVideosLoaded(prev => ({
              ...prev,
              [key]: true
            }));
            
            setVideoLoadProgress(prev => ({
              ...prev,
              [key]: 100
            }));
          }
        } catch (error) {
          console.error(`Error procesando ${key}:`, error);
        }
      }
    } catch (error) {
      console.error("Error accediendo a la caché:", error);
    }
  };

  // Iniciar la precarga de videos cuando el hook se monte
  useEffect(() => {
    preloadVideos();
  }, []);

  return {
    videosLoaded,
    videoLoadProgress,
    preloadVideos
  };
};

import { useState, useEffect } from 'react';
import { preloadConfig } from '@/data/portalConfig';

export const useDragonAnimation = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const handleIframeLoad = () => {
    // Dar tiempo para que la animación del dragón se inicialice completamente
    setTimeout(() => {
      setAnimationLoaded(true);
    }, preloadConfig.dragonLoadDelay);
  };

  // Manejar mensajes del iframe del dragón
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'dragonLoaded') {
        setAnimationLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return {
    animationLoaded,
    handleIframeLoad
  };
};

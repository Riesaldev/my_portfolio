import { useState } from 'react';

/**
 * Hook personalizado para manejar la precarga y mostrar el contenido principal
 * Controla la transición entre la página de precarga y el contenido principal
 */
export function usePreloadTransition() {
  const [showHome, setShowHome] = useState(false);

  const handleContinue = () => {
    setShowHome(true);
  };

  return {
    showHome,
    handleContinue,
  };
}

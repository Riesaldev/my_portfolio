import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook personalizado para manejar la expansión y animación de videos
 * Maneja el estado de expansión, animaciones, y redirección automática
 */
export function useVideoExpansion() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoRect, setVideoRect] = useState(null);
  const [expandAnimation, setExpandAnimation] = useState(false);
  const videoRef = useRef(null);
  const expandedVideoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Obtener la posición y tamaño del video antes de expandir
        const rect = videoRef.current.getBoundingClientRect();
        setVideoRect(rect);
        setIsExpanded(true);
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleExpandedVideoClick = () => {
    if (expandedVideoRef.current) {
      expandedVideoRef.current.pause();
    }
    setIsExpanded(false);
    setTimeout(() => setVideoRect(null), 3100);
  };

  // Efecto para controlar la animación de expansión
  useEffect(() => {
    if (isExpanded && videoRect) {
      // Aplicar la animación después de un pequeño retraso
      const animationTimer = setTimeout(() => {
        setExpandAnimation(true);
        if (expandedVideoRef.current) {
          expandedVideoRef.current.play();
        }
        
        // Redirigir a menu cuando termina la animación
        const redirectTimer = setTimeout(() => {
          router.push('/menu');
        }, 4000); // 4 segundos, coincidiendo con la duración de la transición

        return () => clearTimeout(redirectTimer);
      }, 50);

      return () => clearTimeout(animationTimer);
    } else {
      setExpandAnimation(false);
    }
  }, [isExpanded, videoRect, router]);

  // Estilos para la animación de expansión
  const getVideoStyles = () => {
    const initialStyle = videoRect ? {
      position: "fixed",
      left: videoRect.left,
      top: videoRect.top,
      width: videoRect.width,
      height: videoRect.height,
      transition: "all 8s cubic-bezier(0.4,0,0.2,1)",
      zIndex: 100,
    } : {};

    const videoWrapperStyle = {
      ...initialStyle,
      ...(expandAnimation ? {
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.9)",
      } : {}),
    };

    const expandedVideoStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transform: expandAnimation ? "scale(10) translateX(15%)" : "",
      transformOrigin: "center center",
      transition: "all 8s cubic-bezier(0.4,0,0.2,1)",
      WebkitMaskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)',
      maskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)'
    };

    return { videoWrapperStyle, expandedVideoStyle };
  };

  return {
    // Estados
    isExpanded,
    videoRect,
    expandAnimation,
    
    // Referencias
    videoRef,
    expandedVideoRef,
    
    // Funciones
    handleVideoClick,
    handleExpandedVideoClick,
    
    // Estilos
    getVideoStyles,
  };
}

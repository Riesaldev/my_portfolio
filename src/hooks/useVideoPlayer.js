import { useState, useRef, useEffect } from "react";

export const useVideoPlayer = (initialSpeed = 1.0) => {
  const [videoSpeed, setVideoSpeed] = useState(initialSpeed);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [skipHintVisible, setSkipHintVisible] = useState(false);

  const videoRef = useRef(null);

  // Función para terminar el video al hacer clic
  const handleSkipVideo = () => {
    const video = videoRef.current;
    if (video && !isEnded) {
      // Pausar el video y marcarlo como terminado
      video.pause();
      setIsEnded(true);
      // Iniciar la animación de entrada
      setTimeout(() => setFadeIn(true), 200);
    }
  };

  // Efecto para manejar la velocidad del video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  // Efecto para manejar los eventos del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      setIsEnded(true);
      // Pequeño retraso antes de iniciar la animación de entrada
      setTimeout(() => setFadeIn(true), 200);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("ended", handleEnded);

    // Mostrar mensaje de "Clic para saltar" después de 2 segundos
    const skipHintTimer = setTimeout(() => {
      setSkipHintVisible(true);
    }, 2000);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(skipHintTimer);
    };
  }, []);

  return {
    videoRef,
    videoSpeed,
    setVideoSpeed,
    videoLoaded,
    isEnded,
    fadeIn,
    skipHintVisible,
    handleSkipVideo,
  };
};

import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer(tracks, options = {}) {
  const {
    initialVolume = 0.3,
    autoPlay = false,
    loop = true,
    shuffle = false,
    playbackRate = 1.0
  } = options;

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const hasUserInteracted = useRef(false);

  // Actualizar el tiempo actual
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Configurar el audio cuando cambia la pista
  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      const audio = audioRef.current;
      
      // Pausar el audio actual antes de cambiar la fuente
      audio.pause();
      setIsPlaying(false);
      
      audio.src = tracks[currentTrack].src;
      audio.volume = isMuted ? 0 : initialVolume;
      audio.playbackRate = playbackRate;
      audio.loop = loop && tracks.length === 1;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        if (autoPlay && !autoplayBlocked) {
          tryAutoPlay();
        }
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        if (loop && tracks.length > 1) {
          handleNextTrack();
        }
      };

      const handlePlay = () => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleError = (e) => {
        console.error('Error al cargar el audio:', e);
        setIsPlaying(false);
        setAutoplayBlocked(true);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentTrack, isMuted, initialVolume, playbackRate, loop]);

  // Función para intentar reproducir automáticamente
  const tryAutoPlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (error) {
        // Manejo silencioso del bloqueo de autoplay
        // El navegador requiere interacción del usuario para reproducir audio
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    }
  };

  // Efecto para intentar reproducir después de la primera interacción
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted.current) {
        hasUserInteracted.current = true;
        if (autoPlay && autoplayBlocked && !isPlaying) {
          tryAutoPlay();
        }
      }
    };

    // Agregar listeners para detectar la primera interacción
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [autoPlay, autoplayBlocked, isPlaying]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
          hasUserInteracted.current = true;
        }
      } catch (error) {
        console.error('Error al reproducir audio:', error);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : initialVolume;
    }
  };

  const handleNextTrack = () => {
    if (tracks.length <= 1) return;
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrack + 1) % tracks.length;
    }
    
    setCurrentTrack(nextIndex);
    setCurrentTime(0);
    
    // Auto-play la siguiente pista si estaba reproduciendo
    if (isPlaying && hasUserInteracted.current) {
      setTimeout(async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error al reproducir siguiente pista:', error);
          setIsPlaying(false);
        }
      }, 100);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    audioRef,
    currentTrack,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    autoplayBlocked,
    togglePlay,
    toggleMute,
    handleNextTrack,
    formatTime,
    currentTrackInfo: tracks[currentTrack] || null,
  };
}

"use client";
import { createContext, useContext } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { audioTracks } from '@/data/audioConfig';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // Configuración del reproductor - puedes ajustar estos valores
  const audioOptions = {
    initialVolume: 0.15,   // Volumen inicial (15% para no molestar)
    autoPlay: true,       // Reproducir automáticamente
    loop: true,           // Repetir la lista cuando termine
    shuffle: false,       // Orden secuencial por defecto
    playbackRate: 1.0     // Velocidad normal (puedes cambiar a 0.8, 1.2, etc.)
  };
  
  const audioPlayerData = useAudioPlayer(audioTracks, audioOptions);

  return (
    <AudioContext.Provider value={audioPlayerData}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext debe ser usado dentro de un AudioProvider');
  }
  return context;
};

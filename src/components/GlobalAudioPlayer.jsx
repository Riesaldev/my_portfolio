"use client";
import { useAudioContext } from "@/components/AudioProvider";

const GlobalAudioPlayer = () => {
  const { audioRef } = useAudioContext();
  
  return <audio ref={audioRef} preload="metadata" />;
};

export default GlobalAudioPlayer;

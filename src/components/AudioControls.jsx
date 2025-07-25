"use client";
import { useAudioContext } from "@/components/AudioProvider";
import { useI18n } from "@/components/I18nProvider";
import { audioTracks } from "@/data/audioConfig";

const AudioControls = () => {
  const { t } = useI18n();
  
  const {
    isPlaying,
    isMuted,
    autoplayBlocked,
    togglePlay,
    toggleMute,
    handleNextTrack,
  } = useAudioContext();

  return (
    <div className="flex items-center gap-2">
      {/* Botón Play/Pause */}
      <button
        onClick={togglePlay}
        className={`p-2 rounded-full transition-all duration-200 ${
          autoplayBlocked 
            ? 'bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 hover:text-white animate-pulse' 
            : 'bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white'
        }`}
        title={
          autoplayBlocked 
            ? t('audio.clickToPlay') 
            : (isPlaying ? t('audio.paused') : t('audio.playing'))
        }
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Botón Mute/Unmute */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white transition-all duration-200"
        title={isMuted ? t('audio.unmute') : t('audio.mute')}
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>

      {/* Botón Next (si hay más de una pista) */}
      {audioTracks.length > 1 && (
        <button
          onClick={handleNextTrack}
          className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white transition-all duration-200"
          title={t('audio.next')}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AudioControls;

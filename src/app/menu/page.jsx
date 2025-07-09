"use client";
import { useVideoPreload } from '@/hooks/useVideoPreload';
import { useVideoPortals } from '@/hooks/useVideoPortals';
import PortalContent from '@/components/PortalContent';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AudioControls from '@/components/AudioControls';
import { videoSources } from '@/data/portalConfig';


export default function Menu() {
  // Hook para precarga de videos
  const { videosLoaded, videoLoadProgress } = useVideoPreload();
  
  // Hook para manejo de portales de video
  const {
    videoRef,
    secondVideoRef,
    currentPortal,
    videoSource,
    mainVideoPlayed,
    activeVideoRef,
    videoTransitionComplete,
    playPortalVideo,
    handleVideoEnded,
    handleLoadedMetadata,
    handleTimeUpdate
  } = useVideoPortals();

  return (
    <>
      {/* Controles superiores: Audio y Language Switcher */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-4">
        <AudioControls />
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col items-center justify-center h-4/5 bg-black">
        <div className="flex flex-col items-center justify-center z-0 inset-0 absolute bg-black">
          <video
            ref={videoRef}
            autoPlay={!mainVideoPlayed || videoSource !== videoSources.Main}
            muted
            className='w-full h-full object-cover'
            src={videoSource}
            onEnded={handleVideoEnded}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={() => handleTimeUpdate(videoRef.current)}
            style={{
              opacity: activeVideoRef === 'primary' ? '1' : '0',
              transition: 'opacity 0.5s ease-in-out',
              backgroundColor: 'black'
            }}
          />

          <video
            ref={secondVideoRef}
            autoPlay
            muted
            className='w-full h-full object-cover absolute top-0 left-0'
            onTimeUpdate={() => handleTimeUpdate(secondVideoRef.current, true)}
            style={{
              opacity: activeVideoRef === 'secondary' ? '1' : '0',
              transition: 'opacity 0.5s ease-in-out',
              backgroundColor: 'black'
            }}
          />
        </div>
        {videoTransitionComplete && (
          <PortalContent 
            currentPortal={currentPortal} 
            onPortalClick={playPortalVideo}
          />
        )}
      </div>
    </>
  );
}

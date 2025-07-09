import { useState, useRef, useEffect, useCallback } from 'react';
import { videoSources, videoConfig, portalMap } from '@/data/portalConfig';

export const useVideoPortals = () => {
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const rewindIntervalRef = useRef(null);
  
  const [currentPortal, setCurrentPortal] = useState("main");
  const [videoSource, setVideoSource] = useState(videoSources.Main);
  const [mainVideoPlayed, setMainVideoPlayed] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const [activeVideoRef, setActiveVideoRef] = useState('primary');
  const [videoTransitionComplete, setVideoTransitionComplete] = useState(false);

  useEffect(() => {
    if (videoRef.current && secondVideoRef.current) {
      const videoKey = videoSource === videoSources.Main ? 'main' :
        videoSource === videoSources.DPortal ? 'dportal' :
          videoSource === videoSources.IPortal ? 'iportal' : 'main';

      videoRef.current.playbackRate = videoConfig.playbackSpeeds[videoKey];
      secondVideoRef.current.playbackRate = videoConfig.playbackSpeeds[videoKey];

      videoRef.current.preload = 'auto';
      secondVideoRef.current.preload = 'auto';

      videoRef.current.muted = true;
      secondVideoRef.current.muted = true;

      if (currentPortal === "main" && mainVideoPlayed && videoSource === videoSources.Main &&
        !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
        videoRef.current.currentTime = videoRef.current.duration - 0.1;
      }
    }

    return () => {
      if (rewindIntervalRef.current) {
        clearInterval(rewindIntervalRef.current);
      }
    };
  }, [currentPortal, mainVideoPlayed, videoSource]);

  const handleVideoEnded = useCallback(() => {
    if (videoSource === videoSources.Main) {
      setMainVideoPlayed(true);
      if (videoRef.current) {
        videoRef.current.currentTime = videoConfig.timeRanges.main.end - 0.01;
      }
      setVideoTransitionComplete(true);
    }
  }, [videoSource]);

  const playVideoInReverse = () => {
    setIsRewinding(true);
    setVideoTransitionComplete(false);

    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;

    if (currentVideoRef && !isNaN(currentVideoRef.duration) && isFinite(currentVideoRef.duration)) {
      currentVideoRef.currentTime = currentVideoRef.duration;

      let lastTimestamp = null;
      const rewindStep = 0.01;

      const rewindFrame = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;

        if (elapsed > 16) {
          if (currentVideoRef.currentTime <= rewindStep) {
            setCurrentPortal("main");
            setMainVideoPlayed(true);
            setIsRewinding(false);
            setTimeout(() => setVideoTransitionComplete(true), 50);
          } else {
            currentVideoRef.currentTime -= rewindStep;
            lastTimestamp = timestamp;
            requestAnimationFrame(rewindFrame);
          }
        } else {
          requestAnimationFrame(rewindFrame);
        }
      };

      requestAnimationFrame(rewindFrame);
    } else {
      setCurrentPortal("main");
      setMainVideoPlayed(true);
      setIsRewinding(false);
      setVideoTransitionComplete(true);
    }
  };

  const playPortalVideo = (portal) => {
    if (isRewinding) return;

    setVideoTransitionComplete(false);

    if (portal === "main" && (currentPortal === "Right" || currentPortal === "Left")) {
      playVideoInReverse();
      return;
    }

    const { source, newPortal, key } = portalMap[portal] || portalMap["main"];

    const nextVideoRef = activeVideoRef === 'primary' ? secondVideoRef.current : videoRef.current;
    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;

    nextVideoRef.src = source;
    nextVideoRef.currentTime = videoConfig.timeRanges[key].start;

    const handleCanPlay = () => {
      nextVideoRef.removeEventListener('canplay', handleCanPlay);

      nextVideoRef.playbackRate = videoConfig.playbackSpeeds[key];

      nextVideoRef.play().then(() => {
        nextVideoRef.style.opacity = '1';
        setTimeout(() => currentVideoRef.style.opacity = '0', 100);

        setActiveVideoRef(activeVideoRef === 'primary' ? 'secondary' : 'primary');
        setVideoSource(source);

        setTimeout(() => {
          setCurrentPortal(newPortal);
          setVideoTransitionComplete(true);
        }, 2400);
      });
    };

    if (nextVideoRef.readyState >= 3) {
      handleCanPlay();
    } else {
      nextVideoRef.addEventListener('canplay', handleCanPlay);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
      const videoKey = videoSource === videoSources.Main ? 'main' :
        videoSource === videoSources.DPortal ? 'dportal' :
          videoSource === videoSources.IPortal ? 'iportal' : 'main';
      const startTime = videoConfig.timeRanges[videoKey].start;

      if (videoSource === videoSources.Main && mainVideoPlayed) {
        videoRef.current.currentTime = videoConfig.timeRanges.main.end - 0.1;
      } else {
        videoRef.current.currentTime = startTime;
      }
    }
  };

  const handleTimeUpdate = (videoElement, isSecondary = false) => {
    if (videoElement) {
      const videoKey = videoSource === videoSources.Main ? 'main' :
        videoSource === videoSources.DPortal ? 'dportal' :
          videoSource === videoSources.IPortal ? 'iportal' : 'main';
      const endTime = videoConfig.timeRanges[videoKey].end;

      if (endTime !== null && videoElement.currentTime >= endTime) {
        videoElement.pause();
        if (!isSecondary || activeVideoRef === 'secondary') {
          handleVideoEnded();
        }
      }
    }
  };

  return {
    videoRef,
    secondVideoRef,
    currentPortal,
    videoSource,
    mainVideoPlayed,
    isRewinding,
    activeVideoRef,
    videoTransitionComplete,
    playPortalVideo,
    handleVideoEnded,
    handleLoadedMetadata,
    handleTimeUpdate
  };
};

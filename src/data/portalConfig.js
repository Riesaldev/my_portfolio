import Main from '../../public/videos/Portals.webm';
import DPortal from '../../public/videos/DPortal.webm';
import IPortal from '../../public/videos/IPortal.webm';
import PuertaVideo from '../../public/videos/puerta.mp4';
import Lake from '../../public/videos/Lake.webm';
import Lab from '../../public/videos/Lab.webm';
import Sword from '../../public/videos/Sword.webm';

export const videoSources = {
  Main,
  DPortal,
  IPortal
};

export const videoConfig = {
  preloadSources: [
    { src: Main, key: 'main' },
    { src: DPortal, key: 'dportal' },
    { src: IPortal, key: 'iportal' }
  ],
  timeRanges: {
    main: { start: 0.25, end: 1.25 },
    dportal: { start: 0, end: null },
    iportal: { start: 0, end: null }
  },
  playbackSpeeds: {
    main: 0.40,
    dportal: 0.40,
    iportal: 0.40
  }
};

// Configuración completa de precarga de videos
export const preloadConfig = {
  videos: [
    { url: Main, key: 'main' },
    { url: DPortal, key: 'dportal' },
    { url: IPortal, key: 'iportal' },
    { url: PuertaVideo, key: 'puerta' },
    { url: Lake, key: 'lake' },
    { url: Lab, key: 'lab' },
    { url: Sword, key: 'sword' }
  ],
  
  initialVideoStates: {
    main: false,
    dportal: false,
    iportal: false,
    puerta: false,
    lake: false,
    lab: false,
    sword: false,
  },
  
  initialProgressStates: {
    main: 0,
    dportal: 0,
    iportal: 0,
    puerta: 0,
    lake: 0,
    lab: 0,
    sword: 0,
  },
  
  magicPhrases: [
    "Conjurando el código...",
    "Elaborando pociones de UI...",
    "Invocando las animaciones...",
    "Domesticando bugs...",
    "Implorando a los Dioses Antiguos..."
  ],
  
  totalVideos: 7,
  dragonProgressWeight: 30, // 30% del progreso total
  videoProgressWeight: 70,  // 70% del progreso total
  dragonLoadDelay: 1000,
};

export const portalMap = {
  "right": { source: DPortal, newPortal: "Right", key: "dportal" },
  "left": { source: IPortal, newPortal: "Left", key: "iportal" },
  "main": { source: Main, newPortal: "main", key: "main" }
};

// Configuración de rutas de navegación para los portales
export const portalRoutes = {
  main: "/portfolio",
  Right: "/contact", 
  Left: "/about"
};

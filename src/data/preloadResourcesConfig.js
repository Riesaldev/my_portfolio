// Configuración centralizada de recursos para precarga
export const preloadResourcesConfig = {
  // Imágenes críticas que aparecen en la UI principal
  criticalImages: [
    '/assets/logo2.svg',
    '/assets/LOGO.svg',
    '/assets/menu-hamburguesa.svg',
    '/assets/cruz.svg',
    '/assets/arrow1.png',
    '/assets/arrow2.png'
  ],
  
  // Imágenes del portfolio y secciones
  portfolioImages: [
    '/assets/ancient1.png',
    '/assets/ancient2.png', 
    '/assets/ancient3.png',
    '/images/Addon.png',
    '/images/Blender.png',
    '/images/gta.png',
    '/images/HaF.png',
    '/images/Ticket.png'
  ],
  
  // Archivos de audio
  audioFiles: [
    '/music/T1.mp3',
    '/music/T2.mp3',
    '/music/T3.mp3',
    '/music/T4.mp3'
  ],
  
  // Fuentes web
  fonts: [
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap'
  ],
  
  // Recursos críticos del sistema
  criticalResources: [
    '/dragon/dragon.css',
    '/dragon/dragon.js'
  ],
  
  // Archivos de traducción
  locales: [
    '/locales/es/common.json',
    '/locales/en/common.json'
  ],
  
  // Pesos de progreso para cada tipo de recurso
  progressWeights: {
    dragon: 18,      // 18% para la animación del dragón
    videos: 48,      // 48% para los videos
    images: 15,      // 15% para las imágenes
    audio: 10,       // 10% para el audio
    fonts: 3,        // 3% para las fuentes
    critical: 4,     // 4% para recursos críticos
    locales: 2       // 2% para archivos de localización
  },
  
  // Configuración de timeouts y reintentos
  timeouts: {
    image: 5000,     // 5 segundos para imágenes
    audio: 10000,    // 10 segundos para audio
    font: 3000,      // 3 segundos para fuentes
    critical: 5000   // 5 segundos para recursos críticos
  },
  
  // Número máximo de reintentos para cada tipo de recurso
  maxRetries: {
    image: 2,
    audio: 1,
    font: 2,
    critical: 2
  }
};

// Función helper para obtener todos los recursos de imagen
export const getAllImages = () => {
  return [
    ...preloadResourcesConfig.criticalImages,
    ...preloadResourcesConfig.portfolioImages
  ];
};

// Función helper para obtener todos los recursos
export const getAllResources = () => {
  return {
    images: getAllImages(),
    audio: preloadResourcesConfig.audioFiles,
    fonts: preloadResourcesConfig.fonts,
    critical: preloadResourcesConfig.criticalResources,
    locales: preloadResourcesConfig.locales
  };
};

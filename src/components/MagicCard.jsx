'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MagicCard = ({ 
  children, 
  isOpen = false, 
  onClose, 
  title,
  className = '',
  showParticles = true,
  glowIntensity = 'medium' // 'low', 'medium', 'high'
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [particles, setParticles] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [closeParticles, setCloseParticles] = useState([]);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (showParticles && isVisible) {
      const particleArray = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }));
      setParticles(particleArray);
    }
  }, [isVisible, showParticles]);

  const handleClose = () => {
    setIsClosing(true);
    
    // Crear partículas espirales para el efecto de teletransportación
    const teleportParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 50 + Math.cos(i * 0.5) * 30, // Patrón espiral
      y: 50 + Math.sin(i * 0.5) * 30,
      size: Math.random() * 4 + 2,
      delay: i * 0.05, // Delay escalonado
      angle: i * 24, // Rotación para efecto espiral
      radius: 10 + i * 3, // Radio incrementa con espiral
      color: i % 3 === 0 ? 'purple' : i % 3 === 1 ? 'fuchsia' : 'blue',
    }));
    
    setCloseParticles(teleportParticles);
    
    // Iniciar animación de teletransportación
    setTimeout(() => {
      setIsVisible(false);
    }, 50);
    
    // Limpiar y ejecutar callback
    setTimeout(() => {
      setIsClosing(false);
      setCloseParticles([]);
      onClose?.();
    }, 1000);
  };

  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case 'low':
        return 'shadow-lg shadow-fuchsia-500/20';
      case 'high':
        return 'shadow-2xl shadow-fuchsia-500/60';
      default:
        return 'shadow-xl shadow-fuchsia-500/40';
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
      {/* Backdrop con efecto de vórtice */}
      <div 
        className={`absolute inset-0 ${isClosing ? 'bg-black/10' : 'bg-black/30'} backdrop-blur-sm transition-all duration-500 ${isClosing ? 'animate-[backdropVortex_1s_ease-in-out_forwards]' : ''}`}
        onClick={handleClose}
      />
      
      {/* Contenedor principal de la tarjeta con efecto de teletransportación */}
      <div className={`
        relative
        bg-gradient-to-br from-fuchsia-500/20 via-purple-600/15 to-pink-500/20
        backdrop-blur-md
        border border-fuchsia-400/30
        rounded-2xl
        p-6
        max-w-md w-full
        ${getGlowIntensity()}
        transform transition-all duration-300 ease-out
        ${isVisible && !isClosing ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        ${isClosing ? 'animate-[cardCloseWithScale_1s_ease-in-out_forwards]' : ''}
        ${className}
      `}>
        
        {/* Efectos de brillo mágico con implosión */}
        <div className={`absolute inset-0 rounded-2xl ${isClosing ? 'animate-[implosion_1s_ease-in-out_forwards]' : ''}`}>
          {/* Brillo principal */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400/10 to-transparent rounded-2xl ${isClosing ? 'animate-pulse' : 'animate-pulse'}`} />
          
          {/* Brillo de borde */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-pink-500/20 blur-sm ${isClosing ? 'animate-[implosion_1s_ease-in-out_forwards]' : ''}`} />
          
          {/* Líneas mágicas con efecto de teletransportación */}
          <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-fuchsia-400/50 rounded-tl-xl ${isClosing ? 'animate-[vortex_1s_ease-in-out_forwards]' : ''}`} />
          <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-fuchsia-400/50 rounded-tr-xl ${isClosing ? 'animate-[vortex_1s_ease-in-out_forwards]' : ''}`} />
          <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-fuchsia-400/50 rounded-bl-xl ${isClosing ? 'animate-[vortex_1s_ease-in-out_forwards]' : ''}`} />
          <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-400/50 rounded-br-xl ${isClosing ? 'animate-[vortex_1s_ease-in-out_forwards]' : ''}`} />
        </div>

        {/* Estelas de energía durante la teletransportación */}
        {isClosing && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-transparent animate-[energyTrail_1s_ease-out_forwards] rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500/30 to-transparent animate-[energyTrail_1s_ease-out_0.1s_forwards] rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent animate-[energyTrail_1s_ease-out_0.2s_forwards] rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent animate-[energyTrail_1s_ease-out_0.3s_forwards] rounded-2xl" />
          </>
        )}

        {/* Partículas mágicas normales */}
        {showParticles && !isClosing && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-fuchsia-400/60 animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}

        {/* Partículas espirales de teletransportación */}
        {isClosing && closeParticles.map((particle) => (
          <div
            key={`teleport-${particle.id}`}
            className={`absolute rounded-full ${
              particle.color === 'purple' 
                ? 'bg-gradient-to-r from-purple-400 to-purple-600' 
                : particle.color === 'fuchsia'
                ? 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-600'
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            } shadow-lg`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `rotate(${particle.angle}deg)`,
              animation: `spiralParticle 1s ease-out ${particle.delay}s forwards`,
            }}
          />
        ))}

        {/* Partículas mágicas */}
        {showParticles && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-fuchsia-400/60 animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}

        {/* Contenido de la tarjeta con efecto de vórtice */}
        <div className={`relative z-10 ${isClosing ? 'animate-[vortex_1s_ease-in-out_forwards]' : ''}`}>
          {/* Header con título y botón de cierre */}
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h3 className="text-xl font-bold text-fuchsia-100 drop-shadow-lg">
                {title}
              </h3>
            )}
            <button
              onClick={handleClose}
              className={`
                group
                p-2
                rounded-full
                bg-fuchsia-500/20
                hover:bg-fuchsia-500/30
                border border-fuchsia-400/30
                hover:border-fuchsia-400/50
                transition-all duration-200
                hover:shadow-lg hover:shadow-fuchsia-500/30
                backdrop-blur-sm
                ${isClosing ? 'animate-[apparition_1s_ease-in-out_forwards]' : ''}
              `}
              aria-label="Cerrar"
              disabled={isClosing}
            >
              <X 
                size={20} 
                className="text-fuchsia-300 group-hover:text-fuchsia-100 transition-colors duration-200" 
              />
            </button>
          </div>

          {/* Contenido principal */}
          <div className="text-fuchsia-50/90 leading-relaxed">
            {children}
          </div>

          {/* Línea decorativa mágica */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />
        </div>

        {/* Resplandor de fondo sutil */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none" />
      </div>
    </div>
  );
};

export default MagicCard;

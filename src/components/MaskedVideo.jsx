
export default function MaskedVideo({ 
  videoRef, 
  onClick, 
  videoSource, 
  className = "",
  style = {},
  playsInline = true,
  showWrapper = true 
}) {
  const maskStyle = {
    WebkitMaskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)',
    maskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)'
  };

  const videoElement = (
    <video
      ref={videoRef}
      onClick={onClick}
      className={`${showWrapper ? 'w-full' : ''} cursor-pointer ${className}`}
      playsInline={playsInline}
      style={style}
    >
      <source src={videoSource} type="video/mp4" />
      Tu navegador no soporta el elemento video.
    </video>
  );

  // Si no necesita wrapper (para video expandido), devolver solo el video
  if (!showWrapper) {
    return videoElement;
  }

  // Video normal con wrapper y máscara
  return (
    <div className="relative w-full max-w-2xl mx-auto opacity-80 brightness-50 rounded-lg overflow-hidden">
      <div style={maskStyle}>
        {videoElement}
      </div>
    </div>
  );
}

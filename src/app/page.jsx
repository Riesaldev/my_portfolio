"use client";
import PreloadPage from "./precarga/PreloadPage";
import LavenderFog from "../components/Three/LavenderFog";
import VideoSource from "../../public/videos/puerta.mp4";
import Header from "@/components/Header";
import WelcomeContent from "@/components/WelcomeContent";
import MaskedVideo from "@/components/MaskedVideo";
import { usePreloadTransition } from "@/hooks/usePreloadTransition";
import { useVideoExpansion } from "@/hooks/useVideoExpansion";

export default function Home() {
  // Hook para manejar la transición de precarga
  const { showHome, handleContinue } = usePreloadTransition();
  
  // Hook para manejar la expansión del video
  const {
    isExpanded,
    videoRect,
    expandAnimation,
    videoRef,
    expandedVideoRef,
    handleVideoClick,
    handleExpandedVideoClick,
    getVideoStyles,
  } = useVideoExpansion();

  // Obtener estilos para la animación
  const { videoWrapperStyle, expandedVideoStyle } = getVideoStyles();

  return (
    <>
      {!showHome && <PreloadPage onContinue={handleContinue} />}
      {showHome && (
        <main className="flex flex-col items-center h-screen overflow-hidden bg-[#a842b1] text-[#fddbff]">
          <LavenderFog />
          <Header />
          <div className={`${isExpanded ? "hidden" : "md:grid"} grid-cols-2 items-center justify-center w-full h-full p-6 transition-all duration-2000`}>
            {/* Contenido de bienvenida */}
            <WelcomeContent />
            
            {/* Video principal */}
            <MaskedVideo
              videoRef={videoRef}
              onClick={handleVideoClick}
              videoSource={VideoSource}
            />
          </div>
          
          {/* Video expandido */}
          {isExpanded && videoRect && (
            <div 
              style={videoWrapperStyle}
              className="video-expand-wrapper flex items-center justify-center"
            >
              <MaskedVideo
                videoRef={expandedVideoRef}
                onClick={handleExpandedVideoClick}
                videoSource={VideoSource}
                className="cursor-pointer"
                style={expandedVideoStyle}
                showWrapper={false}
              />
            </div>
          )}
        </main>
      )}
    </>
  );
}

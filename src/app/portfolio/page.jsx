"use client";
import Header from "@/components/Header";
import Lake from "../../../public/videos/Lake.webm";
import Ancient from "@/components/Ancient";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import { useI18n } from "@/components/I18nProvider";
import { getPortfolioScrollContents } from "@/lib/scrollContentTranslations";

export default function Page() {
  const { t } = useI18n();
  const portfolioScrollContents = getPortfolioScrollContents(t);

  // Hook para manejar la lógica del video con velocidad personalizada
  const {
    videoRef,
    videoSpeed,
    setVideoSpeed,
    videoLoaded,
    isEnded,
    fadeIn,
    skipHintVisible,
    handleSkipVideo,
  } = useVideoPlayer(0.75);

  // Hook para manejar la navegación entre páginas
  const {
    currentPage,
    transitionActive,
    changePage,
    goToPage,
  } = usePageNavigation(portfolioScrollContents.length);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="cover absolute inset-0 z-0">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        >
          <source src={Lake} type="video/webm" />
          {t('video.unsupported')}
        </video>
        
        {/* Overlay clickeable para saltar el video */}
        {!isEnded && (
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            onClick={handleSkipVideo}
          >
            {skipHintVisible && (
              <div className="bg-fuchsia-500/60 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500 hover:bg-opacity-70">
                {t('video.skipIntro')}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative z-20">
        <div className="opacity-80 relative z-40">
          <Header />
        </div>
        {isEnded && (
          <div 
            className="transition-all duration-1500 ease-in-out"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative">
              <Ancient
                title={portfolioScrollContents[currentPage].title}
                content={portfolioScrollContents[currentPage].content}
                currentPage={currentPage}
                scrollContents={portfolioScrollContents}
                onChangePage={changePage}
                onGoToPage={goToPage}
                transitionActive={transitionActive}
                videoSrc={portfolioScrollContents[currentPage].videoSrc}
                imageSrc={portfolioScrollContents[currentPage].imageSrc}
                imageAlt={portfolioScrollContents[currentPage].imageAlt}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
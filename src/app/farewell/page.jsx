"use client";
import Header from "@/components/Header";
import Ancient from "@/components/Ancient";
import { useStaticPage } from "@/hooks/useStaticPage";
import { useI18n } from "@/components/I18nProvider";
import { getFarewellScrollContents } from "@/lib/scrollContentTranslations";

export default function Page() {
  const { t } = useI18n();
  const farewellScrollContents = getFarewellScrollContents(t);

  // Hook para manejar páginas estáticas
  const {
    currentPage,
    transitionActive,
    fadeIn,
    isEnded,
    changePage,
    goToPage,
  } = useStaticPage(farewellScrollContents.length);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-[#5f1064] to-fuchsia-500 overflow-hidden">
      <div
        className="absolute top-64 inset-0 z-0 bg-fill bg-center bg-no-repeat bg-[url('/assets/LOGO.svg')]"
      />

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
                title={farewellScrollContents[currentPage].title}
                content={farewellScrollContents[currentPage].content}
                currentPage={currentPage}
                scrollContents={farewellScrollContents}
                onChangePage={changePage}
                onGoToPage={goToPage}
                transitionActive={transitionActive}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
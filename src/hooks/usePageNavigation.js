import { useState } from "react";

export const usePageNavigation = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [transitionActive, setTransitionActive] = useState(false);

  // Función para cambiar de página
  const changePage = (direction) => {
    setTransitionActive(true);

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage(prev => (prev + 1) % totalPages);
      } else {
        setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
      }

      setTimeout(() => {
        setTransitionActive(false);
      }, 50);
    }, 500);
  };

  // Función para cambiar a una página específica
  const goToPage = (pageIndex) => {
    if (currentPage === pageIndex) return;

    setTransitionActive(true);

    setTimeout(() => {
      setCurrentPage(pageIndex);

      setTimeout(() => {
        setTransitionActive(false);
      }, 50);
    }, 500);
  };

  return {
    currentPage,
    transitionActive,
    changePage,
    goToPage,
  };
};

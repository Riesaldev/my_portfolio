import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Fleur_De_Leah } from 'next/font/google';
import { The_Nautigal } from 'next/font/google';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

const fleurDeLeah = Fleur_De_Leah( {
  weight: '400',
  subsets: [ 'latin' ],
} );

const theNautigal = The_Nautigal( {
  weight: '400',
  subsets: [ 'latin' ],
} );


export default function AncientScroll ( {
  title,
  content,
  autoOpen = false,
  width = "645px",
  height = "145px",
  currentPage = 0,
  totalPages = 1,
  onChangePage = () => { },
  onGoToPage = () => { },
  scrollContents = [],
  transitionActive = false,
  customComponent = null,
  videoSrc = null,
  imageSrc = null,
  imageAlt = "",
  ...rest
} ) {
  const { t } = useI18n();
  const [ isOpen, setIsOpen ] = useState( autoOpen );
  // Añadir referencia al contenedor de scroll
  const scrollContainerRef = useRef(null);

  // Precarga las imágenes para mejor rendimiento
  const preloadImages = () => {
    if ( typeof window === 'undefined' ) return;
    const images = [
      '/assets/ancient1.png',
      '/assets/ancient2.png',
      '/assets/ancient3.png'
    ];
    images.forEach( src => {
      const img = new window.Image();
      img.src = src;
    } );
  };

  useEffect( () => {
    preloadImages();

    if ( autoOpen )
    {
      const timer = setTimeout( () => setIsOpen( true ), 300 );
      return () => clearTimeout( timer );
    }
  }, [ autoOpen ] );

  // Nuevo efecto para resetear la posición del scroll al cambiar de página
  useEffect(() => {
    // Verifica si el contenedor existe y resetea su posición
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]); // Se ejecuta cuando cambia la página actual

  const toggleScroll = () => setIsOpen( !isOpen );

  return (
    <div
      className="flex justify-center items-center"
      aria-expanded={isOpen}
      aria-label="Pergamino animado"
      {...rest}
    >
      <div className="relative">
        {/* Indicador de página */}
        {scrollContents.length > 1 && (
          <div className="flex justify-center gap-2">
            {scrollContents.map( ( _, index ) => (
              <button
                key={index}
                onClick={() => onGoToPage( index )}
                className={`h-6 w-6 rounded-full mt-4 cursor-pointer transition-all duration-300 hover:scale-115 \
                  ${ currentPage === index ? 'bg-fuchsia-500' : 'bg-fuchsia-800/50' }`}
                aria-label={`Ir a pergamino ${ index + 1 }`}
              />
            ) )}
          </div>
        )}

        {/* Parte superior del pergamino */}
        <div
          className="mx-auto bg-[url('/assets/ancient1.png')] bg-cover bg-center cursor-pointer"
          style={{ width, height }}
          onClick={toggleScroll}
          role="button"
          tabIndex="0"
          onKeyDown={( e ) => e.key === 'Enter' && toggleScroll()}
          aria-hidden="true"
        >
          <h2 className={`text-center font-bold text-5xl leading-[130px] ${ fleurDeLeah.className }`}>
            {title}
          </h2>
        </div>

        {/* Parte central expandible */}
        <div
          className={`mx-auto bg-[url('/assets/ancient2.png')] bg-cover bg-top overflow-hidden transition-all duration-1000 ease-in-out ${ isOpen ? 'h-[525px]' : 'h-[10px]' }`}
          style={{ width }}
        >
          <div
            className={`h-full p-8 overflow-y-auto scrollbar transition-opacity duration-500 ${ isOpen ? 'opacity-100' : 'opacity-0' }`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#a67c52 #f3e7d3'
            }}
            ref={scrollContainerRef} // Añadir la referencia aquí
          >
            <div
              className="text-black text-justify px-7"
              role="button"
              tabIndex="0"
              onKeyDown={( e ) => e.key === 'Enter' && toggleScroll()}
            >
              <div className={`text-left ${ theNautigal.className } text-4xl leading-10 m-3`}>
                {/* Renderizar contenido HTML */}
                <div dangerouslySetInnerHTML={{ __html: String(content || '').replace( '<ContactForm />', '' ) }} />

                {/* Mostrar video si existe */}
                {videoSrc && (
                  <div className="my-6 flex justify-center">
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto rounded-lg shadow-[0_20px_20px_10px_rgba(0,0,0,0.8)] pointer-events-none"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                )}

                {/* Mostrar imagen si existe */}
                {imageSrc && (
                  <div className="my-6 flex justify-center">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={500}
                      height={300}
                      className="max-w-full h-auto rounded-lg shadow-[0_20px_20px_10px_rgba(0,0,0,0.8)] object-contain"
                    />
                  </div>
                )}

                {/* Renderizar componente personalizado si existe */}
                {customComponent && (
                  <div className="my-4">
                    {customComponent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Parte inferior del pergamino */}
        <div
          className="mx-auto -mt-[6px] bg-[url('/assets/ancient3.png')] bg-cover bg-center cursor-pointer"
          style={{ width, height }}
          onClick={toggleScroll}
          role="button"
          tabIndex="0"
          onKeyDown={( e ) => e.key === 'Enter' && toggleScroll()}
          aria-hidden="true"
        />

        {/* Flechas de navegación */}
        {scrollContents.length > 1 && (
          <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 ">
            <button
              onClick={() => onChangePage( 'prev' )}
              className="bg-amber-800/60 hover:bg-amber-700/80 cursor-pointer relative -left-20 hover:scale-125 p-3 rounded-full transition-all"
              aria-label="Pergamino anterior"
            >
              <div className="w-12 h-12 relative transform rotate-180">
                <Image
                  src="/assets/arrow2.png"
                  alt="Flecha izquierda"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
            <button
              onClick={() => onChangePage( 'next' )}
              className="bg-amber-800/60 hover:bg-amber-700/80 cursor-pointer relative left-20 hover:scale-125 p-3 rounded-full transition-all"
              aria-label="Siguiente pergamino"
            >
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/arrow2.png"
                  alt="Flecha derecha"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        )}

        {/* Instrucción accesible */}
        <p className="sr-only">
          {t(isOpen ? 'ancient.closeScroll' : 'ancient.openScroll')}
        </p>
      </div>

      {/* Estilos para el scrollbar personalizado */}
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar::-webkit-scrollbar-track {
          background: #f3e7d3;
          border-radius: 10px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background: #a67c52;
          border-radius: 10px;
          border: 2px solid #f3e7d3;
        }
        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8c6239;
        }
      `}</style>
    </div>
  );
};

AncientScroll.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.arrayOf( PropTypes.oneOfType( [
      PropTypes.string
    ] ) )
  ] ).isRequired,
  autoOpen: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  onGoToPage: PropTypes.func,
  scrollContents: PropTypes.array,
  transitionActive: PropTypes.bool,
  customComponent: PropTypes.node,
  videoSrc: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
};

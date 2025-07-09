# 🌟 Mi Portafolio Personal

## 📋 Descripción General
Portafolio personal interactivo desarrollado con Next.js 15 que combina contenido multimedia, efectos visuales avanzados y una interfaz moderna. El proyecto incluye sistema de internacionalización, formularios validados, efectos 3D con Three.js y un diseño completamente responsivo.

## 🚀 Tecnologías Implementadas

### Stack Principal
* **Next.js 15.3.3** - Framework React con App Router
* **React 19.0.0** - Biblioteca de interfaz de usuario
* **Tailwind CSS 4** - Framework CSS utility-first
* **Three.js 0.177.0** - Biblioteca para gráficos 3D
* **TypeScript/JavaScript** - Lenguaje de programación

### Dependencias Clave

* **@react-three/fiber 9.1.2** - Integración de Three.js con React
* **Resend 4.6.0** - Servicio de email para formularios de contacto
* **Lucide React 0.513.0** - Biblioteca de iconos moderna
* **Class Variance Authority 0.7.1** - Gestión avanzada de variantes CSS
* **react-i18next 15.6.0** + **next-i18next 15.4.2** - Sistema de internacionalización
* **GSAP 3.13.0** - Biblioteca de animaciones (instalada, uso futuro)
* **next-videos 1.4.1** - Optimización y manejo de videos (dev dependency)

### Funcionalidades Implementadas

#### ✅ Sistema de Navegación Multi-idioma

* Navegación fluida entre páginas (Home, About, Portfolio, Contact, Farewell, Menu)
* Header responsivo con navegación funcional
* Menú hamburguesa interactivo para dispositivos móviles
* **Sistema de internacionalización (i18n)** con soporte español/inglés
* **LanguageSwitcher** - Cambio dinámico de idioma
* Carga dinámica de traducciones desde archivos JSON

#### ✅ Páginas Completamente Funcionales

* **Página Principal** (`/`) - Landing page con efectos visuales
* **Página About** (`/about`) - Información personal detallada
* **Página Portfolio** (`/portfolio`) - Showcase de proyectos con navegación
* **Página Contact** (`/contact`) - Formulario de contacto validado
* **Página Farewell** (`/farewell`) - Página de despedida interactiva
* **Página Menu** (`/menu`) - Navegación central
* **Página Precarga** (`/precarga`) - Sistema de loading con progreso

#### ✅ Sistema Avanzado de Formularios

* **Validación en tiempo real** con hooks personalizados
* **Sanitización de datos** para seguridad
* **Componentes reutilizables** para diferentes tipos de input
* **Manejo completo de errores** con mensajes específicos
* **API de contacto** integrada con Resend para envío de emails
* **Accesibilidad** mejorada con ARIA labels

#### ✅ Hooks Personalizados Especializados

* `useVideoPlayer` - Control avanzado de reproducción de videos
* `useVideoPreload` - Precarga inteligente de contenido multimedia
* `useVideoPortals` - Efectos de portales cinematográficos
* `usePageNavigation` - Navegación fluida entre secciones
* `useFormValidation` - Validación de formularios en tiempo real
* `useLoadingProgress` - Control del progreso de carga
* `useI18n` - Sistema de internacionalización (definido en I18nProvider)
* `useLanguageSwitcher` - Cambio de idioma dinámico
* `useDragonAnimation` - Animaciones del dragón
* `useAudioPlayer` - Control de audio global
* `usePreloadTransition` - Transiciones de precarga
* `useResourceCache` - Cache de recursos
* `useServiceWorker` - Integración con Service Worker
* `useStaticPage` - Páginas estáticas
* `useVideoExpansion` - Expansión de videos

#### ✅ Efectos Visuales y Multimedia

* **LavenderFog.js** - Efecto de niebla volumétrica con shaders personalizados
* **Sistema de Portales** - Transiciones cinematográficas entre secciones
* **Reproducción de videos optimizada** - Soporte WebM y MP4 con precarga
* **Sistema de audio global** - AudioProvider con controles personalizados
* **Animaciones CSS avanzadas** - Efectos de transición fluidos
* **Componente Ancient** - Scroll interactivo con contenido multimedia
* **MagicCard** - Efectos de partículas y animaciones mágicas
* **Precarga animada** - DetailedProgressIndicator con progreso visual
* **MaskedVideo** - Videos con máscaras y efectos
* **WelcomeContent** - Contenido de bienvenida interactivo

#### ✅ API y Servicios Backend

* **API de contacto** (`/api/contact/route.js`) - Endpoint para formularios
* **Integración con Resend** - Servicio de email transaccional
* **Validación de datos** en servidor y cliente
* **Manejo de errores** robusto con respuestas HTTP apropiadas

## 📁 Estructura del Proyecto Actualizada

```text
my_portfolio/
├── src/
│   ├── app/                    # App Router de Next.js 15
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.js          # Layout principal
│   │   ├── page.jsx           # Página de inicio
│   │   ├── about/             # Página sobre mí
│   │   ├── contact/           # Página de contacto
│   │   ├── portfolio/         # Galería de proyectos
│   │   ├── farewell/          # Página de despedida
│   │   ├── menu/              # Navegación principal
│   │   ├── precarga/          # Sistema de precarga
│   │   └── api/               # API Routes
│   │       └── contact/       # Endpoint de contacto
│   ├── components/            # Componentes React reutilizables
│   │   ├── Three/            # Componentes 3D con Three.js
│   │   │   └── LavenderFog.js # Efectos de niebla
│   │   ├── Ancient.jsx       # Componente de scroll narrativo
│   │   ├── AudioControls.jsx # Controles de audio
│   │   ├── AudioProvider.jsx # Sistema de audio global
│   │   ├── ContactForm.jsx   # Formulario de contacto
│   │   ├── ContactSection.jsx # Sección de contacto
│   │   ├── DetailedProgressIndicator.jsx # Indicador de progreso detallado
│   │   ├── DynamicLayout.jsx # Layout dinámico
│   │   ├── FormComponents.jsx # Componentes de formulario
│   │   ├── GlobalAudioPlayer.jsx # Reproductor de audio global
│   │   ├── Header.jsx        # Navegación principal
│   │   ├── I18nProvider.jsx  # Proveedor de internacionalización
│   │   ├── LanguageSwitcher.jsx # Selector de idioma
│   │   ├── MagicCard.jsx     # Tarjetas con efectos
│   │   ├── MaskedVideo.jsx   # Videos con máscaras
│   │   ├── Menu.jsx          # Componente de menú
│   │   ├── PortalContent.jsx # Contenido de portales
│   │   ├── SocialLinks.jsx   # Enlaces sociales
│   │   └── WelcomeContent.jsx # Contenido de bienvenida
│   ├── hooks/                # Hooks personalizados
│   │   ├── useAudioPlayer.js # Control de audio global
│   │   ├── useDragonAnimation.js # Animaciones del dragón
│   │   ├── useFormValidation.js # Validación de formularios
│   │   ├── useLanguageSwitcher.js # Cambio de idioma
│   │   ├── useLoadingProgress.js # Progreso de carga
│   │   ├── usePageNavigation.js # Navegación entre páginas
│   │   ├── usePreloadTransition.js # Transiciones de precarga
│   │   ├── useResourceCache.js # Cache de recursos
│   │   ├── useServiceWorker.js # Service Worker
│   │   ├── useStaticPage.js  # Páginas estáticas
│   │   ├── useVideoExpansion.js # Expansión de videos
│   │   ├── useVideoPlayer.js # Control de video
│   │   ├── useVideoPortals.js # Efectos de portales
│   │   └── useVideoPreload.js # Precarga de videos
│   ├── data/                 # Configuración y datos
│   │   ├── audioConfig.js    # Configuración de audio
│   │   ├── portalConfig.js   # Configuración de portales
│   │   └── preloadResourcesConfig.js # Recursos de precarga
│   └── lib/                  # Utilidades y librerías
│       ├── formValidator.js  # Validaciones de formulario
│       ├── scrollContentTranslations.js # Contenido traducido
│       └── validationMessages.js # Mensajes de validación
├── public/                   # Archivos estáticos
│   ├── assets/              # Logos e imágenes
│   ├── videos/              # Contenido multimedia
│   ├── images/              # Imágenes de proyectos
│   ├── locales/             # Archivos de traducción
│   │   ├── en/common.json   # Traducciones en inglés
│   │   └── es/common.json   # Traducciones en español
│   ├── music/               # Archivos de audio
│   └── dragon/              # Animación del dragón
└── docs/                    # Documentación adicional
```

## 🎯 Estado Actual del Proyecto

### ✅ Completamente Funcional

* **Sistema de navegación multi-idioma** con soporte español/inglés
* **Sistema de audio global** con AudioProvider y controles personalizados
* **Formulario de contacto** con validación y envío de emails
* **Reproducción multimedia** optimizada (videos, audio, imágenes)
* **Efectos visuales 3D** con Three.js y shaders personalizados
* **Sistema de precarga** con indicadores de progreso detallados
* **Diseño responsivo** compatible con todos los dispositivos
* **API endpoints** para manejo de datos del servidor
* **Internacionalización completa** con carga dinámica de traducciones
* **Sistema de cache** y optimización de recursos
* **Service Worker** implementado para mejor rendimiento

### 🚧 En Desarrollo Activo

* **Modelos 3D avanzados** - Integración de personajes y animaciones
* **Efectos de partículas** - Sistema de partículas interactivas
* **Optimizaciones de rendimiento** - Lazy loading y compresión
* **Modo oscuro/claro** - Theme switcher dinámico

## 🛠️ Comandos de Desarrollo

### Instalación de Dependencias

```bash
npm install
```

### Modo Desarrollo

```bash
npm run dev
```

### Construcción para Producción

```bash
npm run build
```

### Inicio del Servidor

```bash
npm start
```

### Análisis de Código

```bash
npm run lint
```

## 📚 Notas Técnicas Importantes

### Tecnologías en Uso

**GSAP (3.13.0)**: Instalado pero no implementado actualmente. Las animaciones se manejan con:

* CSS/Tailwind animations para transiciones básicas
* Three.js para efectos 3D y shaders
* Animaciones nativas de React para interactividad

**Three.js (0.177.0)**: Implementación parcial pero funcional:

* ✅ **Shaders personalizados** (LavenderFog con efectos volumétricos)
* ✅ **Integración con React** mediante @react-three/fiber
* 🚧 **Modelos 3D** - Preparado para archivos GLB/FBX
* 🚧 **Animaciones complejas** - AnimationMixer en desarrollo

**Sistema de Internacionalización**: Completamente funcional:

* ✅ **Soporte bilingüe** (Español/Inglés)
* ✅ **Carga dinámica** de traducciones desde JSON
* ✅ **Cambio en tiempo real** sin recarga de página
* ✅ **Fallbacks** automáticos para traducciones faltantes

### Multimedia y Recursos

El proyecto maneja contenido multimedia extensivo:

* **Videos**: Formato WebM optimizado para web, fallback MP4
* **Imágenes**: Optimización automática con Next.js Image
* **Audio**: Sistema de audio global con controles personalizados
* **Fonts**: Google Fonts (Fleur De Leah, The Nautigal) para diseño temático

## 🗺️ Roadmap de Desarrollo Futuro

### Próximas Características (Q1 2025)

#### 🎮 Interactividad Avanzada

* Sistema de gamificación con logros
* Minijuegos integrados en el portafolio
* Efectos de mouse tracking 3D
* Gestos touch avanzados para móviles

#### 🎨 Mejoras Visuales

* Modelos 3D de personajes con animaciones
* Sistema de partículas WebGL
* Efectos de post-procesado
* Transiciones de página cinematográficas

#### ⚡ Optimizaciones

* Service Worker para caché inteligente
* Compresión DRACO para modelos 3D
* Lazy loading de componentes pesados
* Optimización de imágenes con WebP/AVIF

### Consideraciones de Arquitectura

#### Escalabilidad

* **Microcomponentes**: Componentes pequeños y reutilizables
* **Hooks personalizados**: Lógica separada de la presentación
* **Context API**: Estado global eficiente
* **TypeScript**: Migración planificada para type safety

#### Performance

* **Code splitting**: Carga bajo demanda de componentes
* **Image optimization**: Next.js Image con lazy loading
* **Video streaming**: Carga progresiva de contenido multimedia
* **Bundle analysis**: Monitoreo del tamaño de bundles

## 📋 Documentación del Sistema de Validación

### Archivos Principales

* `formValidator.js` - Funciones de validación pura y sanitización
* `useFormValidation.js` - Hook personalizado para manejo de estado
* `FormComponents.jsx` - Componentes UI reutilizables y accesibles
* `ContactForm.jsx` - Implementación completa del formulario

### Características del Sistema

* Validación en tiempo real con debounce
* Sanitización automática de datos de entrada
* Componentes completamente reutilizables
* Manejo robusto de errores con mensajes específicos
* Accesibilidad integrada con ARIA labels

### Validaciones Implementadas

* **Nombre**: 2-50 caracteres, solo letras, espacios y acentos
* **Email**: Formato RFC válido, longitud máxima 254 caracteres
* **Mensaje**: 10-1000 caracteres, sanitización de HTML

## 🤝 Contribución y Feedback

Este es un proyecto personal con fines de portfolio profesional. Sin embargo:

* **Issues**: Reportes de bugs son bienvenidos
* **Sugerencias**: Ideas para mejoras son apreciadas
* **Colaboración**: Contacto disponible para oportunidades laborales

## 📄 Licencia

Proyecto personal con fines educativos y profesionales. Algunos assets pueden tener licencias específicas.

---

**Última actualización**: Julio 2025 | **Versión**: 0.1.0 | **Estado**: En desarrollo activo

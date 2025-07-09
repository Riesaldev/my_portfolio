
export function getScrollContent(t, section, key) {
  const content = t(`scrollContents.${section}.${key}.content`);
  const title = t(`scrollContents.${section}.${key}.title`);
  
  return {
    title,
    content
  };
}

/**
 * Obtiene el contenido de scroll para la sección About
 */
export function getAboutScrollContents(t) {
  return [
    {
      title: t('scrollContents.about.laboratory.title'),
      content: t('scrollContents.about.laboratory.content')
    },
    {
      title: t('scrollContents.about.aboutMe.title'),
      content: t('scrollContents.about.aboutMe.content')
    }
  ];
}

/**
 * Obtiene el contenido de scroll para la sección Contact
 */
export function getContactScrollContents(t) {
  return [
    {
      title: t('scrollContents.contact.forest.title'),
      content: t('scrollContents.contact.forest.content')
    },
    {
      title: t('scrollContents.contact.contactForm.title'),
      content: t('scrollContents.contact.contactForm.content'),
      hasCustomComponent: true,
      customComponent: "ContactForm"
    }
  ];
}

/**
 * Obtiene el contenido de scroll para la sección Farewell
 */
export function getFarewellScrollContents(t) {
  return [
    {
      title: t('scrollContents.farewell.thanks.title'),
      content: t('scrollContents.farewell.thanks.content')
    }
  ];
}

/**
 * Obtiene el contenido de scroll para la sección Portfolio
 */
export function getPortfolioScrollContents(t) {
  return [
    {
      title: t('scrollContents.portfolio.lake.title'),
      content: t('scrollContents.portfolio.lake.content')
    },
    {
      title: t('scrollContents.portfolio.portfolio.title'),
      content: t('scrollContents.portfolio.portfolio.content')
    },
    {
      title: t('scrollContents.portfolio.netflix.title'),
      content: t('scrollContents.portfolio.netflix.content'),
      videoSrc: "/videos/NetflixClone.mp4"
    },
    {
      title: t('scrollContents.portfolio.blurry.title'),
      content: t('scrollContents.portfolio.blurry.content'),
      videoSrc: "/videos/blurry.mp4"
    },
    {
      title: t('scrollContents.portfolio.hackFlight.title'),
      content: t('scrollContents.portfolio.hackFlight.content'),
      imageSrc: "/images/HaF.png",
      imageAlt: "Hack a Flight"
    },
    {
      title: t('scrollContents.portfolio.gta.title'),
      content: t('scrollContents.portfolio.gta.content'),
      imageSrc: "/images/gta.png",
      imageAlt: "GTA VI"
    },
    {
      title: t('scrollContents.portfolio.ticket.title'),
      content: t('scrollContents.portfolio.ticket.content'),
      imageSrc: "/images/Ticket.png",
      imageAlt: "Conference Ticket Generator"
    },
    {
      title: t('scrollContents.portfolio.ichiban.title'),
      content: t('scrollContents.portfolio.ichiban.content'),
      videoSrc: "/videos/Ichiban.mp4"
    },
    {
      title: t('scrollContents.portfolio.lionKing.title'),
      content: t('scrollContents.portfolio.lionKing.content'),
      videoSrc: "/videos/Figma2.mp4"
    },
    {
      title: t('scrollContents.portfolio.motionFx.title'),
      content: t('scrollContents.portfolio.motionFx.content'),
      imageSrc: "/images/Addon.png",
      imageAlt: "Motion FX"
    },
    {
      title: t('scrollContents.portfolio.blender.title'),
      content: t('scrollContents.portfolio.blender.content'),
      imageSrc: "/images/Blender.png",
      imageAlt: "3D Model"
    }
  ];
}

// CMS Integration Service - Sanity CMS
import { sanityClient, urlForImage, urlForFile } from '../lib/sanity';

// Fallback default data structure
function getDefaultCMSData() {
  return {
    hero: {
      label: 'KNOWLEDGE INSIGHTS',
      title: 'Empower Teams with the Right Knowledge, Instantly',
      subtitle: 'Unify all your enterprise knowledge into a single source of truth, so you can ask questions, surface insights, and take action—right when you need it',
    },
    scrollSection: {
      heading: 'Go beyond enterprise search perform action at scale',
      sections: [
      {
        title: 'One-stop search and analysis',
        description: 'Bring together documents, files, apps, and data—no more endless hunting in siloed systems.',
          order: 1,
      },
      {
        title: 'Agentic intelligence',
        description: 'Ema doesn\'t just "find" information; it can take multiple steps, pull in structured data, query databases, write code, and automate follow-up tasks to deliver real answers.',
          order: 2,
      },
      {
        title: 'Contextual answers, zero guesswork',
        description: 'Every response is cited at the paragraph level, with built-in charts, code snippets, and more.',
          order: 3,
      },
      {
        title: 'Self-updating knowledge',
        description: 'Connect new data automatically— Ema keeps learning from your latest tools, files, and repositories.',
          order: 4,
      },
    ],
      policyAppsSvg: null,
    },
    interactiveCardSection: {
      title: 'Go Beyond Typical Search',
      description: 'Traditional enterprise search tools only point you to possible answers. Ema\'s agentic intelligence does the work— querying multiple sources, running analytics, building visualizations, and automating actions. It\'s like having an entire team of AI employees ready to act on your behalf.',
      beforeCard: {
        title: 'BEFORE',
        description: 'Traditional enterprise search tools only point you to possible answers.',
        svgImage: null,
      },
      afterCard: {
        title: 'AFTER',
        description: 'Ema\'s agentic intelligence does the work—querying multiple sources, running analytics, building visualizations, and automating actions.',
        svgImage: null,
      },
    },
    features: [
      {
        title: 'Simple',
        description: 'Easy to setup, deploy in weeks. Customize AI employees with natural language.',
        icon: '✓',
      },
      {
        title: 'Trusted',
        description: 'On-prem and air-gapped deployment supported. Robust security and data governance.',
        icon: '🔒',
      },
      {
        title: 'Accurate',
        description: 'Explains every action performed in detail. Continuous evaluation and improvement.',
        icon: '🎯',
      },
    ],
    ctaSection: {
      description: 'Turn customer experience into your competitive edge',
      buttonText: 'Hire Ema Today',
      buttonLink: '#',
      circleImage: null,
    },
    header: null,
    footer: null,
    stickyHorizontalScroll: null,
    verticalCardReveal: null,
    stackedCardsSection: null,
  };
}

/**
 * Fetch all CMS data from Sanity
 * @returns {Promise<Object>} CMS data object
 */
export async function fetchCMSData() {
  // Check if Sanity is configured
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  
  if (!projectId) {
    return getDefaultCMSData();
  }

  try {
    const [hero, scrollSection, interactiveCardSection, features, ctaSection, header, footer, stickyHorizontalScroll, verticalCardReveal, stackedCardsSection] = await Promise.all([
      fetchHeroSection(),
      fetchScrollSection(),
      fetchInteractiveCardSection(),
      fetchFeatures(),
      fetchCTASection(),
      fetchHeader(),
      fetchFooter(),
      fetchStickyHorizontalScroll(),
      fetchVerticalCardReveal(),
      fetchStackedCardsSection(),
    ]);

    return {
      hero: hero || getDefaultCMSData().hero,
      scrollSection: scrollSection || getDefaultCMSData().scrollSection,
      interactiveCardSection: interactiveCardSection || getDefaultCMSData().interactiveCardSection,
      features: features || getDefaultCMSData().features,
      ctaSection: ctaSection || getDefaultCMSData().ctaSection,
      header: header || getDefaultCMSData().header,
      footer: footer || getDefaultCMSData().footer,
      stickyHorizontalScroll: stickyHorizontalScroll || getDefaultCMSData().stickyHorizontalScroll,
      verticalCardReveal: verticalCardReveal || getDefaultCMSData().verticalCardReveal,
      stackedCardsSection: stackedCardsSection || getDefaultCMSData().stackedCardsSection,
    };
  } catch (error) {
    return getDefaultCMSData();
  }
}

/**
 * Fetch hero section data
 */
async function fetchHeroSection() {
  const query = `*[_type == "heroSection"][0] {
    label,
    title,
    subtitle,
    lottieAnimation {
      asset-> {
        _id,
        url,
        originalFilename
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data && data.lottieAnimation?.asset?.url) {
      data.lottieAnimationUrl = data.lottieAnimation.asset.url;
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch scroll section data (single document with sections array)
 */
async function fetchScrollSection() {
  const query = `*[_type == "scrollSection"][0] {
    heading,
    sections[] | order(order asc) {
    title,
    description,
      order,
      lottieAnimation {
        asset-> {
          _id,
          url,
          originalFilename
        }
      }
    },
    policyAppsImage {
      asset-> {
        _id,
        url
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data) {
      // Process sections to add lottie URLs
      if (data.sections) {
        data.sections = data.sections.map(section => ({
          ...section,
          lottieAnimationUrl: section.lottieAnimation?.asset?.url || null,
        }));
      }
      // Process policy apps image URL - use AVIF format
      if (data.policyAppsImage) {
        // Try to get URL from asset
        const assetUrl = data.policyAppsImage.asset?.url;
        if (assetUrl) {
          // Use urlForImage to add format parameter
          const imageUrl = urlForImage(data.policyAppsImage, { format: 'avif' });
          data.policyAppsSvgUrl = imageUrl || assetUrl;
        } else {
          data.policyAppsSvgUrl = null;
        }
      } else {
        data.policyAppsSvgUrl = null;
      }
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch interactive card section data
 */
async function fetchInteractiveCardSection() {
  const query = `*[_type == "interactiveCardSection"][0] {
    title,
    description,
    beforeCard {
      title,
      description,
      svgImage {
        asset-> {
          _id,
          url
        }
      }
    },
    afterCard {
      title,
      description,
      svgImage {
        asset-> {
          _id,
          url
        }
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data) {
      // Process SVG URLs
      if (data.beforeCard?.svgImage) {
        data.beforeCard.svgImageUrl = urlForImage(data.beforeCard.svgImage);
      }
      if (data.afterCard?.svgImage) {
        data.afterCard.svgImageUrl = urlForImage(data.afterCard.svgImage);
      }
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch features data
 */
async function fetchFeatures() {
  const query = `*[_type == "feature"] | order(order asc) {
    title,
    description,
    icon,
    order
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch CTA section data
 */
async function fetchCTASection() {
  const query = `*[_type == "ctaSection"][0] {
    description,
    buttonText,
    buttonLink,
    circleImage {
      asset-> {
        _id,
        url
      }
    },
    title,
    subtitle
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data) {
      // Process circle image URL
      if (data.circleImage?.asset) {
        data.circleImage = urlForImage(data.circleImage);
      }
      // Fallback to legacy fields if new fields are not set
      if (!data.description && data.subtitle) {
        data.description = data.subtitle;
      }
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch header data
 */
async function fetchHeader() {
  const query = `*[_type == "header"][0] {
    logo {
      text,
      image {
        asset-> {
    _id,
          url
        }
      },
      link
    },
    navigation[] {
      label,
      url,
      hasDropdown,
      dropdownItems
    },
    ctaButton {
      text,
      url
    },
    dropdownArrow {
      asset-> {
        _id,
        url
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data) {
      // Process logo image URL
      if (data.logo?.image) {
        data.logo.imageUrl = urlForImage(data.logo.image);
      }
      // Process dropdown arrow SVG URL
      if (data.dropdownArrow) {
        data.dropdownArrowUrl = urlForImage(data.dropdownArrow);
      }
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Export fetchHeader for use in components
 */
export { fetchHeader };

/**
 * Fetch footer data
 */
async function fetchFooter() {
  const query = `*[_type == "footer"][0] {
    logo {
      text,
      tagline
    },
    email,
    address,
    socialLinks[] {
      name,
      url,
      icon
    },
    sections[] {
      title,
      links[] {
        label,
        url
      }
    },
    legalLinks[] {
      label,
      url,
      isButton
    },
    copyright
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch sticky horizontal scroll data
 */
async function fetchStickyHorizontalScroll() {
  const query = `*[_type == "stickyHorizontalScroll"][0] {
    label,
    title,
    cards[] | order(order asc) {
      title,
      description,
      order,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data && data.cards) {
      data.cards = data.cards.map(card => ({
        ...card,
        imageUrl: card.image ? urlForImage(card.image) : null,
      }));
    }
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch vertical card reveal data
 */
async function fetchVerticalCardReveal() {
  const query = `*[_type == "verticalCardReveal"][0] {
    title,
    cards[] | order(order asc) {
      title,
      description,
      order
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch stacked cards section data
 */
async function fetchStackedCardsSection() {
  const query = `*[_type == "stackedCardsSection"][0] {
    title,
    description,
    backgroundImage {
      asset-> {
        _id,
        url
      }
    },
    cards[] | order(order asc) {
      title,
      text,
      order,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    if (data) {
      // Process background image URL - convert to string URL
      if (data.backgroundImage?.asset) {
        data.backgroundImage = urlForImage(data.backgroundImage);
      }
      // Process card images - convert to string URLs
      if (data.cards) {
        data.cards = data.cards.map(card => ({
          ...card,
          image: card.image?.asset ? urlForImage(card.image) : null,
        }));
      }
    }
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateCMSData(section, data) {
  return Promise.resolve();
}

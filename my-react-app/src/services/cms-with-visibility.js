// CMS Service with Visibility Control
// Marketing team can show/hide sections directly from Sanity
import { sanityClient } from '../lib/sanity';

function getDefaultCMSData() {
  return {
    hero: {
      title: 'Empower Teams with the Right Knowledge',
      subtitle: 'Unify all your enterprise knowledge into a single source of truth, so you can ask questions, surface insights, and take action—right when you need it',
      visible: true,
    },
    scrollSections: [
      {
        title: 'One-stop search and analysis',
        description: 'Bring together documents, files, apps, and data—no more endless hunting in siloed systems.',
        visible: true,
        order: 1,
      },
      {
        title: 'Agentic intelligence',
        description: 'Ema doesn\'t just "find" information; it can take multiple steps, pull in structured data, query databases, write code, and automate follow-up tasks to deliver real answers.',
        visible: true,
        order: 2,
      },
      {
        title: 'Contextual answers, zero guesswork',
        description: 'Every response is cited at the paragraph level, with built-in charts, code snippets, and more.',
        visible: true,
        order: 3,
      },
      {
        title: 'Self-updating knowledge',
        description: 'Connect new data automatically— Ema keeps learning from your latest tools, files, and repositories.',
        visible: true,
        order: 4,
      },
    ],
    interactiveCards: [
      {
        title: 'Before',
        description: 'Traditional enterprise search tools only point you to possible answers.',
        visible: true,
        order: 1,
      },
      {
        title: 'After',
        description: "Ema's agentic intelligence does the work—querying multiple sources, running analytics, building visualizations, and automating actions.",
        visible: true,
        order: 2,
      },
      {
        title: 'Impact',
        description: 'Transform insights into decisive action with intelligent automation.',
        visible: true,
        order: 3,
      },
    ],
    features: [
      {
        title: 'Simple',
        description: 'Easy to setup, deploy in weeks. Customize AI employees with natural language.',
        visible: true,
        order: 1,
      },
      {
        title: 'Trusted',
        description: 'On-prem and air-gapped deployment supported. Robust security and data governance.',
        visible: true,
        order: 2,
      },
      {
        title: 'Accurate',
        description: 'Explains every action performed in detail. Continuous evaluation and improvement.',
        visible: true,
        order: 3,
      },
    ],
    sectionsVisibility: {
      hero: true,
      scrollSections: true,
      interactiveCards: true,
      stickyHorizontalScroll: true,
      verticalCardReveal: true,
      staticSections: true,
    },
    assets: {
      policyAppsSvg: null,
      goBeyondSvg: null,
      complianceSvg: null,
      futureOfCxSvg: null,
    },
  };
}

/**
 * Fetch all CMS data from Sanity with visibility control
 */
export async function fetchCMSData() {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;
  
  if (!projectId || !dataset) {
    console.warn('Sanity not configured, using default data');
    return getDefaultCMSData();
  }

  try {
    const [
      hero,
      scrollSections,
      interactiveCards,
      features,
      sectionsVisibility,
      assets,
    ] = await Promise.all([
      fetchHeroSection(),
      fetchScrollSections(),
      fetchInteractiveCards(),
      fetchFeatures(),
      fetchSectionsVisibility(),
      fetchAssets(),
    ]);

    return {
      hero: hero || getDefaultCMSData().hero,
      scrollSections: scrollSections || getDefaultCMSData().scrollSections,
      interactiveCards: interactiveCards || getDefaultCMSData().interactiveCards,
      features: features || getDefaultCMSData().features,
      sectionsVisibility: sectionsVisibility || getDefaultCMSData().sectionsVisibility,
      assets: assets || getDefaultCMSData().assets,
    };
  } catch (error) {
    console.error('Error fetching CMS data:', error);
    return getDefaultCMSData();
  }
}

async function fetchHeroSection() {
  const query = `*[_type == "heroSection"][0] {
    title,
    subtitle,
    visible
  }`;
  
  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

async function fetchScrollSections() {
  const query = `*[_type == "scrollSection"] | order(order asc) {
    title,
    description,
    order,
    visible
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    // Filter out hidden sections
    return data.filter(section => section.visible !== false);
  } catch (error) {
    console.error('Error fetching scroll sections:', error);
    return null;
  }
}

async function fetchInteractiveCards() {
  const query = `*[_type == "interactiveCard"] | order(order asc) {
    title,
    description,
    order,
    visible
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data.filter(card => card.visible !== false);
  } catch (error) {
    console.error('Error fetching interactive cards:', error);
    return null;
  }
}

async function fetchFeatures() {
  const query = `*[_type == "feature"] | order(order asc) {
    title,
    description,
    order,
    visible
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data.filter(feature => feature.visible !== false);
  } catch (error) {
    console.error('Error fetching features:', error);
    return null;
  }
}

/**
 * Fetch sections visibility settings
 * Marketing team can toggle entire sections on/off
 */
async function fetchSectionsVisibility() {
  const query = `*[_type == "sectionsVisibility"][0] {
    hero,
    scrollSections,
    interactiveCards,
    stickyHorizontalScroll,
    verticalCardReveal,
    staticSections
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data || {
      hero: true,
      scrollSections: true,
      interactiveCards: true,
      stickyHorizontalScroll: true,
      verticalCardReveal: true,
      staticSections: true,
    };
  } catch (error) {
    console.error('Error fetching sections visibility:', error);
    return null;
  }
}

async function fetchAssets() {
  const query = `*[_type == "asset"] {
    _id,
    name,
    file {
      asset-> {
        _id,
        url,
        originalFilename
      }
    }
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    const assetsObject = {};
    data.forEach(asset => {
      if (asset.file?.asset?.url) {
        assetsObject[asset.name] = asset.file.asset.url;
      }
    });
    return assetsObject;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return null;
  }
}

export async function fetchScrollHeading() {
  const query = `*[_type == "scrollHeading"][0] {
    heading
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data?.heading || 'Go beyond enterprise search perform action at scale';
  } catch (error) {
    console.error('Error fetching scroll heading:', error);
    return 'Go beyond enterprise search perform action at scale';
  }
}


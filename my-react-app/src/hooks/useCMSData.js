// React hook for fetching CMS data using Sanity App SDK
// This uses Suspense, so components using this hook must be wrapped in <Suspense>
import { useDocuments } from '@sanity/sdk-react';
import { useMemo } from 'react';

/**
 * Hook to fetch all CMS data
 * Must be used within a Suspense boundary
 */
export function useCMSData() {
  // Fetch all content types in parallel
  const heroQuery = useDocuments({ 
    documentType: 'heroSection',
    limit: 1 
  });
  
  const scrollSectionsQuery = useDocuments({ 
    documentType: 'scrollSection',
    orderBy: 'order asc'
  });
  
  const interactiveCardsQuery = useDocuments({ 
    documentType: 'interactiveCard',
    orderBy: 'order asc'
  });
  
  const featuresQuery = useDocuments({ 
    documentType: 'feature',
    orderBy: 'order asc'
  });
  
  const scrollHeadingQuery = useDocuments({ 
    documentType: 'scrollHeading',
    limit: 1 
  });
  
  const assetsQuery = useDocuments({ 
    documentType: 'asset'
  });

  // Transform data into the expected format
  return useMemo(() => {
    const hero = heroQuery.data?.[0] || null;
    const scrollHeading = scrollHeadingQuery.data?.[0]?.heading || null;
    
    // Transform assets into key-value object
    const assets = {};
    assetsQuery.data?.forEach(asset => {
      if (asset.name && asset.file?.asset?.url) {
        assets[asset.name] = asset.file.asset.url;
      }
    });

    return {
      hero: hero ? {
        title: hero.title,
        subtitle: hero.subtitle,
      } : null,
      scrollSections: scrollSectionsQuery.data || [],
      interactiveCards: interactiveCardsQuery.data || [],
      features: featuresQuery.data || [],
      scrollHeading,
      assets: Object.keys(assets).length > 0 ? assets : null,
    };
  }, [
    heroQuery.data,
    scrollSectionsQuery.data,
    interactiveCardsQuery.data,
    featuresQuery.data,
    scrollHeadingQuery.data,
    assetsQuery.data,
  ]);
}


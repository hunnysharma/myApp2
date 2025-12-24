// Lottie file preloader utility
const lottieCache = new Map<string, unknown>();

// All lottie file paths used in the app
const LOTTIE_FILES: readonly string[] = [
  '/assets/lottie/Hero_knowledge Insight_F (1).json',
  '/assets/lottie/KI_scroll1_sq.json',
  '/assets/lottie/KI_scroll2_sq.json',
  '/assets/lottie/KI_scroll3_sq.json',
  '/assets/lottie/KI_scroll4_sq.json',
] as const;

/**
 * Preload a single lottie file
 */
export const preloadLottieFile = async (url: string): Promise<unknown | null> => {
  // Return cached data if available
  if (lottieCache.has(url)) {
    return lottieCache.get(url) ?? null;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    lottieCache.set(url, data);
    return data;
  } catch (error) {
    console.warn(`Failed to preload lottie file: ${url}`, error);
    return null;
  }
};

/**
 * Preload all lottie files used in the app
 */
export const preloadAllLottieFiles = async (): Promise<void> => {
  try {
    // Prefetch all files in parallel for faster loading
    await Promise.allSettled(
      LOTTIE_FILES.map(url => preloadLottieFile(url))
    );
  } catch (error) {
    console.warn('Error preloading lottie files:', error);
  }
};

/**
 * Get cached lottie data, or fetch if not cached
 */
export const getLottieData = async (url: string): Promise<unknown | null> => {
  // Check cache first
  if (lottieCache.has(url)) {
    return lottieCache.get(url) ?? null;
  }

  // If not cached, fetch it
  return preloadLottieFile(url);
};

/**
 * Prefetch lottie files using link prefetch (browser-level caching)
 */
export const prefetchLottieFiles = (): void => {
  if (typeof document === 'undefined') return;

  LOTTIE_FILES.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'fetch';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

